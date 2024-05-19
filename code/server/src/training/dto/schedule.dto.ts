import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class ScheduleConsultationDto {

  @ApiProperty({ example: '2000-01-01', description: 'The Date of the consultation' })
  @IsNotEmpty({ message: 'Consultation date must not be empty' })
  @IsDateString()
  date: Date;


  @ApiProperty({ example: '123', description: 'Trainer ID' })
  @IsNotEmpty({ message: 'Trainer ID must not be empty' })
  @IsNumber({}, { message: 'Trainer ID must be a number' })
  trainerId: number;
}