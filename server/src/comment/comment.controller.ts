import { Body, Controller, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/createComment.dto';

@Controller()
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  @Post('/tracks/comment')
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }
}
