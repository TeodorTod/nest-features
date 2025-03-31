import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength  } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  name: string;

  @IsEmail({}, { message: 'Email must be a valid email' })
  email: string;

  @IsString({ message: 'Gender must be a string' })
  @IsOptional({ message: 'Gender is optional' })
  gender?: string;

  @IsBoolean({ message: 'isMarred must be a boolean' })
  isMarred: boolean;

  @IsNumber({}, { message: 'Id must be a number' })
  id: number;
}
