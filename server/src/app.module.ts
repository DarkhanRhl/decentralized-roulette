import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StartonController } from './starton/starton.controller';
import { StartonService } from './starton/starton.service';

@Module({
  imports: [],
  controllers: [AppController, StartonController],
  providers: [AppService, StartonService],
})
export class AppModule {}
