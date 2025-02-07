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

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    console.log(updatePostDto);
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
