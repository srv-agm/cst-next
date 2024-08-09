import React from "react";
import Sidebar from "./Components/Sidebar";
import { Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="d-flex">
      <Sidebar />
      <Col>{children}</Col>
    </div>
  );
};

export default MainLayout;
