import { IsNotEmpty } from 'class-validator';

export class AddCourseDTO {
  @IsNotEmpty()
  courseId: string;

  @IsNotEmpty()
  instructorId: string;
}
