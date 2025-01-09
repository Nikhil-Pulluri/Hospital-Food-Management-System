import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PantryService } from './pantry.service';
import { CreatePantryDto } from './dto/create-pantry-staff.dto';
import { UpdatePantryDto } from './dto/update-pantry-staff.dto';

@Controller('pantry')
export class PantryController {
  constructor(private pantryService: PantryService) {}

  @Get()
  async getAllPantryStaff() {
    return this.pantryService.findAll();
  }

  @Get(':id')
  async getPantryStaffById(@Param('id') id: string) {
    return this.pantryService.findOne(id);
  }

  @Post()
  async createPantryStaff(@Body() createPantryStaffDto: CreatePantryDto) {
    return this.pantryService.create(createPantryStaffDto);
  }

  @Put(':id')
  async updatePantryStaff(
    @Param('id') id: string,
    @Body() updatePantryStaffDto: UpdatePantryDto,
  ) {
    return this.pantryService.update(id, updatePantryStaffDto);
  }

  @Delete(':id')
  async deletePantryStaff(@Param('id') id: string) {
    return this.pantryService.remove(id);
  }
}
