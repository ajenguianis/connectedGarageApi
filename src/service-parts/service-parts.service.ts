import { Injectable } from '@nestjs/common';
import { CreateServicePartDto } from './dto/create-service-part.dto';
import { UpdateServicePartDto } from './dto/update-service-part.dto';

@Injectable()
export class ServicePartsService {
  create(createServicePartDto: CreateServicePartDto) {
    return 'This action adds a new servicePart';
  }

  findAll() {
    return `This action returns all serviceParts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} servicePart`;
  }

  update(id: number, updateServicePartDto: UpdateServicePartDto) {
    return `This action updates a #${id} servicePart`;
  }

  remove(id: number) {
    return `This action removes a #${id} servicePart`;
  }
}
