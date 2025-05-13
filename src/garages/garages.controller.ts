import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GaragesService } from './garages.service';
import { CreateGarageDto } from './dto/create-garage.dto';
import { UpdateGarageDto } from './dto/update-garage.dto';

@Controller('garages')
export class GaragesController {
  constructor(private readonly garagesService: GaragesService) {}

  @Post()
  create(@Body() createGarageDto: CreateGarageDto) {
    return this.garagesService.create(createGarageDto);
  }

  @Get()
  findAll() {
    return this.garagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.garagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGarageDto: UpdateGarageDto) {
    return this.garagesService.update(+id, updateGarageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.garagesService.remove(+id);
  }
}
