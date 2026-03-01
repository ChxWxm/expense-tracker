import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from 'src/expenses/entities/expense.entity';
import { Repository } from 'typeorm';
import { paginationWithFilter } from '../utils/pagination.util';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense)
    private readonly expenseRepository: Repository<Expense>,
  ) {}

  async create(createExpenseDto: CreateExpenseDto, userId: number) {
    const newExpense = this.expenseRepository.create({
      ...createExpenseDto,
      userId,
    });
    return this.expenseRepository.save(newExpense);
  }

  findAll() {
    return this.expenseRepository.find({ relations: ['user'] }); // Include user relation
  }

  findAllByUser(userId: number, pagination: { page: number; limit: number }) {
    return paginationWithFilter(this.expenseRepository, pagination, {
      where: {
        userId,
      },
      relations: ['user'],
      order: { id: 'DESC' },
    });
    return this.expenseRepository.find({
      where: {
        userId,
      },
      relations: ['user'],
      order: { id: 'DESC' },
    });
  }

  async findOne(id: number, userId: number) {
    const expense = await this.expenseRepository.findOne({
      where: { id, userId },
      relations: ['user'],
    });

    if (!expense) throw new NotFoundException(`Expense #${id} does not found`);

    return expense;
  }

  async update(id: number, updateExpenseDto: UpdateExpenseDto, userId: number) {
    const expense = await this.findOne(id, userId);
    // Assign new data to old data
    Object.assign(expense, updateExpenseDto);

    return this.expenseRepository.save(expense);
  }

  async remove(id: number, userId: number) {
    const expense = await this.findOne(id, userId);
    return this.expenseRepository.remove(expense);
  }
}
