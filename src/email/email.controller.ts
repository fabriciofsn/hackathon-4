import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';

class SendEmailDto {
  to: string;
  from: string;
  subject: string;
  text: string;
  html: string;
}

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  sendEmail(sendEmailDto: SendEmailDto): void {
    console.log(sendEmailDto);
    return this.emailService.sendEmail(sendEmailDto);
  }
}
