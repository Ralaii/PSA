import { useLocation, useNavigate } from "react-router";
import { loginRequest, registerRequest } from "../services/authService";
import { toast } from "sonner";
import { useMutation,  useQueryClient } from "@tanstack/react-query";

function useAuth() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const state = useLocation().state;
  const from = state?.from ? state.from.pathname + state.from.search : "/dashboard";

  const loginMutation = useMutation({
  mutationFn: loginRequest,
  onSuccess: (data) => {
    queryClient.setQueryData(["me"], data);
    toast.success(`Welcome back! ${data.name}`);
    navigate(from, { replace: true });
  },
  onError: (error) => {
    toast.error(error.message);
  }
});

  const registerMutation = useMutation({
    mutationFn: registerRequest,
    onSuccess: () => navigate("/login"),
  });

  const login = (credentials) => loginMutation.mutate(credentials);

  const register = ({ confirmPassword, ...fields }) => {
    if (fields.password.length < 8) {
      registerMutation.reset();
      return "Password must be at least 8 characters.";
    }
    if (fields.password !== confirmPassword) {
      registerMutation.reset();
      return "Passwords do not match.";
    }
    registerMutation.mutate(fields);
  };

  return { 
    login, 
    register, 
    loginMutation, 
    registerMutation };
}

export default useAuth;