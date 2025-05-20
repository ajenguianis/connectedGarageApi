import { NotificationChannel } from '../../common/enums/notification-channel.enum';
import { NotificationStatus } from '../../common/enums/notification-status.enum';
import { Customer } from '../../customers/entities/customer.entity';
import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';


/**
 * Notification entity representing a notification sent to a customer.
 */
@Entity('notifications')
@Index('IDX_NOTIFICATION_CUSTOMER_ID', ['customer'])
export class Notification {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Customer, { nullable: false })
    customer: Customer;

    @Column({ type: 'varchar', length: 100, nullable: true })
    title?: string;

    @Column({ type: 'text', nullable: false })
    message: string;

    @Column({ type: 'enum', enum: NotificationChannel, nullable: false })
    channel: NotificationChannel;

    @Column({ type: 'enum', enum: NotificationStatus, nullable: false })
    status: NotificationStatus;

    @Column({ type: 'timestamp', nullable: true })
    sent_at?: Date;

    @CreateDateColumn()
    created_at: Date;
}