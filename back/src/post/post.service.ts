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

  findAll() {
    return `This action returns all post`;
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
