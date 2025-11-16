import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtService } from '@nestjs/jwt';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly jwtService: JwtService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/login')
  login(@Body() body: any) {
    const payload = {
      id: Date.now(),
      role: body.role,
    };

    return {
      payload,
      access_token: this.jwtService.sign(payload),
    };
  }
}
