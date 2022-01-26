import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Track, TrackDocument } from 'src/track/schemas/track.schema';
import { CreateCommentDto } from './dto/createComment.dto';
import { Comment, CommentDocument } from './schemas/comment.schema';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Track.name) private readonly trackModel: Model<TrackDocument>,
    @InjectModel(Comment.name)
    private readonly commentModel: Model<CommentDocument>,
  ) {}
  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const track = await this.trackModel.findById(createCommentDto.trackId);
    const comment = await this.commentModel.create({ ...createCommentDto });
    track.comments.push(comment._id);
    await track.save();
    return comment;
  }

  async delete(id: ObjectId): Promise<Comment> {
    const comment = await this.commentModel.findByIdAndDelete(id);
    return comment;
  }
}
