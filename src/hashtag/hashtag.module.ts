import { Module } from '@nestjs/common';
import { HashtagController } from './hashtag.controller';
import { HashtagService } from './hashtag.service';
import { Hashtag } from './hashtag.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [HashtagController],
  providers: [HashtagService],
  imports: [TypeOrmModule.forFeature([Hashtag])],
})
export class HashtagModule {}
