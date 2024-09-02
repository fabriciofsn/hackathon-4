import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuestionarioDiscenteService } from './questionario-discente.service';
import { CreateQuestionarioDiscenteDto } from './dto/create-questionario-discente.dto';
import { UpdateQuestionarioDiscenteDto } from './dto/update-questionario-discente.dto';

@Controller('questionario-discente')
export class QuestionarioDiscenteController {
  constructor(private readonly questionarioDiscenteService: QuestionarioDiscenteService) {}

  @Post()
  create(@Body() createQuestionarioDiscenteDto: CreateQuestionarioDiscenteDto) {
    return this.questionarioDiscenteService.create(createQuestionarioDiscenteDto);
  }

  @Get()
  findAll() {
    return this.questionarioDiscenteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionarioDiscenteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuestionarioDiscenteDto: UpdateQuestionarioDiscenteDto) {
    return this.questionarioDiscenteService.update(+id, updateQuestionarioDiscenteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionarioDiscenteService.remove(+id);
  }
}
