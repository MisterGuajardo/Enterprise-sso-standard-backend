import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, BeforeInsert } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { UserSystem } from '../../user-system/entities/user-system.entity';

@Entity({ name: 'sistema' })
export class System {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ name: 'nombre', type: 'varchar', length: 100, unique: true })
  name: string;

  @Column({ name: 'descripcion', type: 'varchar', length: 255, nullable: true })
  description: string;

  @CreateDateColumn({ name: 'fecha_creacion' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  updatedAt: Date;

  @OneToMany(() => UserSystem, (userSystem) => userSystem.system)
  userSystems: UserSystem[];

  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}