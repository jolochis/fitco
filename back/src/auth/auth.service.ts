import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string) {
    const user = await this.prismaService.user.findUnique({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { id: user.id, email: user.email };
    return {
      ...payload,
      accessToken: this.jwtService.sign(payload),
    };
  }
  async login(email: string, password: string) {
    return this.validateUser(email, password);
  }

  async register(createAuthDto: CreateAuthDto) {
    const hashedPassword = await bcrypt.hash(createAuthDto.password, 10);
    try {
      const userFound = await this.prismaService.user.findUnique({
        where: {
          email: createAuthDto.email,
        },
      });
      if (userFound) {
        throw new ConflictException('User already exist');
      }
      return await this.prismaService.user.create({
        data: {
          ...createAuthDto,
          password: hashedPassword,
        },
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
