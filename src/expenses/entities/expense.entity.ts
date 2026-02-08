import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Expense {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  // 1. Explicitly define the column
  @Column()
  userId: number;

  // 2. Link the relation to that column
  @ManyToOne(() => User, (user) => user.expenses, { onDelete: 'CASCADE' }) // Cascade delete expenses when user is deleted
  @JoinColumn({ name: 'userId' }) // Specify the foreign key column name
  user: User;
}
