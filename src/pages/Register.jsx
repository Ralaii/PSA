import { useState } from "react";
import { Link } from "react-router";
import { Eye, EyeOff } from "lucide-react";
import { inputClass } from "../components/styles";
import useAuth from "../hooks/useAuth";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [confirmShowPassword, setConfirmShowPassword] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { register, loading, error } = useAuth();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register(form);
  };

  return (
    <>
      <header className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Create account
        </h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Fill in your details to get started
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="fullName" className="sr-only">Full name</label>
          <input id="fullName" name="fullName" type="text" placeholder="Full name"
            autoComplete="name" required value={form.fullName}
            onChange={handleChange} className={inputClass} />
        </div>

        <div>
          <label htmlFor="username" className="sr-only">Username</label>
          <input id="username" name="username" type="text" placeholder="Username"
            autoComplete="username" required value={form.username}
            onChange={handleChange} className={inputClass} />
        </div>

        <div>
          <label htmlFor="email" className="sr-only">Email</label>
          <input id="email" name="email" type="email" placeholder="Email"
            autoComplete="email" required value={form.email}
            onChange={handleChange} className={inputClass} />
        </div>

        <div>
          <label htmlFor="password" className="sr-only">Password</label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              autoComplete="new-password"
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
        </div>

        <div>
          <label htmlFor="confirmPassword" className="sr-only">Confirm password</label>
          <div className="relative">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={confirmShowPassword ? "text" : "password"}
              placeholder="Confirm password"
              autoComplete="new-password"
              required
              value={form.confirmPassword}
              onChange={handleChange}
              className={`${inputClass} pr-11`}
            />
            <button
              type="button"
              onClick={() => setConfirmShowPassword((v) => !v)}
              aria-label={confirmShowPassword ? "Hide password" : "Show password"}
              className="absolute inset-y-0 right-0 flex w-11 cursor-pointer items-center justify-center text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              {confirmShowPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
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
          {loading ? "Creating account..." : "Register"}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-zinc-600 dark:text-zinc-400">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 hover:underline dark:text-blue-400">
          Sign in
        </Link>
      </p>
    </>
  );
}

export default Register;