import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';


/**
 * OBD2Data entity representing diagnostic data from a vehicle.
 */
@Entity('obd2_data')
@Index(['vehicle_id'])
@Index(['timestamp'])
export class OBD2Data {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Vehicle, { nullable: false })
  vehicle: Vehicle;

  @Column({ type: 'timestamptz', nullable: false })
  timestamp: Date;

  @Column({ type: 'numeric', nullable: true })
  speed?: number;

  @Column({ type: 'numeric', nullable: true })
  engine_rpm?: number;

  @Column({ type: 'numeric', nullable: true })
  oil_temperature?: number;

  @Column({ type: 'varchar', length: 10, nullable: true })
  error_code?: string;

  @Column({ type: 'point', nullable: true })
  location?: string;
}