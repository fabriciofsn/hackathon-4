import {
  Get,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { NapneService } from 'src/napne/napne.service';
import { DocenteService } from 'src/docente/docente.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private napneService: NapneService,
    private docenteService: DocenteService,
    private readonly jwtService: JwtService,
  ) {}
  async signInNapne(email: string, pass: string) {
    const user = await this.napneService.findByEmail(email);
    if (!user) throw new NotFoundException('Email não encontrado.');
    const comparePassword = await bcrypt.compare(pass, user.senha);

    if (!comparePassword) throw new UnauthorizedException();

    const { senha, ...result } = user;

    const payload = { email: user.email, sub: user.id, roles: ['Napne'] };
    const token = this.jwtService.sign(payload, {
      secret: jwtConstants.secret,
      expiresIn: '1h',
    });

    return {
      ...result,
      token,
    };
  }

  async singInDocente(email: string, pass: string) {
    const docente = await this.docenteService.findByEmail(email);

    if (!docente) throw new NotFoundException('Email não encontrado');

    const comparePassword = await bcrypt.compare(pass, docente.senha);

    if (!comparePassword) throw new UnauthorizedException();

    const { senha, ...result } = docente;

    const payload = {
      email: docente.email,
      sub: docente.id,
      roles: ['Docente'],
    };
    const token = this.jwtService.sign(payload, {
      secret: jwtConstants.secret,
      expiresIn: '1h',
    });

    return {
      ...result,
      token,
    };
  }
}
