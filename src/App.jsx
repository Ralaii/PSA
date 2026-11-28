import { BrowserRouter, Routes, Route, Navigate } from "react-router";
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
import ProtectedRoute from "./components/layout/ProtectedRoute";
import GuestRoute from "./components/layout/GuestRoute";
import Project from "./pages/Project";
import ProjectDetails from "./pages/ProjectDetails";


function App() {
  return(
    <BrowserRouter>
      <Routes>

        {/* ROUTES FOR AUTH */}
        <Route element={<GuestRoute/>}>
          <Route element={<AuthLayout/>}>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
          </Route>
        </Route>


      <Route path="/" element={<Navigate to="/dashboard" replace/>}/>

        {/* MAIN ROUTES OF THE LOGIN */}
        <Route element={<ProtectedRoute roles={['HR', 'ADMIN', 'USER']}/>}>
          <Route element={<MainLayout/>}>
        
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/project" element={<Project/>}/>   
            <Route path="/project/:id" element={<ProjectDetails />} />         
  {/* 
            <Route path="/inbox" element={<Inbox/>}/>
            <Route path="/inbox/:id" element={<InboxDetail/>}/> */}

            <Route path="/project" element/>
            <Route path="/project/:id" element/>

            <Route path="/files" element/>

            <Route path="/employee" element={<Employee/>}/>
            <Route path="/employee/:id" element={<EmployeeDetail/>}/>

            <Route path="/settings" element={<Settings/>}/>
            <Route path="/trash" element/>

          </Route>
        </Route>
        
        {/* NOT FOUND ROUTE STILL DECIDING WHAT TO DO */}
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;