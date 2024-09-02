import { Test, TestingModule } from '@nestjs/testing';
import { QuestionarioDiscenteController } from './questionario-discente.controller';
import { QuestionarioDiscenteService } from './questionario-discente.service';

describe('QuestionarioDiscenteController', () => {
  let controller: QuestionarioDiscenteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionarioDiscenteController],
      providers: [QuestionarioDiscenteService],
    }).compile();

    controller = module.get<QuestionarioDiscenteController>(QuestionarioDiscenteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
