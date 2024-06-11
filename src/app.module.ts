import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ContentModule } from './content/content.module';

@Module({
  imports: [DatabaseModule, ContentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
