"use client";

import React, { useEffect, useState } from "react";
import Style from "./style.module.scss";
import {
  ListGroup,
  ListGroupItem,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";
import Link from "next/link";
import axios from "axios";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import logoutAction from "@/action/logoutAction";
import { AppAction, useMenuContext } from "../AppState";
import { getUser } from "@/utils";

export type MenuItemType = {
  title: string;
  icon: string;
  route: string;
  sub_menu?: MenuItemType[];
  q?: string; // Query parameters
};

function MenuItem({ title, icon, route, sub_menu, q }: MenuItemType) {
  const [_, dispatch] = useMenuContext();
  const router = useRouter();
  const pathname = usePathname();
  if (sub_menu)
    return (
      <li>
        <input type="checkbox" id={title} defaultChecked />
        <label htmlFor={title}>
          <i className={icon}></i>
          <span className={Style.title}>{title}</span>
          <span className={Style.icon}>
            <i className="fa-solid fa-chevron-down"></i>
          </span>
        </label>
        <div className={Style.subMenu}>
          <ul className={Style.menu}>
            {sub_menu.map((v, i) => (
              <MenuItem key={i} {...v} q={q} />
            ))}
          </ul>
        </div>
      </li>
    );
  return (
    <li>
      <label className={pathname === route ? Style.active : ""}>
        <i className={icon}></i>
        <span
          className={Style.title}
          // href={route + q}
          onClick={() => {
            dispatch(AppAction.setTitle(title));
            router.push(route + q);
          }}
        >
          {title}
        </span>
      </label>
    </li>
  );
}

const popoverRight = (
  <Popover id="popover-positioned-right">
    <ListGroup>
      {/* <ListGroupItem>Profile</ListGroupItem> */}
      {/* <ListGroupItem>Change Password</ListGroupItem> */}
      <ListGroupItem
        className="text-danger"
        onClick={() => logoutAction()}
        style={{ cursor: "pointer" }}
      >
        Logout
      </ListGroupItem>
    </ListGroup>
  </Popover>
);

export function Menu({ token = "" }) {
  const [_, dispatch] = useMenuContext();
  const q = useSearchParams();
  const [Menu, setMenu] = useState<MenuItemType[]>([]);
  const [Name, setName] = useState("Name");
  const [ActionToggle, setActionToggle] = useState(false);

  useEffect(() => {
    async function fetchMenu() {
      if (!q.get("package")) return;
      const url =
        "https://testcreativecompliance.mfilterit.net" +
        "/menu-list?package=" +
        q.get("package");
      try {
        const Menus = await axios.get(url, {
          headers: { Authorization: token },
        });
        dispatch(AppAction.setTitle("Dashboard"));
        setMenu(Menus?.data?.menu ?? []);
      } catch (error) {
        console.log(error);
      }
    }
    fetchMenu();
    setName(getUser()?.name);
  }, [dispatch, q, token]);

  return (
    <nav
      className={"d-flex flex-column " + Style.sideMenu}
      onMouseLeave={() => setActionToggle(false)}
    >
      <input
        className="nav-toggle-check"
        type="checkbox"
        id="nav-toggle-check"
        data-toggle
        onChange={(e) => {
          const toggleButton = document.getElementById(
            "nav-toggle-check-label"
          );
          if (!toggleButton) return;
          if (e.target.checked) {
            toggleButton.style.transform = "rotateY(180deg)";
            setActionToggle(!e.target.checked);
          } else toggleButton.style.transform = "rotateY(0deg)";
        }}
      />
      <ul className={Style.menu}>
        {Menu?.map((v, i) => (
          <MenuItem key={i} {...v} q={"?package=" + q.get("package")} />
        ))}
      </ul>
      <hr />
      <OverlayTrigger
        placement="top"
        trigger="click"
        overlay={popoverRight}
        show={ActionToggle}
        onToggle={(t) => setActionToggle(t)}
      >
        <div style={{ cursor: "pointer" }} className={Style.tail}>
          <i className="fa-solid fa-user"></i>
          <span>{Name}</span>
        </div>
      </OverlayTrigger>
    </nav>
  );
}
