import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../../Config/request";
import { editDataType } from "../../components/DataTypes/data-types";

export const userEditSert = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: editDataType }) =>
      request.put(`/api/staff/contracts/${id}`, data).then((res) => res.data),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["get-all-data"] });
    },
  });
};
