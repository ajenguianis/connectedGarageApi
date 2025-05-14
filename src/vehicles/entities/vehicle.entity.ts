import { Customer } from 'src/customers/entities/customer.entity';
import { VehicleModel } from 'src/vehicle-models/entities/vehicle-model.entity';
import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';


@Entity('vehicles')
export class Vehicle {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Customer, { nullable: false })
    @Index('IDX_VEHICLE_CUSTOMER_ID')
    customer: Customer;

    @ManyToOne(() => VehicleModel, { nullable: false })
    @Index('IDX_VEHICLE_MODEL_ID')
    model: VehicleModel;

    @Column({ type: 'varchar', length: 20, unique: true, nullable: false })
    license_plate: string;

    @Column({ type: 'varchar', length: 17, unique: true, nullable: false })
    vin: string;

    @Column({ type: 'varchar', length: 30, nullable: true })
    color?: string;

    @Column({ type: 'int', nullable: false, comment: 'mileage >= 0' })
    mileage: number;

    @Column({ type: 'date', nullable: false })
    first_registration_date: Date;

    @Column({ type: 'varchar', length: 20, default: 'car' })
    vehicle_type: string;

    @Column({ type: 'boolean', default: true })
    current_owner: boolean;

    @Column({ type: 'date', nullable: true })
    last_service_date?: Date;
}