"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Use this to get the pathname
import "./Sidebar.css";

const Sidebar: React.FC = () => {
  const pathname = usePathname(); // Get the current path

  return (
    <div className="sidebar" style={{ fontFamily: "Poppins, sans-serif" }}>
      <div className="sidebar-header">
        <img
          src="https://infringementportalcontent.mfilterit.com/images/media/logos/mfilterit-white-logo.png"
          height={20}
          alt="Mfilterit Logo"
        />
      </div>
      <ul className="sidebar-menu">
        <li
          className={`${pathname === "/" ? "active" : ""}`}
          style={{ border: "none" }}
        >
          <Link href="/">Colgate Social Tool</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
