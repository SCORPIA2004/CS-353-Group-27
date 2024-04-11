import { Controller, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  @ApiResponse({ status: 200, description: 'Server is live.' })
  @ApiResponse({ status: 404, description: 'Server is not live.' })
  @Get()
  healthCheck(): string {
    return "I'm alive!";
  }
}
