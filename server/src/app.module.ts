import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientController } from './patients/patients.controller';
import { PatientService } from './patients/patients.service';
import { PrismaModule } from './prisma/prisma.module';
import { DietChartModule } from './diet-chart/diet-chart.module';

@Module({
  imports: [PrismaModule, DietChartModule],
  controllers: [AppController, PatientController],
  providers: [AppService, PatientService],
})
export class AppModule {}
