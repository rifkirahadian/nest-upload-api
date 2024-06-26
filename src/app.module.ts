import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ContentModule } from './content/content.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    DatabaseModule,
    ContentModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),
  ],
})
export class AppModule {}
