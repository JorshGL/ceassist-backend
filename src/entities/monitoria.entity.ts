import { modalitys } from 'src/types';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserToMonitoria } from './user-to-monitoria.entity';
import { Course } from './course.entity';

@Entity('monitoria')
export class Monitoria {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('timestamp')
  dateAndTime: Date;

  @Column()
  description: string;

  @Column()
  modality: modalitys;

  @OneToMany(() => UserToMonitoria, (userToMonitoria) => userToMonitoria.monitoria)
  monitoriaToUsers: UserToMonitoria[];

  @ManyToOne(() => Course)
  course: Course;
}
