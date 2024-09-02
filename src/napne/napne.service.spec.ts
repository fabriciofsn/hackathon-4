import { Test, TestingModule } from '@nestjs/testing';
import { NapneService } from './napne.service';

describe('NapneService', () => {
  let service: NapneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NapneService],
    }).compile();

    service = module.get<NapneService>(NapneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
