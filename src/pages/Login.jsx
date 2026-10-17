import { useState } from "react";
import { Link } from "react-router";
import { Eye, EyeOff } from "lucide-react";
import { inputClass } from "../components/styles";
import useAuth from "../hooks/useAuth";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ 
    identifier: "", 
    password: "" 
  });
  const { 
    login, 
    loading, 
    error 
  } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ 
      ...prev, 
      [name]: value 
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    login(form);
  };

  return (
    <>
      <header className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Sign in
        </h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Kindly provide your credentials to log in
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="identifier" className="sr-only">Username</label>
          <input
            id="identifier"
            name="identifier"
            type="text"
            placeholder="Username"
            autoComplete="username"
            required
            value={form.identifier}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="password" className="sr-only">Password</label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              autoComplete="current-password"
              required
              value={form.password}
              onChange={handleChange}
              className={`${inputClass} pr-11`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute inset-y-0 right-0 flex w-11 cursor-pointer items-center justify-center text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <Link
            to="/forgot-password"
            className="mt-2 block text-right text-sm text-blue-600 hover:underline dark:text-blue-400"
          >
            Forgot password?
          </Link>
        </div>

        {error && (
          <p role="alert" className="text-sm text-red-600 dark:text-red-400">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full cursor-pointer rounded-lg bg-zinc-900 px-3 py-2.5 font-medium text-white transition hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-900/40 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300 dark:focus:ring-zinc-100/40 dark:focus:ring-offset-zinc-900"
        >
          {loading ? "Signing in..." : "Log in"}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-zinc-600 dark:text-zinc-400">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-600 hover:underline dark:text-blue-400">
          Register
        </Link>
      </p>
    </>
  );
}

export default Login;