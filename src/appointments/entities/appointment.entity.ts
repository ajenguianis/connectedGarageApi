import { AppointmentStatus } from '../../common/enums/appointment-status.enum';
import { Customer } from '../../customers/entities/customer.entity';
import { Garage } from '../../garages/entities/garage.entity';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

/**
 * Appointment entity representing a scheduled appointment.
 */
@Entity('appointments')
@Index('IDX_APPOINTMENT_CUSTOMER_ID', ['customer'])
@Index('IDX_APPOINTMENT_VEHICLE_ID', ['vehicle']) // fixed typo "vehicule"
@Index('IDX_APPOINTMENT_GARAGE_ID', ['garage'])
export class Appointment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Customer, { nullable: false })
    customer: Customer;

    @ManyToOne(() => Vehicle, { nullable: false })
    vehicle: Vehicle;

    @ManyToOne(() => Garage, { nullable: false })
    garage: Garage;

    @Column({ type: 'timestamp', nullable: false })
    appointment_date: Date;

    @Column({ type: 'text', nullable: true })
    reason?: string;

    @Column({ type: 'enum', enum: AppointmentStatus, nullable: false })
    status: AppointmentStatus;

    @CreateDateColumn()
    created_at: Date;
}
