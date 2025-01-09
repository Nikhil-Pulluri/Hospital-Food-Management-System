import { Module } from '@nestjs/common';
import { DietChartController } from './diet-chart.controller';
import { DietChartService } from './diet-chart.service';
import { PrismaModule } from '../prisma/prisma.module'; 

@Module({
  imports: [PrismaModule],  
  controllers: [DietChartController],
  providers: [DietChartService],
})
export class DietChartModule {}
