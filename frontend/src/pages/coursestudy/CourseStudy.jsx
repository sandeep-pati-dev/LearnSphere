import React, { useEffect } from "react";
import "./coursestudy.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import { server } from "../../main";

const CourseStudy = ({ user }) => {
  const params = useParams();
  const { fetchCourse, course } = CourseData();
  const navigate = useNavigate();
  useEffect(() => {
    if (user && user.role !== "admin" && !user.subscription.includes(params.id)) {
      navigate("/");
    }
  }, [user, params.id, navigate]);

  useEffect(() => {
    fetchCourse(params.id);
  }, []);

  if (user && user.role !== "admin" && !user.subscription.includes(params.id)) {
    return null;
  }

  return (
    <>
      {course && (
        <div className="course-study-page">
          <img src={course.image && course.image.startsWith("http") ? course.image : `${server}/${course.image}`} alt="" />
          <h2>{course.title}</h2>
          <h4>{course.description}</h4>
          <h5>by - {course.createdBy}</h5>
          <h5>Duration - {course.duration} weeks</h5>
          <Link to={`/lectures/${course._id}`}>
            <h2 className="btn">Lectures</h2>
          </Link>
        </div>
      )}
    </>
  );
};

export default CourseStudy;
