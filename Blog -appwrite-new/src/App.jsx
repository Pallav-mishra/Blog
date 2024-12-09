import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home/Home";
import AllBlogs from "./Pages/allBlogs/AllBlogs";
import Nopage from "./Pages/Nopage/Nopage";
import BlogInfo from "./Pages/BlogInfo/BlogInfo";
import AdminLogin from "./Pages/Admin/adminLogin/AdminLogin";
import Dashboard from "./Pages/Admin/dashboard/Dashboard";
import CreateBlog from "./Pages/Admin/createBlog/CreateBlog";
import MyState from "./context/data/myState";
import authService from "./appwrite/auth";
import { Toaster } from "react-hot-toast";

const ProtectedRouteForAdmin = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const user = await authService.getCurrentUser();
        const admin = JSON.parse(localStorage.getItem("admin")); 
        if (user && admin?.userId === user.$id) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, []);

  if (loading) {
    return <div>Loading...</div>; 
  }

  return isAuthenticated ? children : <Navigate to="/adminlogin" />;
};

function App() {
  return (
    <MyState>
      <Router>
        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path="/allblogs" element={<AllBlogs />} />
          <Route path="/bloginfo/:id" element={<BlogInfo />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          

          <Route
            path="/dashboard"
            element={
              <ProtectedRouteForAdmin>
                <Dashboard />
               </ProtectedRouteForAdmin>
            }
          />
          <Route
            path="/createblog"
            element={
              <ProtectedRouteForAdmin>
                <CreateBlog />
              </ProtectedRouteForAdmin>
            }
          />

          <Route path="/*" element={<Nopage />} />
        </Routes>
        <Toaster />
      </Router>
    </MyState>
  );
}

export default App;

