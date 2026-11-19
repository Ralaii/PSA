export function EmployeeErrorCard({ error }) {
  const message =
    error?.response?.data?.message ?? error?.message ?? "Something went wrong";

  return (
    <Card className="p-8 text-center">
      <p className="font-medium text-zinc-900 dark:text-zinc-100">{message}</p>
      <Link
        to="/employee"
        className="mt-3 inline-block text-sm text-blue-600 hover:underline dark:text-blue-400"
      >
        Back to employees
      </Link>
    </Card>
  );
}