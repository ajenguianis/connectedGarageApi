import { FuelType } from '../../common/enums/fuel-type.enum';
import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('vehicle_models')
@Index(['brand', 'model', 'version', 'start_year'], { unique: true })
export class VehicleModel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 50, nullable: false })
    brand: string;

    @Column({ type: 'varchar', length: 50, nullable: false })
    model: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    version?: string;

    @Column({ type: 'int', nullable: false })
    start_year: number;

    @Column({ type: 'int', nullable: true })
    end_year?: number;

    @Column({ type: 'enum', enum: FuelType, nullable: false })
    fuel_type: FuelType;

    @Column({ type: 'numeric', precision: 4, scale: 1, nullable: true })
    avg_consumption?: number;

    @Column({ type: 'varchar', length: 20, nullable: true })
    engine_code?: string;

    @Column({ type: 'int', nullable: true })
    horsepower?: number;

    @Column({ type: 'numeric', precision: 6, scale: 1, nullable: true })
    weight?: number;

    @CreateDateColumn()
    created_at: Date;
}