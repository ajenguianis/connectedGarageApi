import { ServiceStatus } from '../../common/enums/service-status.enum';
import { ServiceType } from '../../common/enums/service-type.enum';
import { Employee } from '../../employees/entities/employee.entity';
import { Garage } from '../../garages/entities/garage.entity';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';
import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';


/**
 * Service entity representing a vehicle service.
 */
@Entity('services')
export class Service {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Vehicle, { nullable: false })
    @Index('IDX_SERVICE_VEHICLE_ID')
    vehicle: Vehicle;

    @ManyToOne(() => Garage, { nullable: false })
    @Index('IDX_SERVICE_GARAGE_ID')
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
    @Index('IDX_SERVICE_TECHNICIAN_ID')
    technician?: Employee;

    @CreateDateColumn()
    created_at: Date;
}