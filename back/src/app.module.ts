import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { PrismaService } from './prisma/prisma.service';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [PostModule, CommentsModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
