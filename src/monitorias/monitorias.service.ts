import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Monitoria } from 'src/entities/monitoria.entity';
import { Repository } from 'typeorm';
import { CreateMonitoriaDTO } from './dto/create-monitoria.dto';
import { monitoriaRoles } from 'src/types';

@Injectable()
export class MonitoriasService {
  constructor(
    @InjectRepository(Monitoria)
    private readonly _monitoriasRepository: Repository<Monitoria>,
  ) {}

  async create(dto: CreateMonitoriaDTO): Promise<Monitoria> {
    const {
      dateAndTimeStart,
      dateAndTimeEnd,
      description,
      modality,
      instructorId,
      studentId,
      courseId,
    } = dto;

    return await this._monitoriasRepository.save({
      dateAndTimeStart,
      dateAndTimeEnd,
      description,
      modality,
      course: { id: courseId },
      monitoriaToUsers: [
        { user: { id: instructorId }, role: monitoriaRoles.monitor },
        { user: { id: studentId }, role: monitoriaRoles.student },
      ],
    });
  }
}
