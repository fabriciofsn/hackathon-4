import { Test, TestingModule } from '@nestjs/testing';
import { QuestionarioDocenteController } from './questionario-docente.controller';
import { QuestionarioDocenteService } from './questionario-docente.service';

describe('QuestionarioDocenteController', () => {
  let controller: QuestionarioDocenteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionarioDocenteController],
      providers: [QuestionarioDocenteService],
    }).compile();

    controller = module.get<QuestionarioDocenteController>(QuestionarioDocenteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
