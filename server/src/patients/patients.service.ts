import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';  
import { CreatePatientDto } from './dto/create-patient.dto'; 
import { Patient } from '@prisma/client';  

@Injectable()
export class PatientService {
  constructor(private readonly prisma: PrismaService) {}  

  // create new patient method
  async create(createPatientDto: CreatePatientDto): Promise<Patient> {
    return this.prisma.patient.create({
      data: createPatientDto,
    });
  }

  // get all patients method
  async getAllPatients() {
    return this.prisma.patient.findMany({
      include: {
        dietChart: true, 
        DeliveryTask : true,
      },
    });
  }

  //  get a specific patient by ID method
  async findOne(id: string): Promise<Patient | null> {
    return this.prisma.patient.findUnique({
      where: { id },  
      include: {
        dietChart: true, 
      },
    });
  }


  async updatePatient(id: string, updatePatientDto: Partial<Patient>): Promise<Patient> {
    return this.prisma.patient.update({
      where: { id },
      data: updatePatientDto,
    });
  }

  //  delete a patient by ID method 
  async remove(id: string): Promise<Patient> {
    return this.prisma.patient.delete({
      where: { id }, 
    });
  }
}
