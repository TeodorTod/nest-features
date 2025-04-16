import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Tweet } from './tweet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { HashtagService } from 'src/hashtag/hashtag.service';
import { UpdateTweetDto } from './dto/update-tweet.dto';

@Injectable()
export class TweetService {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashtagService: HashtagService,
    @InjectRepository(Tweet)
    private readonly tweetRepository: Repository<Tweet>,
  ) {}

  public async getTweets(userId: number) {
    return await this.tweetRepository.find({
      where: { user: { id: userId } },
      relations: ['user', 'hashtags'],
    })
  }

  public async createTweet(createTweetDto: CreateTweetDto) {
    const user = await this.usersService.findUserById(createTweetDto.userId);
    const hashtags = await this.hashtagService.findHashtags(createTweetDto.hashtags);
    const tweet = await this.tweetRepository.create({ ...createTweetDto, user, hashtags });
    return await this.tweetRepository.save(tweet);
  }

  public async updateTweet(updateTweetDto: UpdateTweetDto) {
    const hashtags = await this.hashtagService.findHashtags(updateTweetDto.hashtags);
    const tweet = await this.tweetRepository.findOneBy({
      id: updateTweetDto.id,
    })
    tweet.text = updateTweetDto.text ?? tweet.text;
    tweet.image = updateTweetDto.image ?? tweet.image;
    tweet.hashtags = hashtags;
    return await this.tweetRepository.save(tweet);
  }

  public async deleteTweet(id: number) {
    await this.tweetRepository.delete(id);
    return { deleted: true };
  }
}
