import { IPermissions } from "src/types";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('role')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('jsonb')
  permissions: IPermissions;
}