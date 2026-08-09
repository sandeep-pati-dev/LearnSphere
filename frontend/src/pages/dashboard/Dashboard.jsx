import React from "react";
import "./dashboard.css";
import { CourseData } from "../../context/CourseContext";
import { UserData } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { FaGraduationCap, FaCheckDouble, FaAward, FaPlayCircle } from "react-icons/fa";
import { server } from "../../main";

const Dashboard = () => {
  const { mycourse } = CourseData();
  const { user } = UserData();
  const navigate = useNavigate();

  const completedLecturesCount = user?.completedLectures?.length || 0;

  return (
    <div className="dashboard-page-container">
      {/* Welcome Banner */}
      <div className="dashboard-welcome-banner">
        <h1>Welcome Back, {user?.name || "Student"}! 👋</h1>
        <p>Your learning journey is going strong. Review your stats and continue where you left off.</p>
      </div>

      {/* Analytics Stats Strip */}
      <div className="dashboard-stats-strip">
        <Card className="dashboard-stat-card">
          <div className="stat-icon"><FaGraduationCap /></div>
          <div className="stat-info">
            <h3>{mycourse?.length || 0}</h3>
            <p>Courses Enrolled</p>
          </div>
        </Card>
        <Card className="dashboard-stat-card">
          <div className="stat-icon"><FaCheckDouble /></div>
          <div className="stat-info">
            <h3>{completedLecturesCount}</h3>
            <p>Lectures Completed</p>
          </div>
        </Card>
        <Card className="dashboard-stat-card">
          <div className="stat-icon"><FaAward /></div>
          <div className="stat-info">
            <h3>{mycourse && mycourse.length > 0 ? "Active Learner" : "Beginner"}</h3>
            <p>Current Status</p>
          </div>
        </Card>
      </div>

      {/* Enrolled Courses Section */}
      <div className="enrolled-courses-section">
        <h2 className="section-title" style={{ textAlign: "left", marginBottom: "30px", fontSize: "24px" }}>
          Your Enrolled Courses
        </h2>

        <div className="dashboard-courses-grid">
          {mycourse && mycourse.length > 0 ? (
            mycourse.map((course) => (
              <Card key={course._id} className="dashboard-course-card">
                <img
                  src={course.image && course.image.startsWith("http") ? course.image : `${server}/${course.image}`}
                  alt={course.title}
                  className="dashboard-course-image"
                  loading="lazy"
                />
                <div className="dashboard-course-info">
                  <h3>{course.title}</h3>
                  <p className="instructor-text">Instructor: {course.createdBy}</p>
                  
                  <div className="dashboard-course-actions">
                    <Button
                      onClick={() => navigate(`/course/study/${course._id}`)}
                      style={{ width: "100%", gap: "8px" }}
                    >
                      <FaPlayCircle /> Continue Learning
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="no-enrolled-courses">
              <p>You are not enrolled in any courses yet.</p>
              <Button onClick={() => navigate("/courses")} style={{ marginTop: "15px" }}>
                Browse Catalog
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
