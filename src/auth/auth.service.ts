import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EmployeesService } from '../employees/employees.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { Employee } from 'src/employees/entities/employee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Employee)
        private employeesRepository: Repository<Employee>,
        private employeesService: EmployeesService,
        private jwtService: JwtService,
    ) { }

    async validateEmployee(email: string, password: string): Promise<any> {
        const employee = await this.employeesService.findOneByEmail(email);
        if (employee && (await bcrypt.compare(password, employee.password))) {
            const { password, ...result } = employee;
            return result;
        }
        return null;
    }

    async login(loginDto: LoginDto) {
        const employee = await this.validateEmployee(loginDto.email, loginDto.password);
        if (!employee) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload = { email: employee.email, sub: employee.id };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                firstName: employee.first_name,
                lastName: employee.last_name,
                email: employee.email,
            }

        };
    }
    async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
        const hashedPassword = await bcrypt.hash(createEmployeeDto.password, 10);
        const employee = this.employeesRepository.create({
            ...createEmployeeDto,
            password: hashedPassword,
            garage: { id: createEmployeeDto.garage_id },
        });
        return this.employeesRepository.save(employee);
    }
}