import { BrowserRouter, Routes, Route } from "react-router";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthLayout from "./layouts/AuthLayout";
import Dashboard from "./pages/Dashboard";
import Employee from "./pages/Employee";
import Inbox from "./pages/Inbox";
import NotFound from "./pages/NotFound";
import InboxDetail from "./pages/InboxDetail";

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
          <Route path="/employee" element={<Employee/>}/>
          <Route path="/inbox" element={<Inbox/>}/>
          <Route path="/inbox/:id" element={<InboxDetail/>}/>
        </Route>

      </Routes>
    </BrowserRouter>
    
  );
}

export default App;