import { Body, Controller, Post, Get, Req, UseGuards, Param } from '@nestjs/common';
import { MonitoriasService } from './monitorias.service';
import { CreateMonitoriaDTO } from './dto/create-monitoria.dto';
import { ResponseDTO } from 'src/globals/dto/response.dto';
import { responseState } from 'src/types';
import { FirebaseAuthGuard } from 'src/auth/auth.guard';
import { GlobalsService } from 'src/globals/globals.service';

@Controller('monitorias')
export class MonitoriasController {
  constructor(
    private readonly _monitoriasService: MonitoriasService,
    private readonly _globalsService: GlobalsService,
  ) {}

  @Post('create')
  async create(@Body() body: CreateMonitoriaDTO) {
    try {
      const monitoria = await this._monitoriasService.create(body);
      return {
        state: responseState.success,
        success: true,
        data: monitoria,
      } as ResponseDTO;
    } catch (err) {
      return await this._globalsService.handleError(err);
    }
  }

  @Get('findAllByStudentId/:userId')
  // @UseGuards(FirebaseAuthGuard)
  async findAllByStudentId(@Param('userId') userId) {
    try {
      const monitorias = await this._monitoriasService.findAllByStudentId(
        userId,
      );
      return {
        state: responseState.success,
        success: true,
        data: monitorias,
      } as ResponseDTO;
    } catch (err) {
      return await this._globalsService.handleError(err);
    }
  }
}
