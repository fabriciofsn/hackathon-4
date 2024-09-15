import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private readonly mailService: MailerService) {}

  sendEmail(
    to: string,
    from: string,
    subject: string,
    text: string,
    html: string,
  ): void {
    this.mailService.sendMail({
      to,
      from,
      subject,
      text,
      html,
    });
  }
}
