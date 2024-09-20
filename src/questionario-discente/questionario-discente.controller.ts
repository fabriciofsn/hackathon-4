import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { QuestionarioDiscenteService } from './questionario-discente.service';
import { CreateQuestionarioDiscenteDto } from './dto/create-questionario-discente.dto';
import { UpdateQuestionarioDiscenteDto } from './dto/update-questionario-discente.dto';
import { Public } from 'src/decorator/public.decorator';
import { Roles } from 'src/decorator/role.decorator';
import { Role } from 'src/auth/role.enum';

@Controller('questionario-discente')
export class QuestionarioDiscenteController {
  constructor(
    private readonly questionarioDiscenteService: QuestionarioDiscenteService,
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post()
  create(@Body() createQuestionarioDiscenteDto: CreateQuestionarioDiscenteDto) {
    return this.questionarioDiscenteService.create(
      createQuestionarioDiscenteDto,
    );
  }

  @Get()
  @Roles(Role.Napne, Role.Docente)
  findAll() {
    return this.questionarioDiscenteService.findAll();
  }

  @Get(':id')
  @Roles(Role.Napne)
  findOne(@Param('id') id: string) {
    return this.questionarioDiscenteService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.Napne)
  update(
    @Param('id') id: string,
    @Body() updateQuestionarioDiscenteDto: UpdateQuestionarioDiscenteDto,
  ) {
    return this.questionarioDiscenteService.update(
      +id,
      updateQuestionarioDiscenteDto,
    );
  }

  @Delete(':id')
  @Roles(Role.Napne)
  remove(@Param('id') id: string) {
    return this.questionarioDiscenteService.remove(+id);
  }
}
