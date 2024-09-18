import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDocenteDto } from './dto/create-docente.dto';
import { UpdateDocenteDto } from './dto/update-docente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Docente } from './entities/docente.entity';
import { Repository } from 'typeorm';
import { Napne } from 'src/napne/entities/napne.entity';
import { EnviarEmailDocente } from './enviar.email';
import { EmailService } from 'src/email/email.service';
@Injectable()
export class DocenteService {
  constructor(
    @InjectRepository(Docente)
    private readonly docenteRepository: Repository<Docente>,
    @InjectRepository(Napne)
    private readonly napneRepository: Repository<Napne>,
    private readonly emailService: EmailService,
  ) {}

  async create(createDocenteDto: CreateDocenteDto) {
    try {
      const { napne } = createDocenteDto;
      const userNapne = await this.napneRepository.findOne({
        where: { id: +napne },
      });
      const userDocente = new Docente({
        napne: userNapne,
        ...createDocenteDto,
      });

      EnviarEmailDocente.enviarEmail(
        {
          to: userDocente.email,
          from: userNapne.email,
          subject: 'Dados para acesso ao sistema',
          text: 'Email e senha',
          html: `
        <h1>Olá Professor(a) ${userDocente.nome}</h1> <br />
        <p>Abaixo você poderá visualizar seus dados de login ao sistema NAPNE</p>
        <strong><i>É impressindível que o senhor(a) atualize a sua senha ao acessar o sistema pela primeira vez</i></strong>
        <br />
        Email: ${userDocente.email} <br />
        Senha: ${createDocenteDto.senha} <br />
        <p>Link para acessar ao sistema</p>

        <a target="_blank" href="http://localhost:5173/login">Clique aqui</a>
        `,
        },
        this.emailService,
      );

      return this.docenteRepository.save(userDocente);
    } catch (error) {
      console.log(error);
    }
  }

  findAll() {
    return this.docenteRepository.find({
      select: ['id', 'nome', 'email', 'cursos'],
    });
  }

  findOne(id: number) {
    return this.docenteRepository.findOne({ where: { id } });
  }

  async findByEmail(id: number) {
    const user = await this.docenteRepository.findOne({ where: { id } });
    return user;
  }

  async update(id: number, updateDocenteDto: UpdateDocenteDto) {
    const docenteUpdate = await this.docenteRepository.findOne({
      where: { id },
    });
    if (!docenteUpdate) throw new NotFoundException('Docente não encontrado');

    this.docenteRepository.merge(docenteUpdate, updateDocenteDto);

    return this.docenteRepository.save(docenteUpdate);
  }

  remove(id: number) {
    return this.docenteRepository.softDelete(id);
  }
}
