import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CreateProfileDto } from 'src/profile/dto/create.profile.dto';

export class CreateUserDto {
  @IsEmail({}, { message: 'Email must be a valid email' })
  @IsNotEmpty({ message: 'Email is required' })
  @MaxLength(50, { message: 'Email must be at most 50 characters long' })
  email: string;

  @IsNotEmpty({ message: 'Username is required' })
  @MaxLength(24, { message: 'Username must be at most 24 characters long' })
  username: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @MaxLength(100, { message: 'Password must be at most 100 characters long' })
  password: string;

  @IsOptional({ message: 'Profile is optional' })
  profile: CreateProfileDto | null;
}
