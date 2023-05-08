import { Module } from '@nestjs/common';
import { GlobalsService } from './globals.service';

@Module({
  exports: [GlobalsService],
  providers: [GlobalsService]
})
export class GlobalsModule {}
