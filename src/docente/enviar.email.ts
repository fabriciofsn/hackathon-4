import { EmailService } from 'src/email/email.service';

export interface dto {
  to: string;
  from: string;
  subject: string;
  text: string;
  html: string;
}

export class EnviarEmailDocente {
  static enviarEmail(dto: dto, emailService: EmailService) {
    emailService.sendEmail(dto);
  }
}
