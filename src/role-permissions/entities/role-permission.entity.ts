import { Permission } from 'src/permissions/entities/permission.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';


/**
 * RolePermissions entity representing the many-to-many relationship between roles and permissions.
 */
@Entity('role_permissions')
@Index('IDX_ROLE_PERMISSIONS_ROLE_PERMISSION', ['role', 'permission'], { unique: true })
export class RolePermissions {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Role, { nullable: false })
    @Index('IDX_ROLE_PERMISSIONS_ROLE_ID')
    role: Role;

    @ManyToOne(() => Permission, { nullable: false })
    @Index('IDX_ROLE_PERMISSIONS_PERMISSION_ID')
    permission: Permission;
}