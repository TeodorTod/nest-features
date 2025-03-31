import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

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
      isMarred: false,
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
}
