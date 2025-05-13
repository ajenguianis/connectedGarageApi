import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Obd2DataService } from './obd2-data.service';
import { CreateObd2DatumDto } from './dto/create-obd2-datum.dto';
import { UpdateObd2DatumDto } from './dto/update-obd2-datum.dto';

@Controller('obd2-data')
export class Obd2DataController {
  constructor(private readonly obd2DataService: Obd2DataService) {}

  @Post()
  create(@Body() createObd2DatumDto: CreateObd2DatumDto) {
    return this.obd2DataService.create(createObd2DatumDto);
  }

  @Get()
  findAll() {
    return this.obd2DataService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.obd2DataService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateObd2DatumDto: UpdateObd2DatumDto) {
    return this.obd2DataService.update(+id, updateObd2DatumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.obd2DataService.remove(+id);
  }
}
