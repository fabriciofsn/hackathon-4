import { Test, TestingModule } from '@nestjs/testing';
import { QuestionarioDiscenteService } from './questionario-discente.service';

describe('QuestionarioDiscenteService', () => {
  let service: QuestionarioDiscenteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionarioDiscenteService],
    }).compile();

    service = module.get<QuestionarioDiscenteService>(QuestionarioDiscenteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
