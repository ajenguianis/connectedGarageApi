import { ServicePhotoType } from 'src/common/enums/service-photo-type.enum';
import { Employee } from 'src/employees/entities/employee.entity';
import { Service } from 'src/services/entities/service.entity';
import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';


/**
 * ServicePhoto entity representing photos related to a service.
 */
@Entity('service_photos')
@Index(['service_id'])
@Index(['author_id'])
export class ServicePhoto {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Service, { nullable: false })
    service: Service;

    @Column({ type: 'text', nullable: false })
    url: string;

    @Column({ type: 'enum', enum: ServicePhotoType, nullable: true })
    type?: ServicePhotoType;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @ManyToOne(() => Employee, { nullable: true })
    author?: Employee;

    @CreateDateColumn()
    created_at: Date;
}