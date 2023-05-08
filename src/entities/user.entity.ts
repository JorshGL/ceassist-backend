import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.entity';
import { UserToMonitoria } from './user-to-monitoria.entity';
import { Course } from './course.entity';
import { IDailySchedule } from 'src/types';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  career: string;

  @Column()
  faculty: string;

  @Column()
  semester: number;

  @Column({ nullable: true, name: 'picture_ref' })
  pictureRef?: string;

  @Column()
  firebaseUid: string;
  
  @ManyToOne(() => Role)
  role: Role;

  @OneToMany(() => UserToMonitoria, (userToMonitoria) => userToMonitoria.user)
  userToMonitorias?: UserToMonitoria[];

  @ManyToMany(() => Course)
  @JoinTable({
    name: 'user_course',
  })
  courses?: Course[];

  @Column({ nullable: true, type: 'jsonb' })
  schedule?: IDailySchedule[];
}
