import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song-dto';

@Controller('songs')
export class SongsController {
    constructor(private songsService: SongsService) { }

    @Get()
    findAll() {
        return this.songsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return `Find song with the id ${id}`;
    }

    @Post()
    create(@Body() createSongDTO: CreateSongDTO) {
        return this.songsService.create(createSongDTO);
    }

    @Patch(':id')
    update(@Param('id') id: string) {
        return `Update song with the id ${id}`;
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return `Delete song with the id ${id}`;
    }
}
