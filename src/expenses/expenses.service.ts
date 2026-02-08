import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from 'src/expenses/entities/expense.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense)
    private readonly expenseRepository: Repository<Expense>,
  ) {}

  async create(createExpenseDto: CreateExpenseDto) {
    const newExpense = this.expenseRepository.create({
      ...createExpenseDto,
    });
    return this.expenseRepository.save(newExpense);
  }

  findAll() {
    return this.expenseRepository.find({ relations: ['user'] }); // Include user relation
  }

  findByUser(userId: number) {
    return this.expenseRepository.find({
      where: {
        userId,
      },
      relations: ['user'],
    });
  }

  findOne(id: number) {
    return this.expenseRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  update(id: number, updateExpenseDto: UpdateExpenseDto) {
    this.expenseRepository.update(id, updateExpenseDto);
    return {
      id: id,
      message: `This action updates a #${id} expense`,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} expense`;
  }
}
