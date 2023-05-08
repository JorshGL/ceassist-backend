import { IsNotEmpty, IsOptional } from "class-validator";

export class RegisterDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  career: string;

  @IsNotEmpty()
  semester: number;

  @IsNotEmpty()
  faculty: string;

  @IsOptional()
  pictureRef: string;
}