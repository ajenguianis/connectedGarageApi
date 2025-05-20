import { ServicePhotoType } from '../../common/enums/service-photo-type.enum';
import { Employee } from '../../employees/entities/employee.entity';
import { Service } from '../../services/entities/service.entity';
import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';


/**
 * ServicePhoto entity representing photos related to a service.
 */
@Entity('service_photos')
export class ServicePhoto {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Service, { nullable: false })
    @Index('IDX_SERVICE_PHOTO_SERVICE_ID')
    service: Service;

    @Column({ type: 'text', nullable: false })
    url: string;

    @Column({ type: 'enum', enum: ServicePhotoType, nullable: true })
    type?: ServicePhotoType;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @ManyToOne(() => Employee, { nullable: true })
    @Index('IDX_SERVICE_PHOTO_AUTHOR_ID')
    author?: Employee;

    @CreateDateColumn()
    created_at: Date;
}