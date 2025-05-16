import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeRoles } from '../../employee-roles/entities/employee-roles.entity';

@Injectable()
export class PermissionsGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        @InjectRepository(EmployeeRoles)
        private employeeRolesRepository: Repository<EmployeeRoles>,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredPermissions = this.reflector.get<string[]>('permissions', context.getHandler());
        if (!requiredPermissions) {
            return true; // No permissions required, allow access
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (!user) {
            return false; // No authenticated user
        }

        const employeeRoles = await this.employeeRolesRepository
            .createQueryBuilder('employee_roles')
            .leftJoinAndSelect('employee_roles.role', 'role')
            .leftJoinAndSelect('role.rolePermissions', 'rolePermissions')
            .leftJoinAndSelect('rolePermissions.permission', 'permission')
            .where('employee_roles.employee = :employeeId', { employeeId: user.id })
            .getMany();

        const userPermissions = employeeRoles.flatMap((er) =>
            er.role.rolePermissions.map((rp) => rp.permission.name),
        );

        return requiredPermissions.some((permission) => userPermissions.includes(permission));
    }
}