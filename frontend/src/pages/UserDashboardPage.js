import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import PagesIcon from "../components/icons/PagesIcon/PagesIcon";
import useAuth from "../hooks/useAuth";
import { CiLogout } from "react-icons/ci";

const UserDashboardPage = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { path: "home", title: "Start to search" },
    { path: "profile", title: "Profile" },
    { path: "jobs", title: "Jobs" },
  ];

  const handleLogout = () => {
    setAuth({});
    navigate("/login");
  };

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 relative border-b border-gray-300">
        <nav className="flex justify-between items-center py-6">
          <div className="flex items-center gap-[280px] justify-around ">
            <div className="flex items-center gap-2 text-2xl text-black font-bold">
              <PagesIcon />
              BotCV
            </div>
            <ul className="flex gap-[150px]">
              {navItems.map(({ path, title }) => (
                <li key={path} className="text-base text-primary">
                  <Link
                    to={path}
                    className="hover:text-blue transition duration-300 ease-in-out"
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <button onClick={handleLogout} className="flex items-center gap-2">
            <CiLogout className="w-7 h-7 text-blue"/>
            </button>
          </div>
        </nav>
      </div>
      <Outlet />
    </>
  );
};

export default UserDashboardPage;