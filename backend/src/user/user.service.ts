import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userService: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(createUserDto.password, salt);
    const user = this.userService.create({
      ...createUserDto,
      password: hashed,
    });
    return this.userService.save(user);
  }

  findAll() {
    return this.userService.find({ relations: ['role'] });
  }

  async findOneUsername(username: string): Promise<User> {
    return this.userService.findOne({
      where: { username },
      relations: ['role'],
    });
  }

  findOne(id: number) {
    return this.userService.findOneBy({ id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userService.delete(id);
  }
}
