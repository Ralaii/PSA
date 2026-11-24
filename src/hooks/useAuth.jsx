import { useLocation, useNavigate } from "react-router";
import { loginRequest, logoutRequest, registerRequest } from "../services/authService";
import { toast } from "sonner";
import { useMutation,  useQueryClient } from "@tanstack/react-query";
import { authenticatedRole } from "@/config/role";

function useAuth() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const state = useLocation().state;
  const from = state?.from ? state.from.pathname + state.from.search : "/dashboard";

  // LOGIN HOOK
  const loginMutation = useMutation({
  mutationFn: loginRequest,
  onSuccess: async (data) => {
    await queryClient.setQueryData(["me"], data);

    if (!authenticatedRole.includes(data.role)) {
      toast.error("You don't have permission to access this page")
      navigate("/unauthorized", { replace: true})
      return;
    }

    toast.success(`Welcome back! ${data.name}`);
    navigate(from, { replace: true });
  },
  onError: (error) => {
    toast.error(error.message);
  }
});

  // LOGOUT HOOK
  const logoutMutation = useMutation({
    mutationFn: logoutRequest,
    onSuccess: () => {
      queryClient.clear();

      toast.success("Logged out successfully");
      navigate("/login", {replace: true})
    },
    onError: (error) => {
      toast.error(error.message || "Failed to logout")
    }
  }); 

  // REGISTER HOOK
  const registerMutation = useMutation({
    mutationFn: registerRequest,
    onSuccess: () => navigate("/login"),
  });


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
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    register, 

    isLoggingOut: logoutMutation.isPending,
  };
}

export default useAuth;