import { BrowserRouter, Routes, Route } from "react-router";
import MainLayout from "./components/layout/MainLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthLayout from "./components/layout/AuthLayout";
import Dashboard from "./pages/Dashboard";
import Employee from "./pages/Employee";
import Inbox from "./pages/Inbox";
import NotFound from "./pages/NotFound";
import InboxDetail from "./pages/InboxDetail";
import Settings from "./pages/Settings";
import EmployeeDetail from "./pages/EmployeeDetail";

function App() {
  return(
    <BrowserRouter>
      <Routes>

        {/* ROUTES FOR AUTH */}
        <Route element={<AuthLayout/>}>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Route>

        {/* NOT FOUND ROUTE STILL DECIDING WHAT TO DO */}
          <Route path="*" element={<NotFound/>}/>

        {/* MAIN ROUTES OF THE LOGIN */}
        <Route element={<MainLayout/>}>
          <Route path="/dashboard" element={<Dashboard/>}/>

          <Route path="/inbox" element={<Inbox/>}/>
          <Route path="/inbox/:id" element={<InboxDetail/>}/>

          <Route path="/project" element/>
          <Route path="/project/:id" element/>

          <Route path="/employee" element={<Employee/>}/>
          <Route path="/employee/:id" element={<EmployeeDetail/>}/>

          <Route path="/settings" element={<Settings/>}/>
          <Route path="/trash" element/>

          
        </Route>

      </Routes>
    </BrowserRouter>
    
  );
}

export default App;