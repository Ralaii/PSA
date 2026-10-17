import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { loginRequest, registerRequest } from "../services/authService";
import { toast } from "sonner";

function useAuth() {
  const navigate = useNavigate();

  const loginMutation = useMutation({
  mutationFn: loginRequest,
  onSuccess: (data) => {
    localStorage.setItem("token", data.token);
    toast.success(`Welcome back! ${data.username}`);
    navigate("/dashboard");
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