import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Monitoria } from 'src/entities/monitoria.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MonitoriasService {
  constructor(
    @InjectRepository(Monitoria)
    private readonly _monitoriasRepository: Repository<Monitoria>,
  ) {}
}
