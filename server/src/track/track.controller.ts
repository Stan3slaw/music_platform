import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/createTrack.dto';
import { TrackService } from './track.service';
import { TrackResponseInterface } from './types/trackResponse.interface';
import { TracksResponseInterface } from './types/tracksResponse.interface';
import { ObjectId } from 'mongoose';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('/tracks')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'picture', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
  )
  @UsePipes(new ValidationPipe())
  async create(
    @UploadedFiles() files,
    @Body() createTrackDto: CreateTrackDto,
  ): Promise<TrackResponseInterface> {
    const { picture, audio } = files;
    const track = await this.trackService.create(
      createTrackDto,
      picture[0],
      audio[0],
    );
    return this.trackService.buildResponse(track);
  }

  @Get()
  async getAll(
    @Query('count') count: number,
    @Query('offset') offset: number,
  ): Promise<TracksResponseInterface> {
    const tracks = await this.trackService.getAll(count, offset);
    return { tracks };
  }

  @Get('/search')
  async search(@Query('query') query: string) {
    const tracks = await this.trackService.search(query);
    return { tracks };
  }

  @Get(':id')
  async getOne(@Param('id') id: ObjectId): Promise<TrackResponseInterface> {
    const track = await this.trackService.getOne(id);
    return this.trackService.buildResponse(track);
  }

  @Delete(':id')
  async delete(@Param('id') id: ObjectId): Promise<TrackResponseInterface> {
    const track = await this.trackService.delete(id);
    return this.trackService.buildResponse(track);
  }

  @Post('/listen/:id')
  listen(@Param('id') id: ObjectId) {
    return this.trackService.listen(id);
  }
}
