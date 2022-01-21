import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { FileService, FileType } from 'src/file/file.service';
import { CreateTrackDto } from './dto/createTrack.dto';
import { Track, TrackDocument } from './schemas/track.schema';

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    private readonly fileService: FileService,
  ) {}
  async create(createTrackDto: CreateTrackDto, picture, audio): Promise<Track> {
    const picturePath = this.fileService.createFile(FileType.IMAGE, picture);
    const audioPath = this.fileService.createFile(FileType.AUDIO, audio);

    const track = await this.trackModel.create({
      ...createTrackDto,
      listens: 0,
      audio: audioPath,
      picture: picturePath,
    });
    return track;
  }

  async getAll(count = 10, offset = 0): Promise<Track[]> {
    const tracks = await this.trackModel
      .find()
      .skip(+offset)
      .limit(+count);
    return tracks;
  }

  async search(query: string): Promise<Track[]> {
    const tracks = await this.trackModel.find({
      name: { $regex: new RegExp(query, 'i') },
    });
    return tracks;
  }

  async getOne(id: ObjectId): Promise<Track> {
    const track = await this.trackModel.findById(id).populate('comments');
    return track;
  }

  async delete(id: ObjectId): Promise<Track> {
    const track = await this.trackModel.findByIdAndDelete(id);
    return track;
  }

  async listen(id: ObjectId) {
    const track = await this.trackModel.findById(id);
    track.listens += 1;
    track.save();
  }
}
