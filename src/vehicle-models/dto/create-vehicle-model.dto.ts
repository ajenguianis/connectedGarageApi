import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Length } from 'class-validator';
import { FuelType } from '../../common/enums/fuel-type.enum';

export class CreateVehicleModelDto {
    @IsString()
    @IsNotEmpty()
    @Length(1, 50)
    brand: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 50)
    model: string;

    @IsString()
    @IsOptional()
    @Length(1, 50)
    version?: string;

    @IsInt()
    @IsNotEmpty()
    start_year: number;

    @IsInt()
    @IsOptional()
    end_year?: number;

    @IsEnum(FuelType)
    @IsNotEmpty()
    fuel_type: FuelType;

    @IsNumber()
    @IsOptional()
    avg_consumption?: number;

    @IsString()
    @IsOptional()
    @Length(1, 20)
    engine_code?: string;

    @IsInt()
    @IsOptional()
    horsepower?: number;

    @IsNumber()
    @IsOptional()
    weight?: number;
}