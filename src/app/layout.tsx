import React from "react";
import Sidebar from "./Components/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
};

export default MainLayout;
