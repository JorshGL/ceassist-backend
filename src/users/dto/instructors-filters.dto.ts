import { IsOptional, IsString } from "class-validator";

export class InstructorsFiltersDTO {
    @IsOptional()
    @IsString()
    course?: string;

    @IsOptional()
    @IsString()
    name?: string;
}