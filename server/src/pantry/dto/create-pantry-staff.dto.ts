import { IsString, IsNotEmpty, IsPhoneNumber } from '@nestjs/class-validator';

export class CreatePantryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  contact: string;

  @IsString()
  @IsNotEmpty()
  location: string;
}
