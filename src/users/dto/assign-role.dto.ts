import { IsNotEmpty } from "class-validator";

export class AssignRoleDTO {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  roleId: string;
}