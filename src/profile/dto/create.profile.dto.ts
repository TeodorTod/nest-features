import { IsString, IsNotEmpty, MinLength, MaxLength, IsOptional, IsDate } from "class-validator";

export class CreateProfileDto {
  @IsString({ message: 'First Name must be a string' })
  @IsOptional({ message: 'First Name is optional' })
  @MinLength(3, { message: 'First Name must be at least 3 characters long' })
  @MaxLength(100, { message: 'First Name must be at most 100 characters long' })
  firstName?: string;

  @IsString({ message: 'Last Name must be a string' })
  @IsOptional({ message: 'Last Name is optional' })
  @MinLength(3, { message: 'Last Name must be at least 3 characters long' })
  @MaxLength(100, { message: 'Last Name must be at most 100 characters long' })
  lastName?: string;

  @IsString({ message: 'Gender must be a string' })
  @IsOptional({ message: 'Gender is optional' })
  @MaxLength(10, { message: 'Gender must be at most 10 characters long' })
  gender?: string;

  @IsOptional({ message: 'Date of Birth is optional' })
  @IsDate({ message: 'Date of Birth must be a valid date' })
  dateOfBirth?: Date;

  @IsString({ message: 'Bio must be a string' })
  @IsOptional({ message: 'Bio is optional' })
  bio?: string;

  @IsString({ message: 'Profile Image must be a string' })
  @IsOptional({ message: 'Profile Image is optional' })
  profileImage?: string;
}
