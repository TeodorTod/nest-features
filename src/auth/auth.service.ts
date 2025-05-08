import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import authConfig from './config/auth.config';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { HashingProvider } from './provider/hashing.provider';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    @Inject(authConfig.KEY)
    private readonly authConfiguration: ConfigType<typeof authConfig>,
    private readonly hashingProvider: HashingProvider,
  ) {}

  isAuthenticated: boolean = false;

  public async login(loginDto: LoginDto) {
    const user = await this.usersService.findUserByUsername(loginDto.username);
    let isEqual: boolean = false;
    isEqual = await this.hashingProvider.comparePassword(loginDto.password, user.password);
    if (!isEqual) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return {
      data: user,
      success: true,
      message: 'Login successful',
    };
  }

  public async signup(createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
  }

  
}
