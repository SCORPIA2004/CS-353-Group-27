import { registerDto } from '@/src/users/dto/register.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class traineeRegisterDto extends registerDto {

  @ApiProperty({ example: 170, description: 'The height of the user' })
  @IsNotEmpty({ message: 'Height must not be empty' })
  @IsNumber()
  height: number;

  @ApiProperty({ example: 70, description: 'The weight of the user' })
  @IsNotEmpty({ message: 'Weight must not be empty' })
  @IsNumber()
  weight: number;

}