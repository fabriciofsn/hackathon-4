import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionarioDocenteDto } from './dto/create-questionario-docente.dto';
import { UpdateQuestionarioDocenteDto } from './dto/update-questionario-docente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionarioDocente } from './entities/questionario-docente.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionarioDocenteService {
  constructor(
    @InjectRepository(QuestionarioDocente)
    private readonly questionarioRepository: Repository<QuestionarioDocente>,
  ) {}
  create(createQuestionarioDocenteDto: CreateQuestionarioDocenteDto) {
    const questionario = new QuestionarioDocente(createQuestionarioDocenteDto);
    return this.questionarioRepository.save(questionario);
  }

  findAll() {
    return this.questionarioRepository.find();
  }

  findOne(id: number) {
    return this.questionarioRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateQuestionarioDocenteDto: UpdateQuestionarioDocenteDto,
  ) {
    const questionario = await this.questionarioRepository.findOne({
      where: { id },
    });
    if (!questionario)
      throw new NotFoundException('questionario não encontrado');
    this.questionarioRepository.merge(
      questionario,
      updateQuestionarioDocenteDto,
    );
    return this.questionarioRepository.save(questionario);
  }

  remove(id: number) {
    return this.questionarioRepository.softDelete(id);
  }
}
