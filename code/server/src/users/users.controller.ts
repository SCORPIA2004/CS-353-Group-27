import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { loginDto } from './dto/login.dto';
import { registerDto } from './dto/register.dto';
import { ApiHeader, ApiResponse } from '@nestjs/swagger';
import { UsersGuard } from '@/src/users/users.guard';
import { SimplePipe } from '@/pipes';

@UsePipes(SimplePipe)
@Controller('users')
@ApiResponse({
  status: 500,
  description: 'Internal server error. Please try again later.',
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({ status: 200, description: 'Returns authorization token' })
  @Post('login')
  async login(@Body() data: loginDto){
    return await this.usersService.login(data);
  }

  @ApiResponse({ status: 200, description: 'Returns authorization token' })
  @ApiResponse({
    status: 400,
    description:
      'Validation failed: user already exists, must be at least 18 years old, or database error occurred',
  })
  @Post('register')
  register(@Body() data: registerDto): string {
    return 'register';
  }

  @Patch('update-account')
  updateAccount() {
    return 'Update Account';
  }

  @Delete('delete-account')
  deleteAccount() {
    return 'Delete Account';
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer <token>',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Token is valid and can be used to perform other operations.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. Token is either missing, invalid, or expired.',
  })
  @Get('check-token')
  @UseGuards(UsersGuard)
  async checkToken() {}
}
