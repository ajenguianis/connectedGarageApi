import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Role entity representing a user role.
 */
@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
    name: string;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @CreateDateColumn()
    created_at: Date;
}