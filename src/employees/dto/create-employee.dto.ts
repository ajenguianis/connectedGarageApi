import {
    IsString,
    IsEmail,
    IsPhoneNumber,
    IsDateString,
    ValidateNested,
    IsUUID,
    MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

class GarageDto {
    @IsUUID()
    id: string;
}

export class CreateEmployeeDto {
    @IsString()
    first_name: string;

    @IsString()
    last_name: string;

    @IsEmail()
    email: string;

    @IsPhoneNumber('FR')
    phone: string;

    @IsDateString()
    created_at: string;

    @IsString()
    @MinLength(6, { message: 'Password must be at least 6 characters long.' })
    password: string;

    @ValidateNested()
    @Type(() => GarageDto)
    garage: GarageDto;
}
