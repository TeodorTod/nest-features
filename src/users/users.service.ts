import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';

import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Profile } from 'src/profile/profile.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  public async getAllUsers() {
    try {
      return await this.userRepository.find({
        relations: ['profile'],
      });
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
    return await this.userRepository.findOneBy({ id });
  }

  public async createUser(userDto: CreateUserDto) {
    try {
      userDto.profile = userDto.profile ?? {};

      const existingUser = await this.userRepository.findOne({
        where: [{ email: userDto.email }, { username: userDto.username }],
      });

      if (existingUser) {
        throw new BadRequestException(
          'User with this email/username already exists',
        );
      }

      const user = this.userRepository.create(userDto);
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

      if (error instanceof BadRequestException) {
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
}
