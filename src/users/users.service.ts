import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDTO } from 'src/auth/dto/register.dto';
import { type Role } from 'src/entities/role.entity';
import { User } from 'src/entities/user.entity';
import { RolesService } from 'src/roles/roles.service';
import { userRoles } from 'src/types';
import { ILike, Not, Repository } from 'typeorm';
import { InstructorsFiltersDTO } from './dto/instructors-filters.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly _userRepository: Repository<User>,
    private readonly _rolesService: RolesService,
  ) {}

  async create(user: RegisterDTO, firebaseUid: string): Promise<User> {
    const role: Role = await this._rolesService.findOneByName(
      userRoles.student,
    );
    return await this._userRepository.save({ ...user, role, firebaseUid });
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this._userRepository.findOne({
      relations: ['role'],
      where: { email },
    });
  }

  async findOneByFirebaseUid(firebaseUid: string): Promise<User> {
    return await this._userRepository.findOne({
      relations: ['role'],
      where: { firebaseUid },
    });
  }

  async assignRole(userId: string, roleId: string): Promise<User> {
    const user: User = await this._userRepository.findOne({
      where: { id: userId },
    });
    const role: Role = await this._rolesService.findOne(roleId);
    user.role = role;
    return await this._userRepository.save(user);
  }

  async findAllInstructors(
    instructorsFiltersDto?: InstructorsFiltersDTO,
  ): Promise<User[]> {
    const { course, name } = instructorsFiltersDto;
    return await this._userRepository.find({
      relations: ['courses'],
      where: {
        role: { name: userRoles.instructor },
        courses: [
          { name: course ? ILike(`%${course}%`) : ILike(`%%`) },
          { shortname: course ? ILike(`%${course}%`) : ILike(`%%`) },
        ],
        name: name ? ILike(`%${name}%`) : ILike(`%%`),
      },
    });
  }

  async addCourseToInstructor(
    instructorId: string,
    courseId: string,
  ): Promise<User> {
    const instructor: User = await this._userRepository.findOne({
      where: { id: instructorId },
      relations: ['courses'],
    });
    instructor.courses.push({ id: courseId } as any);
    return await this._userRepository.save(instructor);
  }
}
