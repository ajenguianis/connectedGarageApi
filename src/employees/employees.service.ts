import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeesRepository: Repository<Employee>,
  ) { }

  async findOneByEmail(email: string): Promise<Employee | undefined> {
    const employee = await this.employeesRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password', 'first_name', 'last_name'],
    });
    return employee === null ? undefined : employee;
  }

  async create(employeeData: Partial<Employee>): Promise<Employee> {
    if (!employeeData.password) {
      throw new Error('Password is required to create an employee');
    }
    const hashedPassword = await bcrypt.hash(employeeData.password, 10);
    const employee = this.employeesRepository.create({
      ...employeeData,
      password: hashedPassword,
    });
    return this.employeesRepository.save(employee);
  }
}