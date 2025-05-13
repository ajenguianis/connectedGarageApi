import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Service } from 'src/services/entities/service.entity';
import { InvoiceStatus } from 'src/common/enums/invoice-status.enum';

/**
 * Invoice entity representing a billing invoice for a service.
 */
@Entity('invoices')
@Index(['service_id'])
export class Invoice {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Service, { nullable: false })
    service: Service;

    @Column({ type: 'numeric', nullable: false, comment: 'total_amount >= 0' })
    total_amount: number;

    @Column({ type: 'enum', enum: InvoiceStatus, nullable: false })
    status: InvoiceStatus;

    @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
    invoice_number: string;

    @Column({ type: 'text', nullable: true })
    invoice_pdf_url?: string;

    @Column({ type: 'numeric', precision: 4, scale: 2, nullable: true })
    vat?: number;

    @Column({ type: 'timestamp', nullable: true })
    payment_date?: Date;

    @Column({ type: 'varchar', length: 20, nullable: true })
    payment_method?: string;

    @CreateDateColumn()
    created_at: Date;
}