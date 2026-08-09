import React, { useState } from "react";
import "./courses.css";
import { CourseData } from "../../context/CourseContext";
import CourseCard from "../../components/coursecard/CourseCard";
import { UserData } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";

const Courses = () => {
  const { courses } = CourseData();
  const { user } = UserData();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...new Set(courses?.map((c) => c.category) || [])];

  const filteredCourses = selectedCategory === "All"
    ? courses
    : courses.filter((c) => c.category === selectedCategory);

  return (
    <div className="courses-page-container">
      <div className="courses-header-section">
        <h1 className="courses-title">Discover Our Premium Courses</h1>
        <p className="courses-subtitle">
          Acquire professional digital competencies under step-by-step guidance from expert coders.
        </p>

        {user?.role === "admin" && (
          <Button onClick={() => navigate("/admin/course")} style={{ marginTop: "15px" }}>
            Create New Course
          </Button>
        )}
      </div>

      {/* Category Filter Pills */}
      {courses && courses.length > 0 && (
        <div className="category-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-pill ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className="course-container">
        {filteredCourses && filteredCourses.length > 0 ? (
          filteredCourses.map((e) => <CourseCard key={e._id} course={e} />)
        ) : (
          <div className="no-courses">
            <p>No courses found under this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
