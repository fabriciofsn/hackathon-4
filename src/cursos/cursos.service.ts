import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Curso } from './entities/curso.entity';
import { Repository } from 'typeorm';
import { Napne } from 'src/napne/entities/napne.entity';

@Injectable()
export class CursosService {
  constructor(
    @InjectRepository(Curso)
    private readonly cursoRepository: Repository<Curso>,
    @InjectRepository(Napne)
    private readonly napneRepository: Repository<Napne>,
  ) {}

  async create(createCursoDto: CreateCursoDto) {
    console.log(createCursoDto);
    const { napneId } = createCursoDto;
    const napneUser = await this.napneRepository.findOne({
      where: { id: +napneId },
    });
    if (!napneUser) throw new NotFoundException('Usuário não encontrado');

    return this.cursoRepository.save({ napneId: napneUser, ...createCursoDto });
  }

  findAll() {
    return this.cursoRepository.find({ select: ['nome'] });
  }

  findOne(id: number) {
    return this.cursoRepository.findOne({ where: { id } });
  }

  async update(id: number, updateCursoDto: UpdateCursoDto) {
    const curso = await this.cursoRepository.findOne({ where: { id } });
    if (!curso) throw new NotFoundException('Curso não encontrado');

    this.cursoRepository.merge(curso, updateCursoDto);

    return this.cursoRepository.save(curso);
  }

  remove(id: number) {
    return this.cursoRepository.softDelete(id);
  }
}
