import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VehicleModelsService } from './vehicle-models.service';
import { CreateVehicleModelDto } from './dto/create-vehicle-model.dto';
import { UpdateVehicleModelDto } from './dto/update-vehicle-model.dto';

@Controller('vehicle-models')
export class VehicleModelsController {
  constructor(private readonly vehicleModelsService: VehicleModelsService) {}

  @Post()
  create(@Body() createVehicleModelDto: CreateVehicleModelDto) {
    return this.vehicleModelsService.create(createVehicleModelDto);
  }

  @Get()
  findAll() {
    return this.vehicleModelsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vehicleModelsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVehicleModelDto: UpdateVehicleModelDto) {
    return this.vehicleModelsService.update(+id, updateVehicleModelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vehicleModelsService.remove(+id);
  }
}
