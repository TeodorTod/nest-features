import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TweetService {
    constructor(private readonly usersService: UsersService) {}

  tweets: { text: string; date: Date; userId: number }[] = [
    { text: 'Hello1', date: new Date(), userId: 1 },
    { text: 'Hello2', date: new Date(), userId: 2 },
    { text: 'Hello3', date: new Date(), userId: 3 },
  ];

  getTweets(userId: number) {
    const user = this.usersService.getUserById(userId);
    const tweets = this.tweets.filter((tweet) => tweet.userId === userId);
    const response = tweets.map(t => { return {text: t.text, date: t.date, user: user.name}});
    return response;
  }
}
