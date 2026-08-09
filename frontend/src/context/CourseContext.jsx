import { createContext, useContext, useEffect, useState } from "react";
import api from "../api";

const CourseContext = createContext();
export const CourseContextProvider = ({ children }) => {
  const [course, setCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  const [mycourse, setMyCourse] = useState([]);
  async function fetchCourses() {
    try {
      const { data } = await api.get("/course/all");
      setCourses(data.courses);
    } catch (error) {
      console.error("Error fetching courses: ", error);
    }
  }
  async function fetchCourse(id) {
    try {
      const { data } = await api.get(`/course/${id}`);
      setCourse(data.course);
    } catch (error) {
      console.error("Error fetching course: ", error);
    }
  }

  async function fetchMyCourse() {
    try {
      const { data } = await api.get("/mycourse");
      setMyCourse(data.courses);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchCourses();
    fetchMyCourse();
  }, []);
  return (
    <CourseContext.Provider
      value={{
        courses,
        fetchCourses,
        fetchCourse,
        course,
        mycourse,
        setMyCourse,
        fetchMyCourse,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const CourseData = () => useContext(CourseContext);
