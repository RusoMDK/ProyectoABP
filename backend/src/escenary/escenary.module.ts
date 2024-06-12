import { Module } from '@nestjs/common';
import { EscenaryService } from './escenary.service';
import { EscenaryController } from './escenary.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Escenary } from './entities/escenary.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Escenary])],
  controllers: [EscenaryController],
  providers: [EscenaryService],
})
export class EscenaryModule {}
