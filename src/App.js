import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Layout } from "antd";
import Sidebar from "./Components/Sidebar";
import Dashboard from "./Modules/Dashboard";
import UploadPage from "./Modules/Integration";
import ChatbotPage from "./Modules/Chatbot";
import Login from "./Modules/Login";
import ReportBuilder from "./Modules/ReportBuilder";

const { Content } = Layout;

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State for login status

  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route
          path="/login"
          element={<Login onLogin={() => setIsAuthenticated(true)} />}
        />

        {/* Protected Routes */}
        {isAuthenticated ? (
          <Route
            path="*"
            element={
              <Layout style={{ minHeight: "100vh" }}>
                {/* Sidebar */}
                <Sidebar />

                {/* Main Layout */}
                <Layout>
                  <Content
                    style={{
                      margin: "16px",
                      padding: "16px",
                      background: "#fff",
                      borderRadius: "8px",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                      overflow: "auto", // Prevents overflow issues
                    }}
                  >
                    <Routes>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/chatbot" element={<ChatbotPage />} />
                      <Route path="/upload" element={<UploadPage />} />
                      <Route path="/reportbuilder" element={<ReportBuilder />} />
                    </Routes>
                  </Content>
                </Layout>
              </Layout>
            }
          />
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;
