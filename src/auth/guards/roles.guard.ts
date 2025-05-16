import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from '../../employees/entities/employee.entity';
import { EmployeeRoles } from 'src/employee-roles/entities/employee-roles.entity';


@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        @InjectRepository(Employee)
        private employeeRepository: Repository<Employee>,
        @InjectRepository(EmployeeRoles)
        private employeeRolesRepository: Repository<EmployeeRoles>,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!requiredRoles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (!user) {
            return false;
        }

        const employeeRoles = await this.employeeRolesRepository
            .createQueryBuilder('employee_roles')
            .leftJoinAndSelect('employee_roles.role', 'role')
            .where('employee_roles.employee = :employeeId', { employeeId: user.id })
            .getMany();

        const userRoles = employeeRoles.map((er) => er.role.name);
        return requiredRoles.some((role) => userRoles.includes(role));
    }
}