import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly _rolesRepository: Repository<Role>,
  ) {}

  async create(role: Role): Promise<Role> {
    return await this._rolesRepository.save(role);
  }

  async findOne(id: string): Promise<Role> {
    return await this._rolesRepository.findOne({
      where: { id },
    });
  }

  async findAll(): Promise<Role[]> {
    return await this._rolesRepository.find();
  }

  async update(id: string, role: Partial<Role>): Promise<void> {
    await this._rolesRepository.update(id, role);
  }

  async delete(id: string): Promise<void> {
    await this._rolesRepository.delete(id);
  }

  async findOneByName(name: string): Promise<Role> {
    return await this._rolesRepository.findOne({
      where: { name },
    });
  }
}
