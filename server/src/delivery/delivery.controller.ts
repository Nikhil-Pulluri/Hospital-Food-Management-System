import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { DeliveryService } from './delivery.service';

@Controller('delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Post('personnel')
  async createPersonnel(@Body() { name, contact }: { name: string; contact: string }) {
    return this.deliveryService.createDeliveryPersonnel(name, contact);
  }

  @Get('personnel')
  async getAllPersonnel() {
    return this.deliveryService.getAllDeliveryPersonnel();
  }

  @Post('tasks/assign')
  async assignTask(
    @Body() { patientId, deliveryPersonnelId, notes }: { patientId: string; deliveryPersonnelId: string; notes?: string },
  ) {
    return this.deliveryService.assignDeliveryTask(patientId, deliveryPersonnelId, notes);
  }

  @Patch('tasks/:taskId/status')
  async updateTaskStatus(@Param('taskId') taskId: string, @Body('status') status: string) {
    return this.deliveryService.updateDeliveryStatus(taskId, status);
  }

  @Get('tasks/personnel/:personnelId')
  async getTasksByPersonnel(@Param('personnelId') personnelId: string) {
    return this.deliveryService.getDeliveryTasksByPersonnel(personnelId);
  }

  @Get('tasks')
  async getAllTasks() {
    return this.deliveryService.getAllDeliveryTasks();
  }
}
