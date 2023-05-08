import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { FirebaseAuthGuard } from './auth.guard';
import { RegisterDTO } from './dto/register.dto';
import { GlobalsService } from 'src/globals/globals.service';
import { ResponseDTO } from 'src/globals/dto/response.dto';
import { responseState } from 'src/types';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly _authService: AuthService,
    private readonly _globalsService: GlobalsService,
  ) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDTO) {
    try {
      const user = await this._authService.register(registerDto);
      if (!user) throw new Error('User not found');
      return {
        state: responseState.success,
        data: user,
        message: 'User created successfully',
        success: true,
      } as ResponseDTO;
    } catch (error) {
      return await this._globalsService.handleError(error);
    }
  }

  @Post('login')
  async login(@Body() loginDto: LoginDTO) {
    try {
      const user = await this._authService.login(loginDto);
      if (!user) throw new Error('User not found');
      return {
        state: responseState.success,
        data: user,
        message: 'User logged in successfully',
        success: true,
      } as ResponseDTO;
    } catch (error) {
      return await this._globalsService.handleError(error);
    }
  }

  @Post('login-with-jwt')
  @UseGuards(FirebaseAuthGuard)
  async loginWithJWT(@Req() req) {
    try {
      const user = await this._authService.loginWithJWT(req.user.user_id);
      if (!user) throw new Error('User not found');
      return {
        state: responseState.success,
        data: user,
        message: 'User logged in successfully',
        success: true,
      } as ResponseDTO;
    } catch (error) {
      return await this._globalsService.handleError(error);
    }
  }
}
