import { Goal } from '@/enum/goal.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateGoalDto {
  @ApiProperty({ example: 'Losing Weight', description: 'Goal title' })
  @IsNotEmpty({ message: 'Goal title must not be empty' })
  @IsString({ message: 'Goal title must be a string' })
  @MaxLength(50, { message: 'Goal title must not exceed 50 characters' })
  title: string;

  @ApiProperty({ example: 'cardio', description: 'Type of goal' })
  @IsNotEmpty({ message: 'Goal must not be empty' })
  @IsEnum(Goal, { message: 'Invalid Goal' })
  goal: Goal;

  @ApiProperty({ example: 45, description: 'A unit number to track goal progress' })
  @IsNotEmpty({ message: 'Target must not be empty' })
  @IsNumber({}, { message: 'Target must be a number' })
  target: number;

  @ApiProperty({ example: '2024-07-08', description: 'Target end date' })
  @IsNotEmpty({ message: 'End date must not be empty' })
  @IsDateString()
  endDate: string;
}