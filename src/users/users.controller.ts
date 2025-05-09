import {
  Body,
  Controller,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  NotFoundException,
  UsePipes,
  ValidationPipe,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationQueryDto } from 'src/common/pagination/dto/pagination-query.dto';
import { AuthorizeGuard } from 'src/auth/guards/authorize.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.usersService.getAllUsers(paginationQueryDto);
  }

  @UseGuards(AuthorizeGuard)
  @Get(':id')
  findUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findUserById(id);
  }

  // @Post()
  // createUser(@Body() user: CreateUserDto) {
  //   return this.usersService.createUser(user);
  // }

  // @Patch(':id')
  // updateUser(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() user: UpdateUserDto,
  // ) {
  //   return this.usersService.updateUser(id, user);
  // }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }
}
