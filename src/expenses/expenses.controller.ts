import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../decorators/current-user.decorator';
import { ActiveUser } from '../auth/interfaces/active-user.interface';

@Controller('expenses')
@UseGuards(AuthGuard('jwt'))
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  create(
    @Body() createExpenseDto: CreateExpenseDto,
    @CurrentUser() user: ActiveUser,
  ) {
    // Get user id from token
    const userIdFromToken = user.userId;
    return this.expensesService.create(createExpenseDto, userIdFromToken);
  }

  @Get()
  findAll(@CurrentUser() user: ActiveUser) {
    return this.expensesService.findAllByUser(user.userId);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: ActiveUser,
  ) {
    return this.expensesService.findOne(id, user.userId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateExpenseDto: UpdateExpenseDto,
    @CurrentUser() user: ActiveUser,
  ) {
    return this.expensesService.update(id, updateExpenseDto, user.userId);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: ActiveUser,
  ) {
    return this.expensesService.remove(id, user.userId);
  }
}
