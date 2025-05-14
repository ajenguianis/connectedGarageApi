import { Part } from 'src/parts/entities/part.entity';
import { Service } from 'src/services/entities/service.entity';
import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

/**
 * ServicePart entity representing parts used in a service.
 */
@Entity('service_parts')
export class ServicePart {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Service, { nullable: false })
    @Index('IDX_SERVICE_PART_SERVICE_ID')
    service: Service;

    @ManyToOne(() => Part, { nullable: false })
    @Index('IDX_SERVICE_PART_PART_ID')
    part: Part;

    @Column({ type: 'int', nullable: false, comment: 'quantity > 0' })
    quantity: number;
}