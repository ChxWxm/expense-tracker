import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {}
  readonly SALT_ROUND = 10;

  async onApplicationBootstrap() {
    const count = await this.userRepository.count();
    if (count === 0) {
      // Seeding data
      const adminEmail = this.configService.get<string>('admin.email') ?? '';
      const adminPassword =
        this.configService.get<string>('admin.password') ?? '';

      const salt = await bcrypt.genSalt(this.SALT_ROUND);
      const hashedPassword = await bcrypt.hash(adminPassword, salt);

      const adminUser = this.userRepository.create({
        username: 'AdminScorpio',
        email: adminEmail,
        password: hashedPassword,
      });

      await this.userRepository.save(adminUser);
    }
  }

  async create(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt(this.SALT_ROUND);
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return this.userRepository.save(newUser);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.userRepository.update(id, updateUserDto);
    return {
      id: id,
      message: `This action updates a #${id} user`,
    };
  }

  remove(id: number) {
    this.userRepository.delete(id);
    return {
      id: id,
      message: `This action removes a #${id} user`,
    };
  }
}
