import { Test, TestingModule } from '@nestjs/testing';
import { QuestionarioDocenteService } from './questionario-docente.service';

describe('QuestionarioDocenteService', () => {
  let service: QuestionarioDocenteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionarioDocenteService],
    }).compile();

    service = module.get<QuestionarioDocenteService>(QuestionarioDocenteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
