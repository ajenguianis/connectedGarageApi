import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ServiceStatus } from 'src/common/enums/service-status.enum';
import { ServiceType } from 'src/common/enums/service-type.enum';
import { Employee } from 'src/employees/entities/employee.entity';
import { Garage } from 'src/garages/entities/garage.entity';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';

/**
 * Service entity representing a vehicle service.
 */
@Entity('services')
@Index(['vehicle_id'])
@Index(['garage_id'])
@Index(['technician_id'])
export class Service {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Vehicle, { nullable: false })
    vehicle: Vehicle;

    @ManyToOne(() => Garage, { nullable: false })
    garage: Garage;

    @Column({ type: 'text', nullable: true })
    diagnosis?: string;

    @Column({ type: 'timestamp', nullable: false })
    service_date: Date;

    @Column({ type: 'enum', enum: ServiceStatus, nullable: false })
    status: ServiceStatus;

    @Column({ type: 'enum', enum: ServiceType, nullable: true })
    service_type?: ServiceType;

    @Column({ type: 'interval', nullable: true })
    estimated_duration?: string;

    @ManyToOne(() => Employee, { nullable: true })
    technician?: Employee;

    @CreateDateColumn()
    created_at: Date;
}