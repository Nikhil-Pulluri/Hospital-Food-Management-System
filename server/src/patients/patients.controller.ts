import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { PatientService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';

@Controller('patients')  
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  //  create a new patient
  @Post()
  async create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientService.create(createPatientDto);
  }

  //  get all patients
  @Get()
  async findAll() {
    return this.patientService.findAll();
  }

  //  get a specific patient by id
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.patientService.findOne(id);
  }

  //  delete a patient by id
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.patientService.remove(id);
  }
}
