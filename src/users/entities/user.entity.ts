import { Expense } from 'src/expenses/entities/expense.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Expense, (expense) => expense.user.id) // One user can have many expenses
  expenses: Expense[];
}
