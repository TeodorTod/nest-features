import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Hashtag } from './hashtag.entity';
import { CreateHashtagDto } from './dto/create-hashtag.dto';

@Injectable()
export class HashtagService {
  constructor(
    @InjectRepository(Hashtag)
    private readonly hashtagRepository: Repository<Hashtag>,
  ) {}

  public async createHashtag(createHashtagDto: CreateHashtagDto) {
    const hashtag = await this.hashtagRepository.create(createHashtagDto);
    return await this.hashtagRepository.save(hashtag);
  }

  public async findHashtags(hashtags: number[]) {
    return await this.hashtagRepository.find({
        where: { id: In(hashtags) },
    });
  }

  public async deleteHashtag(id: number) {
    await this.hashtagRepository.delete(id);
    return { deleted: true };
  }

  public async softDeleteHashtag(id: number) {
    await this.hashtagRepository.softDelete(id);
    return { deleted: true };
  }
}
