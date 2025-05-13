import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployeeRolesService } from './employee-roles.service';
import { CreateEmployeeRoleDto } from './dto/create-employee-role.dto';
import { UpdateEmployeeRoleDto } from './dto/update-employee-role.dto';

@Controller('employee-roles')
export class EmployeeRolesController {
  constructor(private readonly employeeRolesService: EmployeeRolesService) {}

  @Post()
  create(@Body() createEmployeeRoleDto: CreateEmployeeRoleDto) {
    return this.employeeRolesService.create(createEmployeeRoleDto);
  }

  @Get()
  findAll() {
    return this.employeeRolesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeRolesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeRoleDto: UpdateEmployeeRoleDto) {
    return this.employeeRolesService.update(+id, updateEmployeeRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeRolesService.remove(+id);
  }
}
