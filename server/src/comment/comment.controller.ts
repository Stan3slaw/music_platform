import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/createComment.dto';

@Controller('/tracks/comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }

  @Delete(':id')
  delete(@Param('id') id: ObjectId) {
    return this.commentService.delete(id);
  }
}
