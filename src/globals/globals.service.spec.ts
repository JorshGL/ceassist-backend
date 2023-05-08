import { Test, TestingModule } from '@nestjs/testing';
import { GlobalsService } from './globals.service';

describe('GlobalsService', () => {
  let service: GlobalsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GlobalsService],
    }).compile();

    service = module.get<GlobalsService>(GlobalsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
