import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/apis";
import { IoIosArrowDropdown } from "react-icons/io";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaBars } from "react-icons/fa6";
import { HiSearch } from "react-icons/hi";
import "./Navbar.css";

const NavBar = ({ setProgress }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const [searchValue, setSearchValue] = useState("");

  const show = useRef();
  const overlay = useRef();
  const shownav = () => {
    show.current.classList.toggle("navshow");
    overlay.current.classList.toggle("hidden");
  };

  const [subLinks, setSubLinks] = useState([]);
  useEffect(() => {
    const fetchSubLinks = async () => {
      try {
        const result = await apiConnector("GET", categories.CATEGORIES_API);
        setSubLinks(result.data.data);
      } catch (err) {
        console.log("Could not fetch categories");
      }
    };
    fetchSubLinks();
  }, []);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  const handelSearch = (e) => {
    console.log(searchValue);
    e.preventDefault();
    if (searchValue?.length > 0) {
      navigate(`/search/${searchValue}`);
      setSearchValue("");
      shownav();
    }
  };

  return (
    <nav className="bg-richblack-900 flex items-center justify-center h-14 border-b-[1px] border-b-richblack-700">
      <div className="w-11/12 max-w-maxContent flex items-center justify-between">
        <Link to="/">
          <img src={logo} width={160} height={52} alt="logo" />
        </Link>

        {/* Mobile Navbar Menu */}
        <div className="w-full z-[1000] flex md:hidden relative top-7 left-20">
          <div
            ref={overlay}
            className="hidden w-[100vw] h-[100vh] fixed top-0 bottom-0 left-0 right-0 z-30 overflow-y-hidden bg-[rgba(0,0,0,0.5)]"
            onClick={shownav}
          ></div>
          <div ref={show} className="mobNav z-50 w-full">
            <nav className="w-[200px] flex flex-col items-center absolute right-0 glass2">
              {token === null && (
                <Link
                  to="/login"
                  onClick={() => {
                    dispatch(setProgress(100));
                  }}
                >
                  <button
                    onClick={shownav}
                    className="mt-4 text-center text-[15px] px-6 py-2 rounded-md font-semibold bg-yellow-50 text-black hover:scale-95 transition-all duration-200"
                  >
                    Login
                  </button>
                </Link>
              )}
              {token === null && (
                <Link
                  to="/signup"
                  onClick={() => {
                    dispatch(setProgress(100));
                  }}
                >
                  <button
                    onClick={shownav}
                    className="mt-4 text-center text-[15px] px-5 py-2 rounded-md font-semibold bg-yellow-50 text-black hover:scale-95 transition-all duration-200"
                  >
                    Signup
                  </button>
                </Link>
              )}
              {token !== null && (
                <div className="mt-2">
                  <p className="text-richblack-5 text-center mb-2">Account</p>
                  <ProfileDropDown shownav={shownav} />
                </div>
              )}
              <form onSubmit={handelSearch} className="mt-2 relative">
                <input
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  id="searchinput"
                  type="text"
                  placeholder="Search"
                  className="border-0 focus:ring-1 ring-richblack-400 rounded-full px-2 py-1 md:text-[12px] lg:text-[14px] w-24 text-richblack-50 focus:outline-none focus:border-transparent bg-richblack-700"
                />
                <HiSearch
                  type="submit"
                  id="searchicon"
                  size={20}
                  className="text-richblack-100 absolute top-[6px] left-16 cursor-pointer"
                />
              </form>
              <div className="my-4 bg-richblack-25 w-[200px] h-[2px]"></div>
              <p className="text-xl text-yellow-50 font-semibold">Courses</p>
              <div className="flex flex-col items-end pr-4">
                {subLinks?.length < 0 ? (
                  <div></div>
                ) : (
                  subLinks?.map((element, index) => (
                    <Link
                      to={`/catalog/${element.name
                        .split(" ")
                        .join("-")
                        .toLowerCase()}`}
                      key={index}
                      onClick={() => {
                        dispatch(setProgress(30));
                        shownav();
                      }}
                    >
                      <p className="p-2 text-sm text-richblack-5">
                        {element?.name}
                      </p>
                    </Link>
                  ))
                )}
              </div>
              <div className="my-4 bg-richblack-25 w-[200px] h-[2px]"></div>
              <Link
                to="/"
                onClick={() => {
                  dispatch(setProgress(100));
                  shownav();
                }}
              >
                <p className="p-2 text-richblack-5">Home</p>
              </Link>
              <Link
                to="/about"
                onClick={() => {
                  dispatch(setProgress(100));
                  shownav();
                }}
              >
                <p className="p-2 text-richblack-5">About</p>
              </Link>
              <Link
                to="/contact"
                onClick={() => {
                  dispatch(setProgress(100));
                  shownav();
                }}
              >
                <p className="p-2 text-richblack-5">Contact</p>
              </Link>
            </nav>
          </div>
        </div>

        {/* Desktop Navbar */}
        <div>
          <ul className="hidden md:flex gap-x-4 lg:gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div className="flex items-center gap-1 group relative cursor-pointer z-50">
                    <p>{link.title}</p>
                    <IoIosArrowDropdown />

                    <div
                      className="invisible absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[8%] 
                        flex flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all 
                        duration-200 group-hover:visible group-hover:opacity-100 md:w-[250px]"
                    >
                      <div
                        className="absolute left-[50%] top-0 translate-x-[80%] translate-y-[-45%] 
                          h-6 w-6 rotate-45 rounded bg-richblack-5 "
                      ></div>

                      {subLinks?.length > 0 ? (
                        subLinks?.map((subLink, index) => (
                          <Link
                            to={`/catalog/${subLink.name
                              .split(" ")
                              .join("-")
                              .toLowerCase()}`}
                            key={index}
                            className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                          >
                            <p>{subLink.name}</p>
                          </Link>
                        ))
                      ) : (
                        <div>No Category Found</div>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
            <form onSubmit={handelSearch} className="relative">
              <input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                id="searchinput"
                type="text"
                placeholder="Search"
                className="border-0 focus:ring-1 ring-richblack-400 rounded-full px-2 py-1 md:text-[12px] lg:text-[14px] w-24 text-richblack-50 focus:outline-none focus:border-transparent bg-richblack-700"
              />
              <HiSearch
                type="submit"
                id="searchicon"
                size={20}
                className="text-richblack-100 absolute top-1 left-16 cursor-pointer"
              />
            </form>
          </ul>
        </div>

        <div>
          {/* mobile navbar cart and menu bar */}
          <div className="flex gap-4">
            {user && user?.accountType === "Student" && (
              <div className="md:hidden">
                <Link to="/dashboard/cart" className="relative">
                  <AiOutlineShoppingCart
                    size={24}
                    className="text-richblack-50 text-3xl"
                  />
                  {totalItems > 0 && (
                    <span
                      className="absolute -top-1 -right-[6px] bg-caribbeangreen-300 text-xs w-4 h-4 flex 
                        justify-center items-center animate-bounce rounded-full text-white"
                    >
                      {totalItems}
                    </span>
                  )}
                </Link>
              </div>
            )}
            <div
              className="flex md:hidden text-white text-2xl"
              onClick={shownav}
            >
              <FaBars />
            </div>
          </div>
          {/* Login/SignUp/Cart/Dashboard for desktop */}
          <div className="hidden md:flex items-center justify-center gap-x-2 lg:gap-x-4">
            {token === null && (
              <Link to="/login">
                <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[5px] text-richblack-100 rounded-md">
                  Log in
                </button>
              </Link>
            )}
            {token === null && (
              <Link to="/signup">
                <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[5px] text-richblack-100 rounded-md">
                  Sign Up
                </button>
              </Link>
            )}
            {user && user?.accountType === "Student" && (
              <Link to="/dashboard/cart" className="relative">
                <AiOutlineShoppingCart
                  size={24}
                  className="text-richblack-50 text-3xl"
                />
                {totalItems > 0 && (
                  <span
                    className="absolute -top-1 -right-[6px] bg-caribbeangreen-300 text-xs w-4 h-4 flex 
                        justify-center items-center animate-bounce rounded-full text-white"
                  >
                    {totalItems}
                  </span>
                )}
              </Link>
            )}
            {token !== null && <ProfileDropDown shownav={() => {}} />}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
