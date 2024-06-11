import { Test, TestingModule } from '@nestjs/testing';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';
import { BadRequestException } from '@nestjs/common';
import { getModelToken } from '@nestjs/sequelize';
import { Content } from './entities/content.entity';

describe('ContentController', () => {
  let controller: ContentController;
  let contentService: ContentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContentController],
      providers: [
        ContentService,
        {
          provide: getModelToken(Content),
          useValue: {
            create: jest.fn().mockResolvedValue({}),
          },
        },
        {
          provide: 'CONTENT_REPOSITORY',
          useValue: {
            create: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    controller = module.get<ContentController>(ContentController);
    contentService = module.get<ContentService>(ContentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should throw BadRequestException if file is not provided', async () => {
      await expect(controller.create(null)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should call ContentService.create with correct parameters', async () => {
      const file = {
        filename: 'test.png',
        size: 1024,
        mimetype: 'image/png',
      };

      const createSpy = jest
        .spyOn(contentService, 'create')
        .mockResolvedValue(undefined);

      await controller.create(file);

      expect(createSpy).toHaveBeenCalledWith(
        file.filename,
        file.size,
        file.mimetype,
      );
    });

    it('should return the correct response on successful upload', async () => {
      const file = {
        filename: 'test.png',
        size: 1024,
        mimetype: 'image/png',
      };

      const result = await controller.create(file);

      expect(result).toEqual({
        message: 'File uploaded successfully',
        filePath: `/test.png`,
      });
    });
  });
});
