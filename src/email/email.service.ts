import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

interface dto {
  to: string;
  from: string;
  subject: string;
  text: string;
  html: string;
}

@Injectable()
export class EmailService {
  constructor(private readonly mailService: MailerService) {}

  sendEmail(dto: dto): void {
    this.mailService.sendMail(dto);
  }
}
