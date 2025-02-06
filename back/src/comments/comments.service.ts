import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentsService {
  constructor(private prismaService: PrismaService) {}
  async create(createCommentDto: CreateCommentDto) {
    try {
      const postExist = await this.prismaService.post.findUnique({
        where: { id: createCommentDto.postId },
      });

      if (!postExist) {
        throw new Error(
          `Post with ID ${createCommentDto.postId} does not exist`,
        );
      }
      const userExists = await this.prismaService.user.findUnique({
        where: { id: createCommentDto.userId },
      });
      if (!userExists) {
        throw new Error(
          `El usuario con ID ${createCommentDto.userId} no existe`,
        );
      }

      return await this.prismaService.comment.create({
        data: {
          content: createCommentDto.content,
          userId: createCommentDto.userId,
          postId: createCommentDto.postId,
        },
      });
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  findAll() {
    return `This action returns all comments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
