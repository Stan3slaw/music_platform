import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { FileService, FileType } from 'src/file/file.service';
import { CreateTrackDto } from './dto/createTrack.dto';
import { UpdateTrackDto } from './dto/updateTrack.dto';
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

  async update(
    id: ObjectId,
    updateTrackDto: UpdateTrackDto,
    picture,
    audio,
  ): Promise<Track> {
    const track = await this.trackModel.findById(id);
    let updatedPicturePath;
    let updatedAudioPath;
    if (picture) {
      updatedPicturePath = this.fileService.updateFile(
        track.picture,
        FileType.IMAGE,
        picture[0],
      );
    }

    if (audio) {
      updatedAudioPath = this.fileService.updateFile(
        track.audio,
        FileType.AUDIO,
        audio[0],
      );
    }

    const updatedTrack = {
      ...updateTrackDto,
      audio: updatedAudioPath ? updatedAudioPath : track.audio,
      picture: updatedPicturePath ? updatedPicturePath : track.picture,
    };
    Object.assign(track, updatedTrack);
    return track.save();
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
    const { picture, audio } = await this.trackModel.findById(id);
    this.fileService.removeFile(picture);
    this.fileService.removeFile(audio);
    const track = await this.trackModel.findByIdAndDelete(id);
    return track;
  }

  async listen(id: ObjectId) {
    const track = await this.trackModel.findById(id);
    track.listens += 1;
    track.save();
  }
}
