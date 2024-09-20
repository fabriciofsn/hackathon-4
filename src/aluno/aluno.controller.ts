import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AlunoService } from './aluno.service';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { Roles } from 'src/decorator/role.decorator';
import { Role } from 'src/auth/role.enum';
import { RolesGuard } from 'src/auth/roles.guard';
import { AuthGuard } from 'src/auth/auth.guard';

export class EnviarFormularioDto {
  idDiscente: number;
  idNapne: number;
  CPF: string;
  emailNapne: string;
  emailDiscente: string;
  nomeDiscente: string;
}

@Controller('aluno')
@UseGuards(AuthGuard, RolesGuard)
export class AlunoController {
  constructor(private readonly alunoService: AlunoService) {}

  @Post()
  @Roles(Role.Napne)
  create(@Body() createAlunoDto: CreateAlunoDto) {
    return this.alunoService.create(createAlunoDto);
  }

  @Get()
  @Roles(Role.Napne, Role.Docente)
  findAll() {
    return this.alunoService.findAll();
  }

  @Post('/enviar-formulario')
  enviarFormulario(@Body() data: EnviarFormularioDto) {
    this.alunoService.enviarQuestionario(data);
  }

  @Get(':id')
  @Roles(Role.Napne)
  findOne(@Param('id') id: string) {
    return this.alunoService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.Napne)
  update(@Param('id') id: string, @Body() updateAlunoDto: UpdateAlunoDto) {
    return this.alunoService.update(+id, updateAlunoDto);
  }

  @Delete(':id')
  @Roles(Role.Napne)
  remove(@Param('id') id: string) {
    return this.alunoService.remove(+id);
  }
}
