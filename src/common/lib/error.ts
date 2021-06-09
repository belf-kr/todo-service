import { HttpStatus } from "@nestjs/common";
import { AxiosError } from "axios";

function isAxiosError(error: any): error is AxiosError {
  return error.response !== undefined;
}

export function getErrorMessage(error: any): string {
  if (isAxiosError(error)) {
    if (error.response.data !== undefined) {
      return error.response.data;
    }
    return error.message;
  }
  return error.message;
}

export function getErrorHttpStatusCode(error: any): number {
  return isAxiosError(error) ? error.response.status : HttpStatus.INTERNAL_SERVER_ERROR;
}
