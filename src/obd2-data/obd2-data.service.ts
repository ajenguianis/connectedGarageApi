import { Injectable } from '@nestjs/common';
import { CreateObd2DatumDto } from './dto/create-obd2-datum.dto';
import { UpdateObd2DatumDto } from './dto/update-obd2-datum.dto';

@Injectable()
export class Obd2DataService {
  create(createObd2DatumDto: CreateObd2DatumDto) {
    return 'This action adds a new obd2Datum';
  }

  findAll() {
    return `This action returns all obd2Data`;
  }

  findOne(id: number) {
    return `This action returns a #${id} obd2Datum`;
  }

  update(id: number, updateObd2DatumDto: UpdateObd2DatumDto) {
    return `This action updates a #${id} obd2Datum`;
  }

  remove(id: number) {
    return `This action removes a #${id} obd2Datum`;
  }
}
