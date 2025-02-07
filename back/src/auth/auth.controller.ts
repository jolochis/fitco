import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    try {
      const user = await this.authService.login(body.email, body.password);
      console.log('Login success:', user);
      return user;
    } catch (error) {
      console.error('Login error:', error);
      throw new HttpException(
        { message: error.message, statusCode: HttpStatus.UNAUTHORIZED },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  @Post('register')
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto);
  }
}
