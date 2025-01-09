import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDietChartDto } from './dto/create-diet-chart-dto';

@Injectable()
export class DietChartService {
  constructor(private readonly prisma: PrismaService) {}

  // create a new diet chart entry in the database
  async create(createDietChartDto: CreateDietChartDto) {
    return this.prisma.dietChart.create({
      data: {
        patientId: createDietChartDto.patientId,
        morning: createDietChartDto.morning,
        evening: createDietChartDto.evening,
        night: createDietChartDto.night,
      },
    });
  }

  // find the diet chart by patient ID
  async findByPatientId(patientId: string) {
    return this.prisma.dietChart.findMany({
      where: { patientId },
    });
  }
}
