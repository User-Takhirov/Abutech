import { useMutation } from "@tanstack/react-query";
import { request } from "../../Config/request";
import { fileType } from "../../components/DataTypes/data-types";
export const useFileCreate = () => {
  return useMutation({
    mutationFn: (data: FormData) =>
      request
        .post<fileType>("/api/staff/upload/contract/attachment", data)
        .then((res) => res.data),
  });
};
