import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServicePartsService } from './service-parts.service';
import { CreateServicePartDto } from './dto/create-service-part.dto';
import { UpdateServicePartDto } from './dto/update-service-part.dto';

@Controller('service-parts')
export class ServicePartsController {
  constructor(private readonly servicePartsService: ServicePartsService) {}

  @Post()
  create(@Body() createServicePartDto: CreateServicePartDto) {
    return this.servicePartsService.create(createServicePartDto);
  }

  @Get()
  findAll() {
    return this.servicePartsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicePartsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServicePartDto: UpdateServicePartDto) {
    return this.servicePartsService.update(+id, updateServicePartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicePartsService.remove(+id);
  }
}
