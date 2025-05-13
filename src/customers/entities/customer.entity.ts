import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('customers')
export class Customer {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    name: string;

    @Column({ type: 'varchar', length: 20, unique: true, nullable: false })
    primary_phone: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    secondary_phone?: string;

    @Column({ type: 'varchar', length: 255, unique: true, nullable: true })
    email?: string;

    @Column({ type: 'text', nullable: true })
    address?: string;

    @Column({ type: 'varchar', length: 2, default: 'en' })
    preferred_language: string;

    @Column({ type: 'varchar', length: 20, default: 'individual' })
    customer_type: string;

    @CreateDateColumn()
    created_at: Date;
}