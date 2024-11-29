import { formDataType } from "./../../components/Form/formdataType";
import { useMutation } from "@tanstack/react-query";
import { request } from "../../Config/request";

export const useCreateData = () => {
  return useMutation({
    mutationFn: (data: formDataType) =>
      request
        .post<formDataType>("/api/staff/contracts/create", data)
        .then((res) => res.data),
  });
};
