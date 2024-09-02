import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionarioDiscenteDto } from './dto/create-questionario-discente.dto';
import { UpdateQuestionarioDiscenteDto } from './dto/update-questionario-discente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionarioDiscente } from './entities/questionario-discente.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionarioDiscenteService {
  constructor(
    @InjectRepository(QuestionarioDiscente)
    private readonly questionarioRepository: Repository<QuestionarioDiscente>,
  ) {}
  create(createQuestionarioDiscenteDto: CreateQuestionarioDiscenteDto) {
    const questionario = new QuestionarioDiscente(
      createQuestionarioDiscenteDto,
    );
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
    updateQuestionarioDiscenteDto: UpdateQuestionarioDiscenteDto,
  ) {
    const questionario = await this.questionarioRepository.findOne({
      where: { id },
    });
    if (!questionario)
      throw new NotFoundException('Questionário não encontrado');
    this.questionarioRepository.merge(
      questionario,
      updateQuestionarioDiscenteDto,
    );
    return this.questionarioRepository.save(questionario);
  }

  remove(id: number) {
    return this.questionarioRepository.softDelete(id);
  }
}
