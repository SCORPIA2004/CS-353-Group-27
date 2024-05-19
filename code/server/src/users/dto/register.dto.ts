import { IsNotEmpty, IsString, MaxLength, MinLength, IsDateString, IsEnum } from 'class-validator';
import { AuthDto } from './auth.dto';
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "@/enum/role.enum";


export class registerDto extends AuthDto {
    @ApiProperty({ example: 'John', description: 'The first name of the user' })
    @IsNotEmpty({ message: 'First name must not be empty' })
    @IsString({ message: 'First name must be a string' })
    @MinLength(2, { message: 'First name must be at least 2 characters long' })
    @MaxLength(50, { message: 'First name must not exceed 50 characters' })
    firstname: string;

    @ApiProperty({ example: 'Doe', description: 'The last name of the user'})
    @IsNotEmpty({ message: 'Last name must not be empty' })
    @IsString({ message: 'Last name must be a string' })
    @MinLength(2, { message: 'Last name must be at least 2 characters long' })
    @MaxLength(50, { message: 'Last name must not exceed 50 characters' })
    lastname: string;

    @ApiProperty({ example: '2000-01-01', description: 'The birth date of the user' })
    @IsNotEmpty({ message: 'Birth date must not be empty' })
    @IsDateString()
    dob: Date;

    @ApiProperty({ enum: Role, description: 'The role of the user'})
    @IsNotEmpty({ message: 'Role must not be empty' })
    @IsEnum(Role, { message: 'Invalid role' })
    role: Role;
}
