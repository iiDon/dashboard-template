import { handleZodError } from "@/helpers/zod-error-handler";
import axiosInstance from "@/lib/axios";
import { IUsersRequest } from "@/types/types";

export const getUsers = async (params: { [key: string]: string }) => {
  try {
    const response = await axiosInstance.get("/user", {
      params: params,
    });

    const data: IUsersRequest = response.data;

    return data;
  } catch (error) {
    handleZodError(error);
  }
};
