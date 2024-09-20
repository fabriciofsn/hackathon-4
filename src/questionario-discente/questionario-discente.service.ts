import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CreateQuestionarioDiscenteDto } from './dto/create-questionario-discente.dto';
import { UpdateQuestionarioDiscenteDto } from './dto/update-questionario-discente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionarioDiscente } from './entities/questionario-discente.entity';
import { Repository } from 'typeorm';
import { Napne } from 'src/napne/entities/napne.entity';
import { Aluno } from 'src/aluno/entities/aluno.entity';
import { EmailController } from 'src/email/email.controller';

@Injectable()
export class QuestionarioDiscenteService {
  constructor(
    @InjectRepository(QuestionarioDiscente)
    private readonly questionarioRepository: Repository<QuestionarioDiscente>,
    @InjectRepository(Napne)
    private readonly napneRepository: Repository<Napne>,
    @InjectRepository(Aluno)
    private readonly alunoRepository: Repository<Aluno>,
    private readonly emailController: EmailController,
    private readonly createQuestionarioDiscenteDto: CreateQuestionarioDiscenteDto,
  ) {}

  async create(createQuestionarioDiscenteDto: CreateQuestionarioDiscenteDto) {
    const { alunoId, napneId } = createQuestionarioDiscenteDto;

    const verificar = await this.questionarioRepository.findOne({
      where: {
        alunoId: alunoId,
      },
    });

    if (verificar)
      throw new NotAcceptableException('Você já respondeu a este formulário');

    const findAluno = await this.alunoRepository.findOne({
      where: { id: +alunoId },
    });
    const findNapne = await this.napneRepository.findOne({
      where: { id: +napneId },
    });

    if (!findAluno || !findNapne)
      throw new NotFoundException('Usuário não encontrado');

    const questionario = new QuestionarioDiscente({
      alunoId: findAluno,
      napneId: findNapne,
      ...createQuestionarioDiscenteDto,
    });

    await this.sendNotification();

    const saveQues = await this.questionarioRepository.save(questionario);
  }

  async sendNotification() {
    const { alunoId, napneId } = this.createQuestionarioDiscenteDto;
    const findAluno = await this.alunoRepository.findOne({
      where: { id: +alunoId },
    });
    const findNapne = await this.napneRepository.findOne({
      where: { id: +napneId },
    });

    const dto = {
      to: findNapne.email,
      from: 'napnesuport@academico.ifs.edu.br',
      subject: `O aluno ${findAluno.nome} respondeu ao formulário`,
      text: `${findAluno.nome} acabou de responder ao fromulaŕio`,
      html: `
      <body style="background-color:#f6f9fc;padding:10px 0">
      <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="max-width:37.5em;background-color:#ffffff;border:1px solid #f0f0f0;padding:45px">
      <tbody>
        <tr style="width:100%">
          <td><img alt="Dropbox" height="33" src="https://react-email-demo-kkea02irk-resend.vercel.app/static/dropbox-logo.png" style="display:block;outline:none;border:none;text-decoration:none" width="40">
            <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
              <tbody>
                <tr>
                  <td>
                    <p style="font-size:16px;line-height:26px;margin:16px 0;font-family:'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;font-weight:300;color:#404040">Olá <!-- -->${findNapne.nome}<!-- -->,</p>
                    <p style="font-size:16px;line-height:26px;margin:16px 0;font-family:'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;font-weight:300;color:#404040">Verifique seu sistema</p><a target="_blank" rel="noopener noreferrer" href="https://dropbox.com" style="line-height:100%;text-decoration:none;display:block;max-width:100%;mso-padding-alt:0px;background-color:#007ee6;border-radius:4px;color:#fff;font-family:'Open Sans', 'Helvetica Neue', Arial;font-size:15px;text-align:center;width:210px;padding:14px 7px 14px 7px"><span><!--[if mso]><i style="mso-font-width:350%;mso-text-raise:21" hidden>&#8202;</i><![endif]--></span><span style="max-width:100%;display:inline-block;line-height:120%;mso-padding-alt:0px;mso-text-raise:10.5px">Reset password</span><span><!--[if mso]><i style="mso-font-width:350%" hidden>&#8202;&#8203;</i><![endif]--></span></a>
                    <p style="font-size:16px;line-height:26px;margin:16px 0;font-family:'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;font-weight:300;color:#404040">O aluno ${findAluno.nome} acabou de responder ao formulário</p>
                    <p style="font-size:16px;line-height:26px;margin:16px 0;font-family:'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;font-weight:300;color:#404040">Clica no botão abaixo<!-- --> <a target="_blank" rel="noopener noreferrer" href="https://dropbox.com" style="color:#067df7;text-decoration:underline">more security tips.</a></p>
                    <p style="font-size:16px;line-height:26px;margin:16px 0;font-family:'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;font-weight:300;color:#404040">Cheers!</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table><!--/$-->
  
</body>
`,
    };

    return this.emailController.sendEmail(dto);
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
