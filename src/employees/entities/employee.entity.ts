import { Garage } from '../../garages/entities/garage.entity';
import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';


/**
 * Employee entity representing a garage employee.
 */
@Entity('employees')
@Index(['email'])
export class Employee {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    first_name: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    last_name: string;

    @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
    email: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    password: string;

    @ManyToOne(() => Garage, { nullable: true })
    @Index('IDX_EMPLOYEE_GARAGE_ID')
    garage?: Garage;

    @Column({ type: 'date', nullable: true })
    hire_date?: Date;

    @Column({ type: 'boolean', default: true })
    is_active: boolean;

    @CreateDateColumn()
    created_at: Date;
}