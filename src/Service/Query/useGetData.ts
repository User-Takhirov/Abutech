import { useQuery } from "@tanstack/react-query";
import { request } from "../../Config/request";
import { getDataType } from "../../Layout/main-layout";

export const useGetData = () => {
  return useQuery({
    queryKey: ["get-all-data"],
    queryFn: () =>
      request
        .get<getDataType>("/api/staff/contracts/all")
        .then((res) => res.data),
  });
};
