import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDocenteDto } from './dto/create-docente.dto';
import { UpdateDocenteDto } from './dto/update-docente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Docente } from './entities/docente.entity';
import { Repository } from 'typeorm';
import { Napne } from 'src/napne/entities/napne.entity';

@Injectable()
export class DocenteService {
  constructor(
    @InjectRepository(Docente)
    private readonly docenteRepository: Repository<Docente>,
    @InjectRepository(Napne)
    private readonly napneRepository: Repository<Napne>,
  ) {}

  async create(createDocenteDto: CreateDocenteDto) {
    const { napne } = createDocenteDto;
    const userNapne = await this.napneRepository.findOne({
      where: { id: +napne },
    });
    const userDocente = new Docente({ napne: userNapne, ...createDocenteDto });
    console.log(userDocente);
    return this.docenteRepository.save(userDocente);
  }

  findAll() {
    return this.docenteRepository.find({
      select: ['id', 'nome', 'email', 'cursos'],
    });
  }

  findOne(id: number) {
    return this.docenteRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string) {
    const user = await this.docenteRepository.findOne({ where: { email } });
    return user;
  }

  async update(id: number, updateDocenteDto: UpdateDocenteDto) {
    const docenteUpdate = await this.docenteRepository.findOne({
      where: { id },
    });
    if (!docenteUpdate) throw new NotFoundException('Aluno não encontrado');

    this.docenteRepository.merge(docenteUpdate, updateDocenteDto);

    return this.docenteRepository.save(docenteUpdate);
  }

  remove(id: number) {
    return this.docenteRepository.softDelete(id);
  }
}
