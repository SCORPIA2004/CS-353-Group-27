import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateGoalDto {
  @ApiProperty({ example: '123', description: 'Goal ID' })
  @IsNotEmpty({ message: 'Goal ID must not be empty' })
  @IsNumber({}, { message: 'Goal ID must be a number' })
  goalId: number;
  @ApiProperty({ example: 45, description: 'Updated value representing progress' })
  @IsNotEmpty({ message: 'Value must not be empty' })
  @IsNumber({}, { message: 'Value must be a number' })
  value: number;
}