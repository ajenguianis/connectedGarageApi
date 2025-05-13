import { Customer } from 'src/customers/entities/customer.entity';
import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';


/**
 * Signature entity representing a customer signature.
 */
@Entity('signatures')
@Index(['customer_id'])
export class Signature {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Customer, { nullable: true })
    customer?: Customer;

    @Column({ type: 'text', nullable: false })
    image_url: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    signature_type?: string;

    @CreateDateColumn()
    signature_date: Date;
}