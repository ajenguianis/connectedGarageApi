import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServicePhotosService } from './service-photos.service';
import { CreateServicePhotoDto } from './dto/create-service-photo.dto';
import { UpdateServicePhotoDto } from './dto/update-service-photo.dto';

@Controller('service-photos')
export class ServicePhotosController {
  constructor(private readonly servicePhotosService: ServicePhotosService) {}

  @Post()
  create(@Body() createServicePhotoDto: CreateServicePhotoDto) {
    return this.servicePhotosService.create(createServicePhotoDto);
  }

  @Get()
  findAll() {
    return this.servicePhotosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicePhotosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServicePhotoDto: UpdateServicePhotoDto) {
    return this.servicePhotosService.update(+id, updateServicePhotoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicePhotosService.remove(+id);
  }
}
