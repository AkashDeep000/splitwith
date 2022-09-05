import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import useActiveHeaderTitleStore from "@/store/activeHeaderTitle";
import useActiveNav from "@/store/activeNav";

function Button({ icon, link, name, activeHeaderTitle }) {
  const Icon = icon;
  const activeNav = useActiveNav((state) => state.activeNav);
  const isActive = activeNav === name;

  return (
    <>
      <NavLink
        to={link}
        className={isActive ? "text-indigo-500" : "text-[rgb(179,186,195)]"}
      >
        <Icon className="w-7 h-7" />
      </NavLink>
    </>
  );
}

export default Button;
