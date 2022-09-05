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
      <NavLink to={link}>
        <div
          className={`${
            isActive ? "bg-indigo-100" : "bg-white"
          } text-indigo-500 rounded p-1`}
        >
          <div className="flex items-center gap-3">
            <Icon className="w-6 h-6" />
            <p> {activeHeaderTitle} </p>
          </div>
        </div>
      </NavLink>
    </>
  );
}

export default Button;
