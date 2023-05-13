import { IsNotEmpty, IsOptional } from "class-validator";
import { modalitys } from "src/types";

export class CreateMonitoriaDTO {
  @IsNotEmpty()
  dateAndTimeStart: Date;

  @IsNotEmpty()
  dateAndTimeEnd: Date;

  @IsOptional()
  description?: string;

  @IsNotEmpty()
  modality: modalitys;

  @IsNotEmpty()
  instructorId: string;

  @IsNotEmpty()
  studentId: string;

  @IsNotEmpty()
  courseId: string;
}