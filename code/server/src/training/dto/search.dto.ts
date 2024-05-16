import { IsEnum, IsNumberString, IsOptional } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
import { Speciality } from '@/enum/speciality.enum';

export class searchTrainersDto {

  @ApiProperty({ example: 'Yoga', description: 'The speciality of the trainer' })
  @IsOptional()
  @IsEnum(Speciality, { message: 'Invalid speciality' })
  speciality: Speciality;

  @ApiProperty({ example: 5, description: 'The experience of the trainer in months' })
  @IsOptional()
  @IsNumberString()
  experience: number;
}
