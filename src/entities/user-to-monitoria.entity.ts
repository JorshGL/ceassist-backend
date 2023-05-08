import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Monitoria } from "./monitoria.entity";
import { monitoriaRoles } from "src/types";

@Entity('user_monitoria')
export class UserToMonitoria {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne(() => User, (user) => user.userToMonitorias)
  user: User;

  @ManyToOne(() => Monitoria, (monitoria) => monitoria.monitoriaToUsers)
  monitoria: Monitoria;

  @Column()
  role: monitoriaRoles;
}
