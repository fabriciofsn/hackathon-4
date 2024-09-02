import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Aluno } from './entities/aluno.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AlunoService {
  constructor(
    @InjectRepository(Aluno)
    private readonly alunoRepository: Repository<Aluno>,
  ) {}

  async create(createAlunoDto: CreateAlunoDto): Promise<Aluno> {
    const aluno = new Aluno(createAlunoDto);

    try {
      return this.alunoRepository.save(aluno);
    } catch (e) {
      throw new Error(e);
    }
  }

  findAll(): Promise<Partial<Aluno>[]> {
    return this.alunoRepository.find({
      select: ['nome', 'CPF', 'CPFresponsavel', 'curso', 'matricula', 'email'],
    });
  }

  findOne(id: number): Promise<Aluno> {
    return this.alunoRepository.findOne({ where: { id } });
  }

  async update(id: number, updateAlunoDto: UpdateAlunoDto): Promise<Aluno> {
    const aluno = await this.alunoRepository.findOne({ where: { id } });

    if (!aluno) throw new NotFoundException('Aluno não encontrado');

    this.alunoRepository.merge(aluno, updateAlunoDto);

    return this.alunoRepository.save(aluno);
  }

  remove(id: number) {
    return this.alunoRepository.softDelete(id);
  }
}
