import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private prismaService: PrismaService) {}
  async create(createPostDto: CreatePostDto) {
    console.log(createPostDto);
    try {
      return await this.prismaService.post.create({
        data: {
          content: createPostDto.content,
          reactions: createPostDto.reactions ?? 0,
          userId: createPostDto.userId,
        },
      });
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async findAll() {
    try {
      const posts = await this.prismaService.post.findMany({
        include: {
          author: {
            select: { id: true, username: true, email: true },
          },
          comments: {
            include: {
              author: {
                select: { id: true, username: true },
              },
            },
          },
          Reaction: true,
        },
      });

      console.log(posts);
      return posts;
    } catch (error) {
      console.error('Error fetching posts:', error);
      return [];
    }
  }

  async searchPosts(query: string) {
    return this.prismaService.post.findMany({
      where: {
        OR: [
          { content: { contains: query, mode: 'insensitive' } },
          { author: { username: { contains: query, mode: 'insensitive' } } },
        ],
      },
      include: {
        author: { select: { username: true } },
        comments: { include: { author: { select: { username: true } } } },
      },
    });
  }
}
