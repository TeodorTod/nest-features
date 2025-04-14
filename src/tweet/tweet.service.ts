import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Tweet } from './tweet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTweetDto } from './dto/create-tweet.dto';

@Injectable()
export class TweetService {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(Tweet)
    private readonly tweetRepository: Repository<Tweet>,
  ) {}

  public async getTweets(userId: number) {
    return await this.tweetRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    })
  }

  public async createTweet(createTweetDto: CreateTweetDto) {
    let user = await this.usersService.findUserById(createTweetDto.userId);
    let tweet = await this.tweetRepository.create({ ...createTweetDto, user });
    return await this.tweetRepository.save(tweet);
  }
}
