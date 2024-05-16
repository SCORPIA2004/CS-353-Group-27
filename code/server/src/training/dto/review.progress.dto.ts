import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ReviewProgressDto {

  @ApiProperty({ example: '123', description: 'Trainee ID' })
  @IsNotEmpty({ message: 'Trainee ID must not be empty' })
  @IsNumber({}, { message: 'Trainee ID must be a number' })
  traineeId: number;
}