import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  users: CreateUserDto[] = [
    {
      name: 'John',
      email: 'john@gmail.com',
      gender: 'male',
      isMarred: false,
      id: 1,
      password: '123456',
    },
    {
      name: 'Jane',
      email: 'jane@gmail.com',
      gender: 'female',
      isMarred: true,
      id: 2,
      password: '123434',
    },
    {
      name: 'Jack',
      email: 'jack@gmail.com',
      gender: 'male',
      isMarred: false,
      id: 3,
      password: '123123',
    },
  ];

  getAllUsers() {
    if (this.authService.isAuthenticated) {
      return this.users;
    }
    return 'You are not authenticated';
  }

  getUserById(id: number) {
    return this.users.find((user) => user.id === id);
  }

  createUser(user: CreateUserDto) {
    this.users.push(user);
  }

  updateUser(id: number, user: UpdateUserDto) {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) return null;

    const existingUser = this.users[index];
    const updatedUser = { ...existingUser, ...user };
    this.users[index] = updatedUser;
    return updatedUser;
  }
}
