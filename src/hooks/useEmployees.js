import { useQuery } from "@tanstack/react-query";
import { employeeService } from "../services/employeeService";

const KEY = ["employees"];

export const useEmployees = () => {
  return useQuery({
    queryKey: KEY,
    queryFn: () => employeeService.getAll(),
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