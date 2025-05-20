import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { EmployeeRoles } from 'src/employee-roles/entities/employee-roles.entity';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { EmployeeRolesModule } from 'src/employee-roles/employee-roles.module';
import { Garage } from 'src/garages/entities/garage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, Garage]), EmployeeRolesModule],
  providers: [EmployeesService, PermissionsGuard],
  controllers: [EmployeesController],
  exports: [EmployeesService],
})
export class EmployeesModule { }
