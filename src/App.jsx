import { BrowserRouter, Routes, Route } from "react-router";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthLayout from "./layouts/AuthLayout";

function App() {
  return(
    <BrowserRouter>
      <Routes>

        {/* ROUTES FOR AUTH */}
        <Route element={<AuthLayout/>}>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Route>

        <Route element={<MainLayout/>}
        >
        </Route>

      </Routes>
    </BrowserRouter>
    
  );
}

export default App;