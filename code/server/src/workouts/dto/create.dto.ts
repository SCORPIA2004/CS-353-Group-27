import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";
import { Difficulty } from '@/enum/difficulty.enum';
import { Intensity } from '@/enum/intensity.enum';

export class CreateWorkoutDto {
  @ApiProperty({ example: 'Cardio Day', description: 'Workout title' })
  @IsNotEmpty({ message: 'Workout title must not be empty' })
  @IsString({ message: 'Workout title must be a string' })
  @MaxLength(50, { message: 'Workout title must not exceed 50 characters' })
  title: string;

  @ApiProperty({ example: 'advanced', description: 'Workout difficulty'})
  @IsNotEmpty({ message: 'Workout difficulty must not be empty' })
  @IsEnum(Difficulty, { message: 'Invalid difficulty' })
  difficulty: Difficulty;

  @ApiProperty({ example: ['dumbbells', 'exercise mat'], description: 'Required equipment' })
  @IsNotEmpty({ message: 'Required equipment must not be empty' })
  @IsArray({ message: 'Required equipment must be an array' })
  @IsString({ each: true, message: 'Each item in required equipment must be a string' })
  requiredEquipment: string[];

  @ApiProperty({ example: 'This workout focuses on building strength and endurance through a combination of cardio and strength exercises.', description: 'Description of the workout' })
  @IsNotEmpty({ message: 'Workout description must not be empty' })
  @IsString({ message: 'Workout description must be a string' })
  description: string;

  @ApiProperty({ example: 45, description: 'Estimated duration of the workout in minutes' })
  @IsNotEmpty({ message: 'Workout duration must not be empty' })
  @IsNumber({}, { message: 'Workout duration must be a number' })
  duration: number;

  @ApiProperty({ example: 'high', description: 'Intensity level of the workout' })
  @IsNotEmpty({ message: 'Workout intensity must not be empty' })
  @IsEnum(Intensity, { message: 'Invalid intensity' })
  intensity: Intensity;
}