import { Garage } from '../../garages/entities/garage.entity';
import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';


/**
 * Part entity representing a spare part in a garage's inventory.
 */
@Entity('parts')
export class Part {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Garage, { nullable: false })
    @Index('IDX_PART_GARAGE_ID')
    garage: Garage;

    @Column({ type: 'varchar', length: 100, nullable: false })
    name: string;

    @Column({ type: 'varchar', length: 50, unique: true, nullable: true })
    reference?: string;

    @Column({ type: 'numeric', nullable: true, comment: 'unit_price >= 0' })
    unit_price?: number;

    @Column({ type: 'int', nullable: true, comment: 'stock_quantity >= 0' })
    stock_quantity?: number;
}