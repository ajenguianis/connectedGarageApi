import { Injectable } from '@nestjs/common';
import { CreateGarageDto } from './dto/create-garage.dto';
import { UpdateGarageDto } from './dto/update-garage.dto';

@Injectable()
export class GaragesService {
  create(createGarageDto: CreateGarageDto) {
    return 'This action adds a new garage';
  }

  findAll() {
    return `This action returns all garages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} garage`;
  }

  update(id: number, updateGarageDto: UpdateGarageDto) {
    return `This action updates a #${id} garage`;
  }

  remove(id: number) {
    return `This action removes a #${id} garage`;
  }
}
