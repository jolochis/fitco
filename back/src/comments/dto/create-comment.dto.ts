import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  content: string;
  @IsNumber()
  userId: number;
  @IsNumber()
  postId: number;
}
