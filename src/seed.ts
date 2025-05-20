import { NestFactory } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { Employee } from './employees/entities/employee.entity';
import { Garage } from './garages/entities/garage.entity';
import { Role } from './roles/entities/role.entity';
import { EmployeeRoles } from './employee-roles/entities/employee-roles.entity';
import { Permission } from './permissions/entities/permission.entity';
import { RolePermissions } from './role-permissions/entities/role-permissions.entity';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

// Minimal module to load ConfigModule
import { Module } from '@nestjs/common';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
    ],
})
class SeedModule { }

async function seed() {
    // Bootstrap NestJS app to get ConfigService
    const app = await NestFactory.createApplicationContext(SeedModule);
    const configService = app.get(ConfigService);

    // Validate environment variables
    const dbConfig = {
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
    };

    for (const [key, value] of Object.entries(dbConfig)) {
        if (value === undefined || value === null || (typeof value === 'string' && value.trim() === '')) {
            throw new Error(`Environment variable ${key} is missing or invalid`);
        }
    }

    // Initialize DataSource
    const dataSource = new DataSource({
        type: 'postgres',
        host: dbConfig.host,
        port: dbConfig.port,
        username: dbConfig.username,
        password: String(dbConfig.password), // Ensure password is a string
        database: dbConfig.database,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
        synchronize: false,
    });

    try {
        await dataSource.initialize();
        console.log('Database connection established');

        const garageRepository = dataSource.getRepository(Garage);
        const roleRepository = dataSource.getRepository(Role);
        const employeeRepository = dataSource.getRepository(Employee);
        const employeeRolesRepository = dataSource.getRepository(EmployeeRoles);
        const permissionRepository = dataSource.getRepository(Permission);
        const rolePermissionsRepository = dataSource.getRepository(RolePermissions);

        // Seed garage with inline data
        let garage = await garageRepository.findOneBy({ name: 'Tunis Auto Réparation' });
        if (!garage) {
            garage = garageRepository.create({
                name: 'Tunis Auto Réparation',
                address: 'Avenue Habib Bourguiba, Tunis 1000, Tunisia',
                phone: '+216 98 765 432',
                email: 'contact@tunisautoreparation.tn',
                business_id: 'TN123456789',
                opening_hours: {
                    monday: '08:00-18:00',
                    tuesday: '08:00-18:00',
                    wednesday: '08:00-18:00',
                    thursday: '08:00-18:00',
                    friday: '08:00-18:00',
                    saturday: '09:00-14:00',
                    sunday: 'closed',
                },
                capacity: 10
            });
            await garageRepository.save(garage);
            console.log('Created garage:', garage.id);
        }

        // Seed roles
        const roles = [
            { name: 'super_admin', description: 'Super Administrator with full privileges' },
            { name: 'admin', description: 'Administrator with employee management privileges' },
            { name: 'mechanic', description: 'Mechanic with vehicle repair privileges' },
        ];

        const roleEntities: Role[] = [];
        for (const roleData of roles) {
            let role = await roleRepository.findOneBy({ name: roleData.name });
            if (!role) {
                role = roleRepository.create({
                    id: uuidv4(),
                    name: roleData.name,
                    description: roleData.description,
                    created_at: new Date(),
                });
                await roleRepository.save(role);
                console.log(`Created role ${roleData.name}:`, role.id);
            }
            roleEntities.push(role);
        }

        const [superAdminRole, adminRole, mechanicRole] = roleEntities;

        // Seed permissions
        const permissions = [
            { name: 'create_employee', description: 'Permission to create employees', category: 'employee' },
            { name: 'repair_vehicle', description: 'Permission to repair vehicles', category: 'vehicle' },
        ];

        const permissionEntities: Permission[] = [];
        for (const permData of permissions) {
            let permission = await permissionRepository.findOneBy({ name: permData.name });
            if (!permission) {
                permission = permissionRepository.create({
                    id: uuidv4(),
                    name: permData.name,
                    description: permData.description,
                    category: permData.category,
                    created_at: new Date(),
                });
                await permissionRepository.save(permission);
                console.log(`Created permission ${permData.name}:`, permission.id);
            }
            permissionEntities.push(permission);
        }

        const [createEmployeePermission, repairVehiclePermission] = permissionEntities;

        // Assign permissions to roles
        const rolePermissions = [
            { role: superAdminRole, permission: createEmployeePermission },
            { role: adminRole, permission: createEmployeePermission },
            { role: mechanicRole, permission: repairVehiclePermission },
        ];

        for (const rp of rolePermissions) {
            const exists = await rolePermissionsRepository.findOneBy({
                role: { id: rp.role.id },
                permission: { id: rp.permission.id },
            });
            if (!exists) {
                const rolePermission = rolePermissionsRepository.create({
                    id: uuidv4(),
                    role: { id: rp.role.id },
                    permission: { id: rp.permission.id },
                    created_at: new Date(),
                });
                await rolePermissionsRepository.save(rolePermission);
                console.log(`Assigned ${rp.permission.name} to ${rp.role.name}`);
            }
        }

        // Seed employees
        const employees = [
            {
                first_name: 'Super',
                last_name: 'Admin',
                email: 'superadmin@example.com',
                password: 'superadmin123',
                role: superAdminRole,
            },
            {
                first_name: 'Admin',
                last_name: 'User',
                email: 'admin@example.com',
                password: 'admin123',
                role: adminRole,
            },
            {
                first_name: 'Mechanic',
                last_name: 'Tech',
                email: 'mechanic@example.com',
                password: 'mechanic123',
                role: mechanicRole,
            },
        ];

        for (const empData of employees) {
            let employee = await employeeRepository.findOneBy({ email: empData.email });
            if (!employee) {
                const hashedPassword = await bcrypt.hash(empData.password, 10);
                employee = employeeRepository.create({
                    id: uuidv4(),
                    first_name: empData.first_name,
                    last_name: empData.last_name,
                    email: empData.email,
                    password: hashedPassword,
                    garage: { id: garage.id },
                    hire_date: new Date(),
                    is_active: true,
                    created_at: new Date(),
                });
                await employeeRepository.save(employee);
                console.log(`Created employee ${empData.email}:`, employee.id);
            }

            // Assign role to employee
            const employeeRoleExists = await employeeRolesRepository.findOneBy({
                employee: { id: employee.id },
                role: { id: empData.role.id },
            });
            if (!employeeRoleExists) {
                const employeeRole = employeeRolesRepository.create({
                    id: uuidv4(),
                    employee: { id: employee.id },
                    role: { id: empData.role.id },
                });
                await employeeRolesRepository.save(employeeRole);
                console.log(`Assigned ${empData.role.name} role to ${empData.email}`);
            }
        }
    } catch (error) {
        console.error('Seeding failed:', error);
        throw error;
    } finally {
        await dataSource.destroy();
        await app.close();
    }
}

seed()
    .then(() => console.log('Seeding completed successfully'))
    .catch((error) => console.error('Seeding failed:', error));