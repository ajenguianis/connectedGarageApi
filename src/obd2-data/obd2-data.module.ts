import { Module } from '@nestjs/common';
import { Obd2DataService } from './obd2-data.service';
import { Obd2DataController } from './obd2-data.controller';

@Module({
  controllers: [Obd2DataController],
  providers: [Obd2DataService],
})
export class Obd2DataModule {}
