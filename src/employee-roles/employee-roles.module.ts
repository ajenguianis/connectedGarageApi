import { Module } from '@nestjs/common';
import { EmployeeRolesService } from './employee-roles.service';
import { EmployeeRolesController } from './employee-roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeRoles } from './entities/employee-roles.entity';

@Module({
  controllers: [EmployeeRolesController],
  providers: [EmployeeRolesService],
  imports: [TypeOrmModule.forFeature([EmployeeRoles])],
  exports: [TypeOrmModule],
})
export class EmployeeRolesModule { }
