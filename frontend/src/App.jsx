import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";  
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Landing from "./pages/Landing";
import { ThemeProvider } from "./hooks/ThemeContext";
import CustomerDashboard from "./pages/CustomerDashboard";
import Quotation from "./components/quotation";





function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[#ffffff] text-[#1e2022] dark:bg-[#25282a] dark:text-white transition-colors duration-300">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/CustomerDashboard" element={<CustomerDashboard/>} />
            <Route path="/Quotation" element={<Quotation/>} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
