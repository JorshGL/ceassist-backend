import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { GlobalsService } from 'src/globals/globals.service';
import { AssignRoleDTO } from './dto/assign-role.dto';
import { InstructorsFiltersDTO } from './dto/instructors-filters.dto';
import { ResponseDTO } from 'src/globals/dto/response.dto';
import { responseState } from 'src/types';
import { AddCourseDTO } from './dto/add-course.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly _usersService: UsersService,
    private readonly _globalsService: GlobalsService,
  ) {}

  @Get('user/:userId')
  async findOneById(@Query('userId') userId: string) {
    try {
      const user = await this._usersService.findOneById(userId);
      return {
        data: user,
        message: 'User retrieved successfully',
        state: responseState.success,
        success: true,
      }
    } catch (error) {
      return await this._globalsService.handleError(error);
    }
  }

  @Post('assign-role')
  async assignRole(@Body() { userId, roleId }: AssignRoleDTO) {
    try {
      return await this._usersService.assignRole(userId, roleId);
    } catch (error) {
      return await this._globalsService.handleError(error);
    }
  }

  @Get('instructors')
  async findAllInstructors(
    @Query() instructorsFiltersDto?: InstructorsFiltersDTO,
  ) {
    try {
      const instructors = await this._usersService.findAllInstructors(
        instructorsFiltersDto,
      );
      return {
        data: instructors,
        message: 'Instructors retrieved successfully',
        state: responseState.success,
        success: true,
      } as ResponseDTO;
    } catch (error) {
      return await this._globalsService.handleError(error);
    }
  }

  @Post('add-course-to-instructor')
  async addCourseToInstructor(
    @Body() { instructorId, courseId }: AddCourseDTO,
  ) {
    try {
      const instructor = await this._usersService.addCourseToInstructor(
        instructorId,
        courseId,
      );

      return {
        data: instructor,
        message: 'Course added to instructor successfully',
        state: responseState.success,
        success: true,
      } as ResponseDTO;
    } catch (error) {
      return await this._globalsService.handleError(error);
    }
  }
}
