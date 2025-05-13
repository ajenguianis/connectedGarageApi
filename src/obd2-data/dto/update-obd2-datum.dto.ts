import { PartialType } from '@nestjs/mapped-types';
import { CreateObd2DatumDto } from './create-obd2-datum.dto';

export class UpdateObd2DatumDto extends PartialType(CreateObd2DatumDto) {}
