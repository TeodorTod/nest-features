import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength  } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'First Name must be a string' })
  @IsNotEmpty({ message: 'First Name is required' })
  @MinLength(3, { message: 'First Name must be at least 3 characters long' })
  @MaxLength(100, { message: 'First Name must be at most 100 characters long' })
  firstName: string;

  @IsString({ message: 'Last Name must be a string' })
  @IsNotEmpty({ message: 'Last Name is required' })
  @MinLength(3, { message: 'Last Name must be at least 3 characters long' })
  @MaxLength(100, { message: 'Last Name must be at most 100 characters long' })
  lastName: string;

  @IsEmail({}, { message: 'Email must be a valid email' })
  @IsNotEmpty({ message: 'Email is required' })
  @MaxLength(50, { message: 'Email must be at most 50 characters long' })
  email: string;

  @IsString({ message: 'Gender must be a string' })
  @IsOptional({ message: 'Gender is optional' })
  @MaxLength(10, { message: 'Gender must be at most 10 characters long' })
  gender?: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' }) 
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @MaxLength(100, { message: 'Password must be at most 100 characters long' })
  password: string;

}
