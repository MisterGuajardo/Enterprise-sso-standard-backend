import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, BeforeInsert } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../../user/entities/user.entity';
import { System } from '../../system/entities/system.entity';

@Entity({ name: 'usuario_sistema' })
export class UserSystem {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ name: 'usuario_id', type: 'uniqueidentifier' })
  userId: string;

  @Column({ name: 'sistema_id', type: 'uniqueidentifier' })
  systemId: string;

  @ManyToOne(() => User, (user) => user.userSystems, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'usuario_id' })
  user: User;

  @ManyToOne(() => System, (system) => system.userSystems, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sistema_id' })
  system: System;

  @CreateDateColumn({ name: 'fecha_asignacion' })
  assignedAt: Date;

  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}