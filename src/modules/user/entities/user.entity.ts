import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany, BeforeInsert } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { State } from '../../state/entities/state.entity';
import { UserSystem } from '../../user-system/entities/user-system.entity';

@Entity({ name: 'usuario' })
export class User {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ name: 'nombre', type: 'varchar', length: 100 })
  firstName: string;

  @Column({ name: 'apellido', type: 'varchar', length: 100 })
  lastName: string;

  @Column({ name: 'correo', type: 'varchar', length: 150, unique: true })
  email: string;

  @Column({ name: 'contrasena', type: 'varchar', length: 255 })
  password: string;

  @CreateDateColumn({ name: 'fecha_creacion' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  updatedAt: Date;

  @Column({ name: 'fecha_desactivacion', type: 'datetime', nullable: true })
  deactivatedAt: Date;

  @Column({ name: 'estado_id' })
  stateId: number;

  @ManyToOne(() => State, (state) => state.users)
  @JoinColumn({ name: 'estado_id' })
  state: State;

  @OneToMany(() => UserSystem, (userSystem) => userSystem.user)
  userSystems: UserSystem[];

  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}