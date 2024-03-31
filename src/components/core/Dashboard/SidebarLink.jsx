import React from "react";
import * as Icons from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { NavLink, matchPath, useLocation } from "react-router-dom";
import { setEditCourse } from "../../../slices/courseSlice";

const SidebarLink = ({ link, iconName }) => {
  const Icon = Icons[iconName];
  const location = useLocation();
  const dispatch = useDispatch();

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <NavLink
      to={link.path}
      className={`relative py-2 px-4 md:px-8 md:py-2 text-sm font-medium transition-all duration-300 ${
        matchRoute(link.path) ? "bg-yellow-800" : "bg-opacity-0"
      }`}
    >
      <div
        className="flex flex-col item-center gap-x-2 md:flex-row"
        onClick={() => {
          dispatch(setEditCourse(false));
        }}
      >
        <Icon className="text-3xl md:text-lg" />
        <span className="hidden md:block">{link.name}</span>
        <span className={`absolute bottom-0 left-0 md:top-0 h-[0.2rem] w-full md:h-full md:w-[0.2rem] bg-yellow-50 transition-all duration-300
              ${matchRoute(link.path) ? "opacity-100" : "opacity-0"}`}
        ></span>
      </div>
    </NavLink>
  );
};

export default SidebarLink;
