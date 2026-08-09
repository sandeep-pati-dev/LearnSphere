import React from "react";
import { MdDashboard } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { FaUserGraduate } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./account.css";
import { UserData } from "../../context/UserContext";
import { CourseData } from "../../context/CourseContext";
import toast from "react-hot-toast";
import api from "../../api";

const Account = ({ user }) => {
  const navigate = useNavigate();
  const { setIsAuth, setUser } = UserData();
  const { setMyCourse } = CourseData();

  if (!user) {
    return <h2>Loading...</h2>;
  }

  const logoutHandler = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
    setUser(null);
    setMyCourse([]);
    navigate("/login");
    toast.success("Logged Out");
  };

  const applyTutorHandler = async () => {
    try {
      const { data } = await api.post("/user/apply-tutor");
      toast.success(data.message);
      setUser(data.user);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to apply for tutor");
    }
  };

  return (
    <div>
      <div className="profile">
        <h2>My Profile</h2>
        <div className="profile-info">
          <p>
            <strong>Name - {user.name}</strong>
          </p>
          <p>
            <strong>Email - {user.email}</strong>
          </p>
          <button
            className="button"
            onClick={() => navigate(`/${user._id}/dashboard`)}
          >
            <MdDashboard />
            Dashboard
          </button>
          <br />
          {user.role === "admin" ? (
            <button
              className="button"
              onClick={() => navigate(`/admin/dashboard`)}
            >
              <MdDashboard />
              Admin Dashboard
            </button>
          ) : (
            <button
              className="button"
              onClick={applyTutorHandler}
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              <FaUserGraduate />
              Apply for Tutor
            </button>
          )}
          <br />
          <button
            className="button"
            style={{
              background: "red",
              color: "white",
              padding: "10px 15px",
              borderRadius: "15px",
              fontSize: "16px",
              fontWeight: "bold",
              border: "none",
              cursor: "pointer",
              transition: "background 0.3s ease, transform 0.2s ease",
            }}
            onClick={logoutHandler}
            onMouseEnter={(e) => (e.target.style.background = "darkred")}
            onMouseLeave={(e) => (e.target.style.background = "red")}
          >
            <CiLogout style={{ marginRight: "5px" }} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;
