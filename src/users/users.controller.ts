import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(@Query() query: any) {
    if (query.gender) {
      return this.usersService.getAllUsers().filter((user) => user.gender === query.gender);
    } 
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getUserById(id);
  }

  @Post()
  createUser(
    @Body('user', new DefaultValuePipe({
      name: 'Guest',
      age: 0,
      gender: 'male',
      isMarred: false,
      id: 0,
    })) user: any
  ) {
    return this.usersService.createUser(user);
  }
}
