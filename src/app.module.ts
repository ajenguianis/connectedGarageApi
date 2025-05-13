// app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersModule } from './customers/customers.module';
import { VehicleModelsModule } from './vehicle-models/vehicle-models.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { GaragesModule } from './garages/garages.module';
import { ServicesModule } from './services/services.module';
import { InvoicesModule } from './invoices/invoices.module';
import { Obd2DataModule } from './obd2-data/obd2-data.module';
import { SignaturesModule } from './signatures/signatures.module';
import { ServicePhotosModule } from './service-photos/service-photos.module';
import { NotificationsModule } from './notifications/notifications.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { PartsModule } from './parts/parts.module';
import { ServicePartsModule } from './service-parts/service-parts.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { EmployeesModule } from './employees/employees.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { EmployeeRolesModule } from './employee-roles/employee-roles.module';
import { RolePermissionsModule } from './role-permissions/role-permissions.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    CustomersModule,
    VehicleModelsModule,
    VehiclesModule,
    GaragesModule,
    ServicesModule,
    InvoicesModule,
    Obd2DataModule,
    SignaturesModule,
    ServicePhotosModule,
    NotificationsModule,
    SubscriptionsModule,
    PartsModule,
    ServicePartsModule,
    AppointmentsModule,
    EmployeesModule,
    RolesModule,
    PermissionsModule,
    EmployeeRolesModule,
    RolePermissionsModule,
  ],
})
export class AppModule { }
