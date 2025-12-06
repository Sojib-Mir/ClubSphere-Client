import { Link, NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { useEffect, useState } from "react";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { HiOutlineLogout } from "react-icons/hi";
import Button from "../Button/Button";
const Navbar = () => {
  const { user, logOut } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const links = (
    <>
      <li className="hover:bg-transparent">
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/clubs"}>Clubs</NavLink>
      </li>
      <li>
        <NavLink to={"/events"}>Events</NavLink>
      </li>
      <li>
        <NavLink to={"/about"}>about</NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar shadow-sm md:max-w-7xl w-full mx-auto">
      <div className="navbar-start">
        <div className="dropdown ">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 -ml-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>

          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content rounded-box z-1 mt-3 w-30 p-2 shadow"
          >
            {links}
          </ul>
        </div>
       
        <Link to={"/"} className="font-bold text-xl flex items-center">
          <img className="w-5 h-5 rounded mr-1" src="./logo-square.png" alt="" />
          Club<sapn className="text-pink-500">Sphere</sapn>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      <div className="navbar-end">
        {user ? (
          <>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user?.photoURL}
                  />
                </div>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-40 p-2 shadow"
              >
                {/* Profile */}
                <li className="transition font-semibold">
                  <Link
                    to="/dashboard/profile"
                    className="transition font-semibold"
                  >
                    Profile
                  </Link>
                </li>

                {/* Dashboard */}
                <li>
                  <Link to="/dashboard" className="transition font-semibold">
                    Dashboard
                  </Link>
                </li>

                {/* Theme toggle */}
                <li className="transition font-semibold">
                  <label className="swap swap-rotate">
                    <input
                      type="checkbox"
                      checked={theme === "dark"}
                      onChange={(e) =>
                        setTheme(e.target.checked ? "dark" : "light")
                      }
                    />

                    {/* Light */}
                    <span className="swap-on flex justify-start items-center gap-1 -ml-15.5">
                      Light{" "}
                      <CiLight className="flex justify-center items-center" />
                    </span>

                    {/* Dark */}
                    <span className="swap-off flex justify-start items-center gap-1 -ml-15.5">
                      Dark{" "}
                      <MdDarkMode className="flex justify-center items-center" />
                    </span>
                  </label>
                </li>

                {/* LogOut */}
                <li className="transition font-semibold">
                  <button className="bg-red-500 text-white" onClick={logOut}>
                    <HiOutlineLogout /> Logout
                  </button>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="btn btn-secondary btn-sm rounded transition font-semibold text-xl"
            >
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
