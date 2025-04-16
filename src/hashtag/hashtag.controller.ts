import { Body, Controller, Delete, Param, ParseIntPipe, Post } from '@nestjs/common';
import { HashtagService } from './hashtag.service';
import { CreateHashtagDto } from './dto/create-hashtag.dto';

@Controller('hashtag')
export class HashtagController {
  constructor(private readonly hashtagService: HashtagService) {}

  @Post()
  public createHashtag(@Body() createHashtagDto: CreateHashtagDto) {
    return this.hashtagService.createHashtag(createHashtagDto);
  }

  @Delete(':id')
  public deleteHashtag(@Param('id', ParseIntPipe) id: number) {
    return this.hashtagService.deleteHashtag(id);
  }

  @Delete('soft-delete/:id')
  public softDeleteHashtag(@Param('id', ParseIntPipe) id: number) {
    return this.hashtagService.softDeleteHashtag(id);
  }
}
