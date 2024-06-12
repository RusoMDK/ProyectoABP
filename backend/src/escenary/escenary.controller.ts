import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EscenaryService } from './escenary.service';
import { CreateEscenaryDto } from './dto/create-escenary.dto';
import { UpdateEscenaryDto } from './dto/update-escenary.dto';

@Controller('escenary')
export class EscenaryController {
  constructor(private readonly escenaryService: EscenaryService) {}

  @Post()
  create(@Body() createEscenaryDto: CreateEscenaryDto) {
    return this.escenaryService.create(createEscenaryDto);
  }

  @Get()
  findAll() {
    return this.escenaryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.escenaryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEscenaryDto: UpdateEscenaryDto) {
    return this.escenaryService.update(+id, updateEscenaryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.escenaryService.remove(+id);
  }
}
