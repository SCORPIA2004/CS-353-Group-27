import { Body, Controller, Get, Post, UseGuards, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { loginDto } from './dto/login.dto';
import { registerDto } from './dto/register.dto';
import { ApiHeader, ApiResponse } from '@nestjs/swagger';
import { UsersGuard } from '@/src/users/users.guard';
import { SimplePipe } from '@/pipes';

@Controller('users')
@UsePipes(SimplePipe)
@ApiResponse({
  status: 500,
  description: 'Internal server error. Please try again later.',
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @Post('login')
  @ApiResponse({ status: 200, description: 'Returns authorization token' })
  @ApiResponse({ status: 401, description: 'Unauthorized. Invalid email or password.' })
  async login(@Body() data: loginDto) {
    return await this.usersService.login(data);
  }

  @Post('register')
  @ApiResponse({ status: 200, description: 'Returns authorization token' })
  @ApiResponse({ status: 400, description: 'Validation failed: user already exists' })
  async register(@Body() data: registerDto) {
    return await this.usersService.register(data);
  }

  @Get('check-token')
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
  @UseGuards(UsersGuard)
  async checkToken() {
  }
}
