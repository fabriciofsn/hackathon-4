import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('MAIL_HOST'),
          port: configService.get<number>('MAIL_PORT'),
          secure: false,
          auth: {
            user: configService.get<string>('MAIL_USER'),
            pass: configService.get<string>('MAIL_PASSWORD'),
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [EmailService, EmailController],
  controllers: [EmailController],
  exports: [EmailService, EmailController],
})
export class EmailModule {}
