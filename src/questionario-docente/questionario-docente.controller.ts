import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuestionarioDocenteService } from './questionario-docente.service';
import { CreateQuestionarioDocenteDto } from './dto/create-questionario-docente.dto';
import { UpdateQuestionarioDocenteDto } from './dto/update-questionario-docente.dto';

@Controller('questionario-docente')
export class QuestionarioDocenteController {
  constructor(private readonly questionarioDocenteService: QuestionarioDocenteService) {}

  @Post()
  create(@Body() createQuestionarioDocenteDto: CreateQuestionarioDocenteDto) {
    return this.questionarioDocenteService.create(createQuestionarioDocenteDto);
  }

  @Get()
  findAll() {
    return this.questionarioDocenteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionarioDocenteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuestionarioDocenteDto: UpdateQuestionarioDocenteDto) {
    return this.questionarioDocenteService.update(+id, updateQuestionarioDocenteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionarioDocenteService.remove(+id);
  }
}
