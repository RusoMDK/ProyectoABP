import { Injectable } from '@nestjs/common';
import { CreateEscenaryDto } from './dto/create-Escenary.dto';
import { UpdateEscenaryDto } from './dto/update-Escenary.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Escenary } from './entities/Escenary.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EscenaryService {
  constructor(
    @InjectRepository(Escenary)
    private readonly escenaryRepository: Repository<Escenary>,
  ) {}
  create(createEscenaryDto: CreateEscenaryDto) {
    this.escenaryRepository.create(createEscenaryDto);
    return this.escenaryRepository.save(createEscenaryDto);
  }

  findAll() {
    return this.escenaryRepository.find();
  }

  findByUser(userId: number) {
    return this.escenaryRepository.find({
      where: {
        user: {
          id: userId,
        } as any,
      },
    });
  }

  findOne(id: number) {
    return this.escenaryRepository.findOneBy({ id });
  }

  update(id: number, updateEscenaryDto: UpdateEscenaryDto) {
    return this.escenaryRepository.update(id, updateEscenaryDto);
  }

  remove(id: number) {
    return this.escenaryRepository.delete(id);
  }
}
