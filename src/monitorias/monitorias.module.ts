import { Module } from '@nestjs/common';
import { MonitoriasService } from './monitorias.service';
import { MonitoriasController } from './monitorias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Monitoria } from 'src/entities/monitoria.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Monitoria]),
  ],
  providers: [MonitoriasService],
  controllers: [MonitoriasController]
})
export class MonitoriasModule {}
