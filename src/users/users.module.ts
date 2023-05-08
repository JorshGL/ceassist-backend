import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { RolesModule } from 'src/roles/roles.module';
import { UsersController } from './users.controller';
import { GlobalsModule } from 'src/globals/globals.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    RolesModule,
    GlobalsModule
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
