import { useMutation } from "@tanstack/react-query";
import { request } from "../../Config/request";
import { useLoginDataType } from "./useLoginDataType";

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: useLoginDataType) =>
      request.post("/api/staff/auth/sign-in", data).then((res) => res.data),
  });
};
