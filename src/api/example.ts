import { handleZodError } from "@/helpers/zod-error-handler";
import axiosInstance from "@/lib/axios";
import { IUsersRequest } from "@/types/types";

export const getUsers = async (page: string, search?: string) => {
  try {
    const response = await axiosInstance.get("/user", {
      params: {
        page,
        limit: 10,
        search,
      },
    });

    const data: IUsersRequest = response.data;

    return data;
  } catch (error) {
    handleZodError(error);
  }
};
