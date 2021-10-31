import { HttpStatus } from "@nestjs/common";
import { AxiosError } from "axios";

function isAxiosError(error: any): error is AxiosError {
  return error.response !== undefined;
}

export function getErrorMessage(error: any): string {
  let errorResult: any;

  if (isAxiosError(error)) {
    if (error.response.data !== undefined) {
      errorResult = error.response.data;
    }
    errorResult = error.message;
  }

  return errorResult;
}

export function getErrorHttpStatusCode(error: any): number {
  return isAxiosError(error) ? error.response.status : HttpStatus.INTERNAL_SERVER_ERROR;
}
