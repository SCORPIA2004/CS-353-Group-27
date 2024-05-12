import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
import { Difficulty } from '@/enum/difficulty.enum';
import { Intensity } from '@/enum/intensity.enum';

export class searchWorkoutDto {

  @ApiProperty({ example: '123', description: 'Workout ID' })
  @IsOptional()
  @IsNumber({}, { message: 'Workout ID must be a number' })
  id?: number;

  @ApiProperty({ example: 'Cardio Day', description: 'Workout title' })
  @IsOptional()
  @IsString({ message: 'Workout title must be a string' })
  @MaxLength(50, { message: 'Workout title must not exceed 50 characters' })
  title?: string;

  @ApiProperty({ example: 'advanced', description: 'Workout difficulty' })
  @IsOptional()
  @IsEnum(Difficulty, { message: 'Invalid difficulty' })
  difficulty?: Difficulty;

  @ApiProperty({ example: 45, description: 'Estimated duration of the workout in minutes' })
  @IsOptional()
  // @IsNumber({}, { message: 'Workout duration must be a number' })
  duration?: number;

  @ApiProperty({ example: 'high', description: 'Intensity level of the workout' })
  @IsOptional()
  @IsEnum(Intensity, { message: 'Invalid intensity' })
  intensity?: Intensity;
}
