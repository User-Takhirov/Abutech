import { useMutation } from "@tanstack/react-query";
import { request } from "../../Config/request";
interface fileType {
  data: {
    fileName: string;
    path: string;
    size: number;
  }[];
  error: null;
  success: boolean;
}
export const useFileCreate = () => {
  return useMutation({
    mutationFn: (data: FormData) =>
      request
        .post<fileType>("/api/staff/upload/contract/attachment", data)
        .then((res) => res.data),
  });
};
