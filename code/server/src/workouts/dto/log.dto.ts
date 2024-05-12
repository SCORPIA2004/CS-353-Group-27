import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class logWorkoutDto {

  @ApiProperty({ example: '123', description: 'Workout ID' })
  @IsNotEmpty({ message: 'Workout ID must not be empty' })
  @IsNumber({}, { message: 'Workout ID must be a number' })
  workoutId: number;

  @ApiProperty({ example: 45, description: 'Duration of the workout in minutes' })
  @IsNotEmpty({ message: 'Workout duration must not be empty' })
  @IsNumber({}, { message: 'Workout duration must be a number' })
  duration: number;

  @ApiProperty({ example: 300, description: 'Calories burned during the workout' })
  @IsNotEmpty({ message: 'Calories burned must not be empty' })
  @IsNumber({}, { message: 'Calories burned must be a number' })
  caloriesBurned: number;
}