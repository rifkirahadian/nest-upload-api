import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Get,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { ContentService } from './content.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter, storage } from '../utils/file';
import { ApiBody } from '@nestjs/swagger';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage,
      limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit
      fileFilter,
    }),
  )
  @ApiBody({
    required: true,
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async create(@UploadedFile() file) {
    if (!file) {
      throw new BadRequestException('File is not provided or invalid');
    }
    const { filename, size, mimetype } = file;

    await this.contentService.create(filename, size, mimetype);

    return {
      message: 'File uploaded successfully',
      filePath: `/${file.filename}`,
    };
  }

  @Get(':filename')
  async findOne(@Param('filename') filename: string) {
    const content = await this.contentService.findOne(filename);
    if (!content) {
      throw new NotFoundException('Content not found');
    }

    return content;
  }
}
