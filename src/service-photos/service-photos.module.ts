import { Module } from '@nestjs/common';
import { ServicePhotosService } from './service-photos.service';
import { ServicePhotosController } from './service-photos.controller';

@Module({
  controllers: [ServicePhotosController],
  providers: [ServicePhotosService],
})
export class ServicePhotosModule {}
