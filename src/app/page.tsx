import React from "react";
import CST from "./cst";
import Sidebar from "./Components/Sidebar";

const Home: React.FC = () => {
  return (
    <>
      <Sidebar />
      <CST />
    </>
  );
};

export default Home;
