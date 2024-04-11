import { IsNotEmpty, IsString, MaxLength, MinLength, IsEmail } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class AuthDto {
    @ApiProperty({ example: 'yy@email.com', description: 'Email of the user' })
    @IsNotEmpty({ message: 'Email must not be empty' })
    @IsString({ message: 'Email must be a string' })
    @MaxLength(50, { message: 'Email must not exceed 50 characters' })
    @IsEmail({}, { message: 'Invalid email' })
    email: string;

    @ApiProperty({ example: 'password', description: 'Password of the user' })
    @IsNotEmpty({ message: 'Password must not be empty' })
    @IsString({ message: 'Password must be a string' })
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    @MaxLength(20, { message: 'Password must not exceed 20 characters' })
    password: string;
}
