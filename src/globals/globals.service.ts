import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { responseState } from 'src/types';
import { ResponseDTO } from './dto/response.dto';


@Injectable()
export class GlobalsService {
  async handleError(error: Error) {
    throw new HttpException({
      state: responseState.error,
      success: false,
      message: error.message
    }, HttpStatus.BAD_REQUEST);
  }
}
