import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Aluno } from './entities/aluno.entity';
import { Repository } from 'typeorm';
import { Napne } from 'src/napne/entities/napne.entity';
import { EnviarEmailDocente } from 'src/docente/enviar.email';
import { EmailService } from 'src/email/email.service';

export interface dto {
  idDiscente: number;
  idNapne: number;
  CPF: string;
  emailNapne: string;
  emailDiscente: string;
  nomeDiscente: string;
}
@Injectable()
export class AlunoService {
  constructor(
    @InjectRepository(Aluno)
    private readonly alunoRepository: Repository<Aluno>,
    @InjectRepository(Napne)
    private readonly napneRepository: Repository<Napne>,
    private readonly emailService: EmailService,
  ) {}

  async create(createAlunoDto: CreateAlunoDto): Promise<Aluno> {
    const { napne } = createAlunoDto;

    const userNapne = await this.napneRepository.findOne({
      where: { id: +napne },
    });
    const aluno = new Aluno({ napne: userNapne, ...createAlunoDto });
    // aluno.napne = [userNapne];
    try {
      const save = await this.alunoRepository.save(aluno);
      return save;
    } catch (e) {
      throw new Error(e);
    }
  }

  findAll(): Promise<Partial<Aluno>[]> {
    return this.alunoRepository.find({
      select: [
        'id',
        'nome',
        'CPF',
        'CPFresponsavel',
        'curso',
        'matricula',
        'email',
      ],
    });
  }

  enviarQuestionario(data: dto) {
    console.log(data);
    EnviarEmailDocente.enviarEmail(
      {
        to: data.emailNapne,
        from: data.emailNapne,
        subject: 'Formulário Discente',
        text: `Olá ${data.nomeDiscente}`,
        html: `<!DOCTYPE html>
                <html lang="pt-BR">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f4f4f4;
                            margin: 0;
                            padding: 0;
                        }
                        .container {
                            width: 100%;
                            max-width: 600px;
                            margin: 0 auto;
                            background-color: #ffffff;
                            border-radius: 8px;
                            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                            overflow: hidden;
                        }
                        .header {
                            background-color: #4CAF50;
                            color: white;
                            padding: 20px;
                            text-align: center;
                        }
                        .header h1 {
                            margin: 0;
                        }
                        .content {
                            padding: 20px;
                        }
                        .content p {
                            font-size: 16px;
                            line-height: 1.5;
                            color: #333;
                        }
                        .button {
                            display: inline-block;
                            background-color: #4CAF50;
                            color: white;
                            padding: 10px 20px;
                            text-decoration: none;
                            border-radius: 5px;
                            margin-top: 10px;
                        }
                        .footer {
                            background-color: #f4f4f4;
                            text-align: center;
                            padding: 10px;
                            font-size: 12px;
                            color: #777;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>Olá, ${data.nomeDiscente}!</h1>
                        </div>
                        <div class="content">
                            <p>Peço que, por gentileza, preencha o formulário clicando no botão abaixo:</p>
                            <a href="http://localhost:5173/formulario-discente/${data.idDiscente}/${data.idNapne}/${data.CPF}/${data.emailDiscente}" class="button">Clique aqui</a>
                            <p>Se você tiver alguma dúvida, não hesite em nos contatar.</p>
                        </div>
                        <div class="footer">
                            <p>&copy; 2024 EduSupport. Todos os direitos reservados.</p>
                        </div>
                    </div>
                </body>
                </html>
        `,
      },
      this.emailService,
    );
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
