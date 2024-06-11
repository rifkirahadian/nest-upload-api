import { Inject, Injectable } from '@nestjs/common';
import { Content } from './entities/content.entity';

@Injectable()
export class ContentService {
  constructor(
    @Inject('CONTENT_REPOSITORY')
    private contentsRepository: typeof Content,
  ) {}

  create(filename: string, size: number, mime: string): Promise<Content> {
    return this.contentsRepository.create({
      filename,
      size,
      mime,
    });
  }
}
