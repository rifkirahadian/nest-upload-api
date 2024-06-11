import { Test, TestingModule } from '@nestjs/testing';
import { ContentService } from './content.service';
import { Content } from './entities/content.entity';

describe('ContentService', () => {
  let service: ContentService;
  let contentsRepository: typeof Content;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContentService,
        {
          provide: 'CONTENT_REPOSITORY',
          useValue: {
            create: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    service = module.get<ContentService>(ContentService);
    contentsRepository = module.get<typeof Content>('CONTENT_REPOSITORY');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should call contentsRepository.create with correct parameters', async () => {
      const filename = 'test.png';
      const size = 1024;
      const mime = 'image/png';

      const createSpy = jest
        .spyOn(contentsRepository, 'create')
        .mockResolvedValue({
          filename,
          size,
          mime,
        } as Content);

      await service.create(filename, size, mime);

      expect(createSpy).toHaveBeenCalledWith({
        filename,
        size,
        mime,
      });
    });

    it('should return the created content', async () => {
      const filename = 'test.png';
      const size = 1024;
      const mime = 'image/png';

      const createdContent = { filename, size, mime } as Content;

      jest
        .spyOn(contentsRepository, 'create')
        .mockResolvedValue(createdContent);

      const result = await service.create(filename, size, mime);

      expect(result).toEqual(createdContent);
    });
  });
});
