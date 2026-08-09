import React from "react";
import "./coursecard.css";
import { server } from "../../main";
import { UserData } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../api";
import { CourseData } from "../../context/CourseContext";
import Button from "../ui/Button";
import Card from "../ui/Card";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const { user, isAuth } = UserData();

  const { fetchCourses } = CourseData();

  const deleteHandler = async (id) => {
    if (confirm("Are you sure you want to delete this course")) {
      try {
        const { data } = await api.delete(`/course/${id}`);

        toast.success(data.message);
        fetchCourses();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };
  return (
    <Card className="course-card">
      <img src={course.image && course.image.startsWith("http") ? course.image : `${server}/${course.image}`} alt={course.title} className="course-image" loading="lazy" />
      <h3>{course.title}</h3>
      <p>Instructor- {course.createdBy}</p>
      <p>Duration- {course.duration} weeks</p>
      <p>Price- ₹{course.price}</p>
      {isAuth ? (
        <>
          {user && user.role !== "admin" ? (
            <>
              {user.subscription.includes(course._id) ? (
                <Button
                  onClick={() => navigate(`/course/study/${course._id}`)}
                >
                  Study
                </Button>
              ) : (
                <Button
                  onClick={() => navigate(`/course/${course._id}`)}
                >
                  Get Started
                </Button>
              )}
            </>
          ) : (
            <Button
              onClick={() => navigate(`/course/study/${course._id}`)}
            >
              Study
            </Button>
          )}
        </>
      ) : (
        <Button onClick={() => navigate("/login")}>
          Get Started
        </Button>
      )}

      <br />

      {user && user.role === "admin" && (
        <Button
          onClick={() => deleteHandler(course._id)}
          variant="danger"
        >
          Delete
        </Button>
      )}
    </Card>
  );
};

export default CourseCard;
