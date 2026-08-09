import React from "react";
import "./common.css";
import { Link, useNavigate } from "react-router-dom";
import { AiFillHome, AiOutlineLogout } from "react-icons/ai";
import { FaBook, FaUserAlt } from "react-icons/fa";
import { UserData } from "../../context/UserContext";
import { CourseData } from "../../context/CourseContext";
import toast from "react-hot-toast";

const Sidebar = () => {
  const navigate = useNavigate();
  const { setUser, setIsAuth } = UserData();
  const { setMyCourse } = CourseData();

  const logoutHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setIsAuth(false);
    setUser(null);
    setMyCourse([]);
    navigate("/login");
    toast.success("Logged Out");
  };

  return (
    <nav className="sidebar" aria-label="Admin navigation">
      <ul>
        <li>
          <Link to={"/admin/dashboard"}>
            <div className="icon">
              <AiFillHome />
            </div>
            <span>Home</span>
          </Link>
        </li>

        <li>
          <Link to={"/admin/course"}>
            <div className="icon">
              <FaBook />
            </div>
            <span>Courses</span>
          </Link>
        </li>

        <li>
          <Link to={"/admin/users"}>
            <div className="icon">
              <FaUserAlt />
            </div>
            <span>Users</span>
          </Link>
        </li>

        <li>
          <Link to="#" onClick={logoutHandler}>
            <div className="icon">
              <AiOutlineLogout />
            </div>
            <span>Logout</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
