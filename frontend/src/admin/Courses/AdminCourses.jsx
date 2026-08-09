import React, { useEffect, useState } from "react";
import Layout from "../Utils/Layout";
import { useNavigate } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import CourseCard from "../../components/coursecard/CourseCard";
import "./admincourses.css";
import toast from "react-hot-toast";
import api from "../../api";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Card from "../../components/ui/Card";

const AdminCourses = ({ user }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  if (user && user.role !== "admin") return null;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [duration, setDuration] = useState("");
  const [image, setImage] = useState("");
  const [imagePrev, setImagePrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const { courses, fetchCourses } = CourseData();

  const submitHandler = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    const myForm = new FormData();

    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("category", category);
    myForm.append("price", price);
    myForm.append("createdBy", createdBy);
    myForm.append("duration", duration);
    myForm.append("file", image);

    try {
      const { data } = await api.post("/course/new", myForm);

      toast.success(data.message);
      setBtnLoading(false);
      await fetchCourses();
      setImage("");
      setTitle("");
      setDescription("");
      setDuration("");
      setImagePrev("");
      setCreatedBy("");
      setPrice("");
      setCategory("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Course creation failed");
      setBtnLoading(false);
    }
  };

  return (
    <Layout>
      <div className="admin-courses">
        <div className="right">
          <div className="add-course">
            <Card className="course-form">
              <h2 style={{ marginBottom: "20px", fontSize: "24px" }}>Add Course</h2>
              <form onSubmit={submitHandler}>
                <Input
                  label="Title"
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />

                <Input
                  label="Description"
                  id="description"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />

                <Input
                  label="Price"
                  id="price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />

                <Input
                  label="Created By"
                  id="createdBy"
                  type="text"
                  value={createdBy}
                  onChange={(e) => setCreatedBy(e.target.value)}
                  required
                />

                <Input
                  label="Category"
                  id="category"
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />

                <Input
                  label="Duration (weeks)"
                  id="duration"
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  required
                />

                <div className="common-form-group" style={{ marginBottom: "15px", display: "flex", flexDirection: "column", textAlign: "left" }}>
                  <label htmlFor="file" style={{ marginBottom: "5px", fontWeight: "600", fontSize: "14px" }}>Course Thumbnail</label>
                  <input
                    type="file"
                    id="file"
                    required
                    onChange={changeImageHandler}
                    style={{
                      padding: "10px",
                      borderRadius: "8px",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      backgroundColor: "#1e1e38",
                      color: "white"
                    }}
                  />
                </div>

                {imagePrev && <img src={imagePrev} alt="" width={300} style={{ borderRadius: "8px", marginBottom: "15px" }} />}

                <Button type="submit" disabled={btnLoading} style={{ width: "100%", marginTop: "10px" }}>
                  {btnLoading ? "Please Wait..." : "Add Course"}
                </Button>
              </form>
            </Card>
          </div>
        </div>
        <div className="left">
          <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>All Courses</h1>
          <div className="dashboard-content">
            {courses && courses.length > 0 ? (
              courses.map((e) => {
                return <CourseCard key={e._id} course={e} />;
              })
            ) : (
              <p>No Courses Yet</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminCourses;
