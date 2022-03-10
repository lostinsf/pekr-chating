import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatingModule } from './chating/modules';

@Module({
  imports: [ChatingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
