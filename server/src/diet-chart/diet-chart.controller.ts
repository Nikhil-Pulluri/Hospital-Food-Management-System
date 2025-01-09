import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { DietChartService } from './diet-chart.service';
import { CreateDietChartDto } from './dto/create-diet-chart-dto';

@Controller('diet-chart')
export class DietChartController {
  constructor(private readonly dietChartService: DietChartService) {}

  //  create a new diet chart for a patient
  @Post()
  create(@Body() createDietChartDto: CreateDietChartDto) {
    return this.dietChartService.create(createDietChartDto);
  }

  //  get the diet chart of a specific patient by their ID
  @Get(':patientId')
  findOne(@Param('patientId') patientId: string) {
    return this.dietChartService.findByPatientId(patientId);
  }
}
