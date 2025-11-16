import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({ global: true, secret: 'BI_MAT' })],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService],
  exports: [AppService],
})
export class AppModule {}
