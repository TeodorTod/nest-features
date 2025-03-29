import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users: {
    id: number;
    name: string;
    age: number;
    gender: string;
    isMarred: boolean;
  }[] = [
    {
      name: 'John',
      age: 20,
      gender: 'male',
      isMarred: false,
      id: 1,
    },
    {
      name: 'Jane',
      age: 19,
      gender: 'female',
      isMarred: false,
      id: 2,
    },
    {
      name: 'Jack',
      age: 22,
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

  createUser(user: { 
    name: string;
    age: number;
    gender: string;
    isMarred: boolean;
    id: number;
  }) {
    this.users.push(user);
  }
}
