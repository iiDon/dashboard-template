import { IZodError } from "@/types/types";
import { AxiosError } from "axios";

export function isIZodError(error: any): error is IZodError {
  return error.code !== undefined;
}

export const handleZodError = (error: unknown) => {
  if (error instanceof AxiosError) {
    if (isIZodError(error.response?.data)) {
      const zodErrors: string = error.response?.data.errors
        .map((error: { message: string }) => error.message)
        .join("\n");
      throw new Error(zodErrors);
    }

    if (error.response?.data.message) {
      throw new Error(error.response.data.message);
    }
  }
};
