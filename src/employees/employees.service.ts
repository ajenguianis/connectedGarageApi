import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Garage } from '../garages/entities/garage.entity';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    @InjectRepository(Garage)
    private readonly garageRepository: Repository<Garage>,
  ) { }

  async findOneByEmail(email: string): Promise<Employee | undefined> {
    const employee = await this.employeeRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password', 'first_name', 'last_name'],
    });
    return employee === null ? undefined : employee;
  }

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const { garage, ...data } = createEmployeeDto;

    const garageEntity = await this.garageRepository.findOne({ where: { id: garage.id } });
    if (!garageEntity) {
      throw new NotFoundException(`Garage with ID ${garage.id} not found`);
    }
    const plainPassword = createEmployeeDto.password ? createEmployeeDto.password : this.generateRandomPassword();
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    const employee = this.employeeRepository.create({
      ...data,
      garage: garageEntity,
      password: hashedPassword,
      is_active: true,
    });

    return this.employeeRepository.save(employee);
  }

  private generateRandomPassword(length: number = 12): string {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    let password = '';
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  }
}