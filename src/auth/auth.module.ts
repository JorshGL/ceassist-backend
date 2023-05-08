import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GlobalsModule } from 'src/globals/globals.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    GlobalsModule,
    UsersModule
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
