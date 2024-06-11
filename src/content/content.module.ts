import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { contentsProviders } from './entities/content.provider';

@Module({
  controllers: [ContentController],
  providers: [...contentsProviders, ContentService],
})
export class ContentModule {}
