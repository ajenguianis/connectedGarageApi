import { SubscriptionStatus } from 'src/common/enums/subscription-status.enum';
import { Garage } from 'src/garages/entities/garage.entity';
import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';


/**
 * Subscription entity representing a garage's subscription plan.
 */
@Entity('subscriptions')
export class Subscription {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Garage, { nullable: false })
    @Index('IDX_SUBSCRIPTION_GARAGE_ID')
    garage: Garage;

    @Column({ type: 'varchar', length: 50, nullable: false })
    subscription_type: string;

    @Column({ type: 'date', nullable: false })
    start_date: Date;

    @Column({ type: 'date', nullable: true })
    end_date?: Date;

    @Column({ type: 'numeric', nullable: true, comment: 'amount >= 0' })
    amount?: number;

    @Column({ type: 'enum', enum: SubscriptionStatus, nullable: false })
    status: SubscriptionStatus;

    @Column({ type: 'varchar', length: 20, default: 'monthly' })
    billing_period: string;
}