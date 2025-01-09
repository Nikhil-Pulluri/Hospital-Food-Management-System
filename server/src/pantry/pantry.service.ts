import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePantryDto } from './dto/create-pantry-staff.dto';
import { UpdatePantryDto } from './dto/update-pantry-staff.dto';

@Injectable()
export class PantryService {
  constructor(private readonly prisma: PrismaService) {}

  // Create a new pantry staff
  async create(createPantryDto: CreatePantryDto) {
    return this.prisma.pantryStaff.create({
      data: createPantryDto,
    });
  }

  // Get all pantry staff
  async findAll() {
    return this.prisma.pantryStaff.findMany(
      { include: { tasks: true } }
    );
  }

  // Get a single pantry staff by ID
  async findOne(id: string) {
    const pantry = await this.prisma.pantryStaff.findUnique({
      where: { id },
    });

    if (!pantry) {
      throw new NotFoundException(`Pantry staff with ID ${id} not found`);
    }

    return pantry;
  }

  // Update a pantry staff
  async update(id: string, updatePantryDto: UpdatePantryDto) {
    const pantry = await this.prisma.pantryStaff.findUnique({ where: { id } });

    if (!pantry) {
      throw new NotFoundException(`Pantry staff with ID ${id} not found`);
    }

    return this.prisma.pantryStaff.update({
      where: { id },
      data: updatePantryDto,
    });
  }

  // Delete a pantry staff
  async remove(id: string) {
    const pantry = await this.prisma.pantryStaff.findUnique({ where: { id } });

    if (!pantry) {
      throw new NotFoundException(`Pantry staff with ID ${id} not found`);
    }

    return this.prisma.pantryStaff.delete({
      where: { id },
    });
  }


  async assignTask(pantryStaffId: string, description: string) {
    return this.prisma.pantryTask.create({
        data: {
            pantryStaffId,
            description,
            status: 'Pending', // Default status
        },
    });

  }

  async getTasksForPantryStaff(pantryStaffId: string) {
    return this.prisma.pantryTask.findMany({
        where: { pantryStaffId },
        orderBy: { assignedAt: 'desc' },
    });
  }

  async updateTaskStatus(taskId: string, status: string) {
    return this.prisma.pantryTask.update({
        where: { id: taskId },
        data: { status },
    });
  }



}
