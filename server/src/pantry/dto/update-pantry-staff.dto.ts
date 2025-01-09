import { IsString, IsPhoneNumber, IsOptional } from '@nestjs/class-validator';



export class UpdatePantryDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsPhoneNumber()
  @IsOptional()
  contact?: string;

  @IsString()
  @IsOptional()
  location?: string;
}
