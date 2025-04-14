import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Profile } from 'src/profile/profile.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  getAllUsers() {
    return this.userRepository.find({
      relations: ['profile'],
    });
  }

  public async findUserById(id: number) {
    return await this.userRepository.findOneBy({id});
  }

  public async createUser(userDto: CreateUserDto) {
    userDto.profile = userDto.profile ?? {};
    const user = this.userRepository.create(userDto);
    return this.userRepository.save(user);
  }

  public async deleteUser(id: number) {
    await this.userRepository.delete(id);
    return {deleted: true};
  }
}
