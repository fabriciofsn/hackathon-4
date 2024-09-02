import { Test, TestingModule } from '@nestjs/testing';
import { NapneController } from './napne.controller';
import { NapneService } from './napne.service';

describe('NapneController', () => {
  let controller: NapneController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NapneController],
      providers: [NapneService],
    }).compile();

    controller = module.get<NapneController>(NapneController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
