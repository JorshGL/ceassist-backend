import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Monitoria } from 'src/entities/monitoria.entity';
import { In, Repository } from 'typeorm';
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

  async findAllByStudentId(studentId: string): Promise<Monitoria[]> {
    const monitorias = await this._monitoriasRepository.find({
      select: {
        id: true,
      },
      where: {
        monitoriaToUsers: {
          user: { id: studentId },
          role: monitoriaRoles.student,
        },
      },
    });

    return await this._monitoriasRepository.find({
      relations: ['course', 'monitoriaToUsers', 'monitoriaToUsers.user'],
      where: {
        id: In(monitorias.map((monitoria) => monitoria.id)),
      },
    });
  }
}
