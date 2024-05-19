import { registerDto } from '@/src/users/dto/register.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { Speciality } from '@/enum/speciality.enum';

export class trainerRegisterDto extends registerDto {

  @ApiProperty({ example: 'Yoga', description: 'The speciality of the trainer' })
  @IsNotEmpty({ message: 'Speciality must not be empty' })
  @IsEnum(Speciality, { message: 'Invalid speciality' })
  speciality: Speciality;

  @ApiProperty({ example: 5, description: 'The experience of the trainer in months' })
  @IsNotEmpty({ message: 'Experience must not be empty' })
  @IsNumber()
  experience: number;

}