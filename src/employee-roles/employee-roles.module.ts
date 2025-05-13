import { Module } from '@nestjs/common';
import { EmployeeRolesService } from './employee-roles.service';
import { EmployeeRolesController } from './employee-roles.controller';

@Module({
  controllers: [EmployeeRolesController],
  providers: [EmployeeRolesService],
})
export class EmployeeRolesModule {}
