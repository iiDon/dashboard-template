import { handleZodError } from "@/helpers/zod-error-handler";
import axiosInstance from "../lib/axios";

export const login = async (data: { phone: string }) => {
  try {
    const phoneWithZero = {
      phone: `0${data.phone}`,
    };
    const response = await axiosInstance.post("/auth/login", phoneWithZero);

    return response.data;
  } catch (error) {
    handleZodError(error);
  }
};

export const register = async (data: { phone: string; name: string }) => {
  try {
    const phoneWithZero = {
      name: data.name,
      phone: `0${data.phone}`,
    };
    const response = await axiosInstance.post("/auth/register", phoneWithZero);

    return response.data;
  } catch (error) {
    handleZodError(error);
  }
};

export const verifyOTP = async (data: { phone: string; OTP: string }) => {
  try {
    const phoneWithZero = {
      phone: `0${data.phone}`,
      OTP: data.OTP,
    };
    const response = await axiosInstance.post(
      "/auth/verify-otp",
      phoneWithZero,
    );

    return response.data;
  } catch (error) {
    handleZodError(error);
  }
};
