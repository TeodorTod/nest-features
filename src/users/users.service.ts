import {
  BadRequestException,
  forwardRef,
  HttpException,
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';

import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Profile } from 'src/profile/profile.entity';
import { UserAlreadyExistsException } from 'src/customExeptions/user-already-exists.exeption';
import { PaginationProvider } from 'src/common/pagination/pagination.provider';
import { Paginated } from 'src/common/pagination/paginated.interface';
import { PaginationQueryDto } from 'src/common/pagination/dto/pagination-query.dto';
import { HashingProvider } from 'src/auth/provider/hashing.provider';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    private readonly paginationProvider: PaginationProvider,
    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,
  ) {}

  public async getAllUsers(
    pageQueryDto: PaginationQueryDto,
  ): Promise<Paginated<User>> {
    try {
      return await this.paginationProvider.paginateQuery(
        pageQueryDto,
        this.userRepository,
        null,
        ['profile'],
      );
    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        throw new RequestTimeoutException(
          'An error occurred while fetching users',
          {
            description: 'Could not connect to the database',
          },
        );
      }
    }
  }

  public async findUserById(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException(`User with ID ${id} not found`, 404);
    }
    return user;
  }

  public async createUser(userDto: CreateUserDto) {
    try {
      userDto.profile = userDto.profile ?? {};

      const existingUserWithUsername = await this.userRepository.findOne({
        where: { username: userDto.username },
      });

      if (existingUserWithUsername) {
        throw new UserAlreadyExistsException('username', userDto.username);
      }

      const existingUserWithEmail = await this.userRepository.findOne({
        where: { email: userDto.email },
      });

      if (existingUserWithEmail) {
        throw new UserAlreadyExistsException('email', userDto.email);
      }

      const user = this.userRepository.create({
        ...userDto,
        password: await this.hashingProvider.hashPassword(userDto.password),
      });
      return await this.userRepository.save(user);
    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        throw new RequestTimeoutException(
          'An error occurred while fetching users',
          {
            description: 'Could not connect to the database',
          },
        );
      }

      if (error instanceof HttpException) {
        throw error;
      }

      throw new BadRequestException(
        error?.detail || 'Unexpected error occurred',
      );
    }
  }

  public async deleteUser(id: number) {
    await this.userRepository.delete(id);
    return { deleted: true };
  }

  public async findUserByUsername(username: string) {
    let user: User | null = null;

    try {
      user = await this.userRepository.findOneBy({ username });
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: 'User with given username not found!',
      });
    }

    if (!user) {
      throw new UnauthorizedException(
        `User with username ${username} does not exist!`,
      );
    }

    return user;
  }
}
