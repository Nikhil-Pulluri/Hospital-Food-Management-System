export class CreatePatientDto {
  name: string;
  age: number;
  gender: string;
  contact: string;
  emergency: string;
  roomNumber: string;
  bedNumber: string;
  floor: string;
  allergies: string[];
  disease: string;
}
