import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DeliveryService {

  constructor(private prisma: PrismaService) {}

  async createDeliveryPersonnel(name: string, contact: string) {
    return this.prisma.deliveryPersonnel.create({
      data: {
        name,
        contact,
      },
    });
  }

  async getAllDeliveryPersonnel() {
    return this.prisma.deliveryPersonnel.findMany(
      {
        include: {
          tasks: true,
        },
      }
    );
  }

  async assignDeliveryTask(patientId: string, deliveryPersonnelId: string, notes?: string) {
    // Ensure delivery personnel exists
    const deliveryPersonnel = await this.prisma.deliveryPersonnel.findUnique({
      where: { id: deliveryPersonnelId },
    });
  
    if (!deliveryPersonnel) {
      throw new Error("Delivery personnel not found");
    }
  
    // Assign the task
    return this.prisma.deliveryTask.create({
      data: {
        patientId,
        deliveryPersonnelId,
        notes,
        status: "In Transit",
      },
    });
  }



  async updateDeliveryStatus(taskId: string, status: string) {
    if (!["Pending", "In Transit", "Delivered"].includes(status)) {
      throw new Error("Invalid delivery status");
    }
  
    return this.prisma.deliveryTask.update({
      where: { id: taskId },
      data: {
        status,
        deliveredAt: status === "Delivered" ? new Date() : null,
      },
    });
  }


  async getDeliveryTasksByPersonnel(personnelId: string) {
    return this.prisma.deliveryTask.findMany({
      where: { deliveryPersonnelId: personnelId },
      include: {
        patient: true, // Include patient details for context
      },
    });
  }
  

  async getAllDeliveryTasks() {
    return this.prisma.deliveryTask.findMany({
      include: {
        patient: true, // Include patient details
        deliveryPersonnel: true, // Include delivery personnel details
      },
    });
  }


}
