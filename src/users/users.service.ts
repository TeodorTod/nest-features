import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users: CreateUserDto[] = [
    {
      name: 'John',
      email: 'john@gmail.com',
      gender: 'male',
      isMarred: false,
      id: 1,
    },
    {
      name: 'Jane',
      email: 'jane@gmail.com',
      gender: 'female',
      isMarred: true,
      id: 2,
    },
    {
      name: 'Jack',
      email: 'jack@gmail.com',
      gender: 'male',
      isMarred: false,
      id: 3,
    },
  ];

  getAllUsers() {
    return this.users;
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
