import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { SensorService } from './sensors.service';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';

@Controller('sensors')
export class SensorsController {
  constructor(private readonly sensorsService: SensorService) {}

  @Post()
  create(@Body() createSensorDto: CreateSensorDto) {
    return this.sensorsService.create(createSensorDto);
  }

  @Get()
  findAll() {
    return this.sensorsService.findAll();
  }

  @Get('by-user')
  findByUser(@Query('userId') userId: number) {
    return this.sensorsService.findByUser(userId);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sensorsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSensorDto: UpdateSensorDto) {
    return this.sensorsService.update(+id, updateSensorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sensorsService.remove(+id);
  }
}
