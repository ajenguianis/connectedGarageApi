import { IsString, IsNotEmpty, IsEmail, MinLength, IsUUID, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeDto {
    @ApiProperty({
        description: 'First name of the employee',
        example: 'Jane',
    })
    @IsString({ message: 'First name must be a string' })
    @IsNotEmpty({ message: 'First name is required' })
    first_name: string;

    @ApiProperty({
        description: 'Last name of the employee',
        example: 'Doe',
    })
    @IsString({ message: 'Last name must be a string' })
    @IsNotEmpty({ message: 'Last name is required' })
    last_name: string;

    @ApiProperty({
        description: 'Email address of the employee',
        example: 'jane.doe@example.com',
    })
    @IsEmail({}, { message: 'Invalid email address' })
    @IsNotEmpty({ message: 'Email is required' })
    email: string;

    @ApiProperty({
        description: 'Password for the employee (minimum 6 characters)',
        example: 'password123',
    })
    @IsString({ message: 'Password must be a string' })
    @IsNotEmpty({ message: 'Password is required' })
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password: string;

    @ApiProperty({
        description: 'UUID of the associated garage',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @IsUUID('4', { message: 'Invalid garage ID' })
    @IsNotEmpty({ message: 'Garage ID is required' })
    garage_id: string;

    @ApiProperty({
        description: 'Phone number of the employee (optional)',
        example: '1234567890',
        required: false,
    })
    @IsString({ message: 'Phone must be a string' })
    @IsOptional()
    phone?: string;
}