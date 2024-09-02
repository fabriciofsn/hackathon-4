import { Post, Body, HttpCode, HttpStatus, Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/decorator/public';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login/napne')
  singIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signInNapne(signInDto.email, signInDto.senha);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('/login/docente')
  signIn(@Body() signInDto: Record<string, any>) {}
}
