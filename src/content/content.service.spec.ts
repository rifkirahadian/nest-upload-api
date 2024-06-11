import { Test, TestingModule } from '@nestjs/testing';
import { ContentService } from './content.service';
import { contentsProviders } from './entities/content.provider';

describe('ContentService', () => {
  let service: ContentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [...contentsProviders, ContentService],
    }).compile();

    service = module.get<ContentService>(ContentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
