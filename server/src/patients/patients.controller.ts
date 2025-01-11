import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { PatientService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient-dto';

@Controller('patients')  
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  //  create a new patient
  @Post()
  async create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientService.create(createPatientDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePatientDto: UpdatePatientDto,
  ) {
    return this.patientService.updatePatient(id, updatePatientDto);
  }

  //  get all patients
  @Get()
  async findAll() {
    return this.patientService.getAllPatients();
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
