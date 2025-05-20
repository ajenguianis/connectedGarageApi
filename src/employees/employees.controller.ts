import {
  Controller,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { Permissions } from '../auth/decorators/permissions.decorator';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { Employee } from './entities/employee.entity';

@ApiTags('employees')
@ApiBearerAuth('JWT-Auth')
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) { }

  @Post()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('create_employee')
  @ApiOperation({ summary: 'Create a new employee' })
  @ApiBody({
    description: 'Employee payload',
    schema: {
      example: {
        first_name: 'Jane',
        last_name: 'Doe',
        email: 'jane.doe@example.com',
        phone: '1234567890',
        created_at: '2025-05-16T23:44:00.000Z',
        garage: { id: '123e4567-e89b-12d3-a456-426614174000' },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Employee created successfully' })
  @ApiResponse({
    status: 400,
    description: 'Invalid input',
    schema: {
      example: {
        statusCode: 400,
        message: ['Invalid email address', 'Invalid garage ID'],
        error: 'Bad Request',
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async create(@Body() createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    return this.employeesService.create(createEmployeeDto);
  }
}