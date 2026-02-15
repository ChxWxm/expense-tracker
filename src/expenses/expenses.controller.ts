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
  Request,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('expenses')
@UseGuards(AuthGuard('jwt'))
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  create(@Body() createExpenseDto: CreateExpenseDto, @Request() req) {
    // Get user id from token
    const userIdFromToken = req.user.userId;

    return this.expensesService.create(createExpenseDto, userIdFromToken);
  }

  @Get()
  findAll(@Request() req) {
    const userIdFromToken = req.user.userId;
    return this.expensesService.findAllByUser(userIdFromToken);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Request() req) {
    const userIdFromToken = req.user.userId;
    return this.expensesService.findOne(id, userIdFromToken);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateExpenseDto: UpdateExpenseDto,
    @Request() req,
  ) {
    const userIdFromToken = req.user.userId;
    return this.expensesService.update(id, updateExpenseDto, userIdFromToken);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Request() req) {
    const userIdFromToken = req.user.userId;
    return this.expensesService.remove(id, userIdFromToken);
  }
}
