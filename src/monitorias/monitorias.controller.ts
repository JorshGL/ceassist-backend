import { Body, Controller, Post } from '@nestjs/common';
import { MonitoriasService } from './monitorias.service';
import { CreateMonitoriaDTO } from './dto/create-monitoria.dto';
import { ResponseDTO } from 'src/globals/dto/response.dto';
import { responseState } from 'src/types';

@Controller('monitorias')
export class MonitoriasController {
  constructor(private readonly _monitoriasService: MonitoriasService) {}

  @Post('create')
  async create(@Body() body: CreateMonitoriaDTO) {
    try {
      const monitoria = await this._monitoriasService.create(body);
      return {
        state: responseState.success,
        success: true,
        data: monitoria
      } as ResponseDTO
    } catch (err) {
      return {
        state: responseState.error,
        success: false,
        message: err.message
      } as ResponseDTO
    }
  }
}
