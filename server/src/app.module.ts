import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { CommentModule } from './comment/comment.module';
import { FileModule } from './file/file.module';
import { TrackModule } from './track/track.module';
import * as path from 'path';
import { ConfigModule } from '@nestjs/config';

ConfigModule.forRoot();

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    TrackModule,
    CommentModule,
    FileModule,
  ],
})
export class AppModule {}
