import { Employee } from 'src/employees/entities/employee.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';


/**
 * EmployeeRoles entity representing the many-to-many relationship between employees and roles.
 */
@Entity('employee_roles')
export class EmployeeRoles {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Employee, { nullable: false })
    @Index('IDX_EMPLOYEE_ROLES_EMPLOYEE_ID')
    employee: Employee;

    @ManyToOne(() => Role, { nullable: false })
    @Index('IDX_EMPLOYEE_ROLES_ROLE_ID')
    role: Role;
}