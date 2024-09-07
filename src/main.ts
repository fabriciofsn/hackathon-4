import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const whiteList = ['http://localhost:5173/'];

const options = {
  origin: process.env.NODE_ENV == 'prod' ? whiteList : true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 200,
  allowedHeaders:
    'Content-Type,Accept,Authorization,email,x-request-id,request-type,X-Service-Identifier',
  exposedHeaders: 'X-Service-Identifier',
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: options });
  app.use((req, res, next) => {
    res.header('credentials', 'true');
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Methods',
      'GET,HEAD,PUT,PATCH,POST,DELETE',
    );
    res.header(
      'Access-Control-Allow-Headers',
      'Content-Type,Accept,Authorization,email,x-request-id,request-type,X-Service-Identifier',
    );
    next();
  });
  await app.listen(3000);
}
bootstrap();
