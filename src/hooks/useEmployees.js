import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { employeeService } from "../services/employeeService";

const KEY = ["employees"];

export const useEmployees = ({ page = 0, size = 25, q = ""} = {}) => {
  return useQuery({
    queryKey: [...KEY, { page, size, q }],
    queryFn: () => employeeService.getAll({ page, size, q}),
    placeholderData: keepPreviousData,
  });
};

export const useEmployee = (id) => {
  return useQuery({
    queryKey: [...KEY, id],
    queryFn: () => employeeService.getById(id),
    enabled: !!id,
    retry: false,
  });
};