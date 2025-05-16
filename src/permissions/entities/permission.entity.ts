import { RolePermissions } from 'src/role-permissions/entities/role-permission.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Permission entity representing a specific permission.
 */
@Entity('permissions')
export class Permission {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
    name: string;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @Column({ type: 'varchar', length: 50, nullable: true, comment: 'e.g., customer, service, invoice' })
    category?: string;

    @CreateDateColumn()
    created_at: Date;
    @OneToMany(() => RolePermissions, (rolePermissions) => rolePermissions.permission)
    rolePermissions: RolePermissions[];
}