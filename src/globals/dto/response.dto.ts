import { responseState } from "src/types";

export class ResponseDTO {
  state: responseState;
  success: boolean;
  message?: string;
  data?: any;
}