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
    return this.userRepository.find();
  }

  public async createUser(userDto: CreateUserDto) {
    userDto.profile = userDto.profile ?? {};
    let profile = this.profileRepository.create(userDto.profile);
    this.profileRepository.save(profile);
    const user = this.userRepository.create(userDto);
    user.profile = profile;
    return this.userRepository.save(user);
  }
}
