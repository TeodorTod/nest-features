import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Tweet } from './tweet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { HashtagService } from 'src/hashtag/hashtag.service';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { PaginationQueryDto } from 'src/common/pagination/dto/pagination-query.dto';
import { PaginationProvider } from 'src/common/pagination/pagination.provider';
import { Paginated } from 'src/common/pagination/paginated.interface';

@Injectable()
export class TweetService {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashtagService: HashtagService,
    @InjectRepository(Tweet)
    private readonly tweetRepository: Repository<Tweet>,
    private readonly paginationProvider: PaginationProvider,
  ) {}

  public async getTweets(
    userId: number,
    pageQueryDto: PaginationQueryDto,
  ): Promise<Paginated<Tweet>> {
    let user = await this.usersService.findUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return await this.paginationProvider.paginateQuery(
      pageQueryDto,
      this.tweetRepository,
      { user: { id: userId } },
    );
  }

  public async createTweet(createTweetDto: CreateTweetDto) {
    const user = await this.usersService.findUserById(createTweetDto.userId);
    const hashtags = createTweetDto.hashtags
      ? await this.hashtagService.findHashtags(createTweetDto.hashtags)
      : [];
    const tweet = await this.tweetRepository.create({
      ...createTweetDto,
      user,
      hashtags,
    });
    return await this.tweetRepository.save(tweet);
  }

  public async updateTweet(updateTweetDto: UpdateTweetDto) {
    const hashtags = await this.hashtagService.findHashtags(
      updateTweetDto.hashtags,
    );
    const tweet = await this.tweetRepository.findOneBy({
      id: updateTweetDto.id,
    });
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
