import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GetSuggestionDto {
  @ApiProperty({ example: '123', description: 'Goal ID' })
  @IsNotEmpty({ message: 'Goal ID must not be empty' })
  goalId: number;
}