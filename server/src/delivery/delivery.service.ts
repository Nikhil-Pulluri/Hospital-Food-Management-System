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
          tasks: {
            include: {
              DeliveryStatus: true,  
            }
          },
        },
      }
    );
  }

  async assignDeliveryTask(patientId: string, deliveryPersonnelId: string, notes?: string) {
    // Check if patient exists
    const patient = await this.prisma.patient.findUnique({
      where: { id: patientId },
    });
  
    if (!patient) {
      throw new Error("Patient not found");
    }
  
    // Ensure delivery personnel exists
    const deliveryPersonnel = await this.prisma.deliveryPersonnel.findUnique({
      where: { id: deliveryPersonnelId },
    });
  
    if (!deliveryPersonnel) {
      throw new Error("Delivery personnel not found");
    }
  
    // Assign the delivery task
    const deliveryTask = await this.prisma.deliveryTask.create({
      data: {
        patientId,
        deliveryPersonnelId,
        notes,
        status: "Pending",
      },
    });

    const patientDetail = await this.prisma.patient.findUnique({
      where: { id: patientId },
      include: {
        dietChart: true,  // Include the diet chart
      },
    });


    if (!patientDetail?.dietChart || patientDetail.dietChart.length === 0) {
      throw new Error("No diet chart found for the patient");
    }
  
    // Create the initial delivery status for the task
    await this.prisma.deliveryStatus.create({
      data: {
        deliveryTaskId: deliveryTask.id, // Linking the DeliveryTask
        dietChartId: patientDetail.dietChart[0].id, // Link to the patient's DietChart, if available
        status: "Pending",
        deliveryTime: null,
      },
    });
  
    // Return the created task
    return deliveryTask;
  }





  async updateDeliveryStatus(taskId: string, status: string) {
    // Validate status
    if (!["Pending", "In Transit", "Delivered"].includes(status)) {
      throw new Error("Invalid delivery status");
    }
  
    // Fetch the delivery task
    const deliveryTask = await this.prisma.deliveryTask.findUnique({
      where: { id: taskId },
      include: { DeliveryStatus: true }, // Include DeliveryStatus to ensure it exists
    });
  
    if (!deliveryTask) {
      throw new Error("Delivery task not found");
    }
  
    // Update the delivery task status
    const statusUpdate = await this.prisma.deliveryTask.update({
      where: { id: taskId },
      data: {
        status,
      },
    });
  
    // Find the first delivery status linked to this task
    const deliveryStatus = deliveryTask.DeliveryStatus[0]; // Assuming a single deliveryStatus, or adjust logic accordingly
  
    if (!deliveryStatus) {
      throw new Error("No delivery status found for this task");
    }
  
    // Update the delivery status
    await this.prisma.deliveryStatus.update({
      where: { id: deliveryStatus.id },  // Update by deliveryStatus ID, not task ID
      data: {
        status,
        deliveryTime: new Date(),
      },
    });
  
    return statusUpdate;
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
