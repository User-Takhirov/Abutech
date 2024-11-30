import { useMutation } from "@tanstack/react-query";
import { request } from "../../Config/request";

export const useEdit = () => {
  return useMutation({
    mutationFn: () =>
      request.post("/api/staff/contracts").then((res) => res.data),
  });
};
