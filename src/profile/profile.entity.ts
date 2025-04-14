import { User } from 'src/users/user.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 100,
  })
  firstName: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 100,
  })
  lastName: string;

  @Column({ nullable: true, type: 'varchar', length: 10 })
  gender: string;

  @Column({ nullable: true, type: 'timestamp' })
  dateOfBirth: Date;

  @Column({ nullable: true, type: 'text' })
  bio: string;

  @Column({ nullable: true, type: 'text' })
  profileImage: string;

  @OneToOne(() => User, (user) => user.profile, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;
}
