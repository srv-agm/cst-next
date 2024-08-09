import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import "./Sidebar.css";

const Sidebar: React.FC = () => {
  const router = useRouter();
  const { pathname } = router;

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
