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
import { DataSensorService } from './data-sensor.service';
import { CreateDataSensorDto } from './dto/create-data-sensor.dto';
import { UpdateDataSensorDto } from './dto/update-data-sensor.dto';

@Controller('data-sensor')
export class DataSensorController {
  constructor(private readonly dataSensorService: DataSensorService) {}

  @Post()
  create(@Body() createDataSensorDto: CreateDataSensorDto) {
    return this.dataSensorService.create(createDataSensorDto);
  }

  @Get()
  findAll() {
    return this.dataSensorService.findAll();
  }

  @Get('by_day')
  findLastDay(@Query('day') day: string) {
    return this.dataSensorService.findLastDay(new Date(day));
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.dataSensorService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateDataSensorDto: UpdateDataSensorDto,
  ) {
    return this.dataSensorService.update(+id, updateDataSensorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.dataSensorService.remove(+id);
  }
}
