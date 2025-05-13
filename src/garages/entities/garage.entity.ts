import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Garage entity representing a service garage.
 */
@Entity('garages')
export class Garage {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    name: string;

    @Column({ type: 'text', nullable: false })
    address: string;

    @Column({ type: 'varchar', length: 20, nullable: false })
    phone: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    email?: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    business_id?: string;

    @Column({ type: 'jsonb', nullable: true })
    opening_hours?: any;

    @Column({ type: 'int', nullable: false, comment: 'capacity > 0' })
    capacity: number;
}