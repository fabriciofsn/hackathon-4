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
import { CursosService } from './cursos.service';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/decorator/role.decorator';
import { Role } from 'src/auth/role.enum';

@Controller('cursos')
@UseGuards(AuthGuard, RolesGuard)
export class CursosController {
  constructor(private readonly cursosService: CursosService) {}

  @Post()
  @Roles(Role.Napne)
  create(@Body() createCursoDto: CreateCursoDto) {
    return this.cursosService.create(createCursoDto);
  }

  @Get()
  @Roles(Role.Napne)
  findAll() {
    return this.cursosService.findAll();
  }

  @Get(':id')
  @Roles(Role.Napne)
  findOne(@Param('id') id: string) {
    return this.cursosService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.Napne)
  update(@Param('id') id: string, @Body() updateCursoDto: UpdateCursoDto) {
    return this.cursosService.update(+id, updateCursoDto);
  }

  @Delete(':id')
  @Roles(Role.Napne)
  remove(@Param('id') id: string) {
    return this.cursosService.remove(+id);
  }
}
