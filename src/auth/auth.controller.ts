import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EmployeesService } from 'src/employees/employees.service';
import { AuthService } from './auth.service';
import { Permissions } from './decorators/permissions.decorator';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { PermissionsGuard } from './guards/permissions.guard';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private employeesService: EmployeesService,
    ) { }

    @Post('employee')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Log in an employee' })
    @ApiBody({
        type: LoginDto,
        description: 'Credentials for employee login',
        schema: {
            example: {
                email: 'superadmin@example.com',
                password: 'superadmin123',
            },
        },
    })
    @ApiResponse({
        status: 200,
        description: 'Successful login, returns JWT token',
        schema: {
            example: { access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
        },
    })
    @ApiResponse({
        status: 400,
        description: 'Invalid input (e.g., invalid email format)',
        schema: {
            example: {
                statusCode: 400,
                message: ['Invalid email address'],
                error: 'Bad Request',
            },
        },
    })
    @ApiResponse({
        status: 401,
        description: 'Invalid credentials',
        schema: {
            example: {
                statusCode: 401,
                message: 'Invalid credentials',
                error: 'Unauthorized',
            },
        },
    })
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

}