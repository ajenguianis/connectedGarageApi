import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { Permissions } from '../auth/decorators/permissions.decorator';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('employees')
@ApiBearerAuth('JWT-Auth')
@Controller('employees')
export class EmployeesController {
  constructor(private employeesService: EmployeesService) { }

  @Post()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('create_employee')
  @ApiOperation({ summary: 'Create a new employee' })

  @ApiBody({
    description: 'Employee created successfully',
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174001',
        first_name: 'Jane',
        last_name: 'Doe',
        email: 'jane.doe@example.com',
        phone: '1234567890',
        created_at: '2025-05-16T23:44:00.000Z',
        garage: { id: '123e4567-e89b-12d3-a456-426614174000' },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input (e.g., invalid email or garage_id)',
    schema: {
      example: {
        statusCode: 400,
        message: ['Invalid email address', 'Invalid garage ID'],
        error: 'Bad Request',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized (invalid or missing JWT token)',
    schema: {
      example: {
        statusCode: 401,
        message: 'Unauthorized',
      },
    },
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden (lacking create_employee permission)',
    schema: {
      example: {
        statusCode: 403,
        message: 'Forbidden resource',
      },
    },
  })
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }
}