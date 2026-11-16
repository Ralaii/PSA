import { Link } from "react-router";

function NotFound() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 dark:text-gray-200">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-600 dark:text-gray-400">Page Not Found</h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">The resource could not be found on the server</p>
        
      </div>
    </div>
  )
}

export default NotFound;