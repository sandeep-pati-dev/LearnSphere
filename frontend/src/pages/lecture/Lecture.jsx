import React, { useEffect, useState } from "react";
import "./lecture.css";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api";
import Loading from "../../components/loading/Loading";
import toast from "react-hot-toast";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Modal from "../../components/ui/Modal";
import Card from "../../components/ui/Card";
import { server } from "../../main";
import { UserData } from "../../context/UserContext";
import { CourseData } from "../../context/CourseContext";
import { FaPlay, FaCheckCircle, FaRegCircle, FaArrowLeft, FaArrowRight, FaVideo, FaPlus, FaBook } from "react-icons/fa";

const Lecture = () => {
  const { user, fetchUser } = UserData();
  const { fetchCourse, course } = CourseData();
  const [lectures, setLectures] = useState([]);
  const [lecture, setLecture] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lecLoading, setLecLoading] = useState(false);
  const params = useParams();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setvideo] = useState("");
  const [videoPrev, setVideoPrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  useEffect(() => {
    if (user && user.role !== "admin" && !user.subscription.includes(params.id)) {
      navigate("/");
    }
  }, [user, params.id, navigate]);

  useEffect(() => {
    fetchCourse(params.id);
    fetchLectures();
  }, [params.id]);

  if (user && user.role !== "admin" && !user.subscription.includes(params.id)) {
    return null;
  }

  async function fetchLectures() {
    try {
      const { data } = await api.get(`/lectures/${params.id}`);
      setLectures(data.lectures);
      if (data.lectures && data.lectures.length > 0) {
        // Automatically load the first lecture
        fetchLecture(data.lectures[0]._id);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function fetchLecture(id) {
    setLecLoading(true);
    try {
      const { data } = await api.get(`/lecture/${id}`);
      setLecture(data.lecture);
      setLecLoading(false);
    } catch (error) {
      console.log(error);
      setLecLoading(false);
    }
  }

  const changeVideoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setVideoPrev(reader.result);
      setvideo(file);
    };
  };

  const submitHandler = async (e) => {
    setBtnLoading(true);
    e.preventDefault();
    const myForm = new FormData();

    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("file", video);

    try {
      const { data } = await api.post(`/course/${params.id}`, myForm);

      toast.success(data.message);
      setBtnLoading(false);
      setShow(false);
      fetchLectures();
      setTitle("");
      setDescription("");
      setvideo("");
      setVideoPrev("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add lecture");
      setBtnLoading(false);
    }
  };

  const deleteHandler = async (id) => {
    if (confirm("Are you sure you want to delete this lecture")) {
      try {
        const { data } = await api.delete(`/lecture/${id}`);

        toast.success(data.message);
        fetchLectures();

        if (lecture && lecture._id === id) {
          setLecture(null);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to delete lecture");
      }
    }
  };

  const toggleProgress = async (id) => {
    try {
      await api.post(`/lecture/${id}/progress`);
      await fetchUser(); // Reload user state to sync completedLectures array
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update progress");
    }
  };

  const handleVideoEnded = async (id) => {
    // If not completed, mark complete
    if (user && !user.completedLectures?.includes(id)) {
      await toggleProgress(id);
      toast.success("Lesson completed!");
    }
    // Auto-advance to next lecture
    const currentIndex = lectures.findIndex((l) => l._id === id);
    if (currentIndex !== -1 && currentIndex < lectures.length - 1) {
      const nextLec = lectures[currentIndex + 1];
      fetchLecture(nextLec._id);
      toast.success("Loading next lesson...");
    }
  };

  // Compute indices for prev/next navigation
  const currentIdx = lectures.findIndex((l) => l._id === lecture?._id);
  const hasPrev = currentIdx > 0;
  const hasNext = currentIdx !== -1 && currentIdx < lectures.length - 1;

  // Calculate dynamic progress
  const completedInThisCourse = lectures.filter((l) =>
    user?.completedLectures?.includes(l._id)
  );
  const progressPercentage =
    lectures.length > 0
      ? Math.round((completedInThisCourse.length / lectures.length) * 100)
      : 0;

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="classroom-page-container">
          {/* Header Row: Course Title & Progress Bar */}
          <div className="classroom-header-row">
            <div className="classroom-course-meta">
              <span className="meta-label">Course Classroom</span>
              <h2>{course?.title}</h2>
            </div>
            <div className="classroom-progress-wrapper">
              <div className="classroom-progress-text">
                <span>Course Progress</span>
                <strong>{progressPercentage}% Completed ({completedInThisCourse.length}/{lectures.length})</strong>
              </div>
              <div className="classroom-progress-bar-container">
                <div 
                  className="classroom-progress-bar-fill" 
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="classroom-workspace">
            {/* Left sidebar: lecture list */}
            <div className="classroom-sidebar">
              <div className="sidebar-header">
                <h3><FaBook /> Lecture List</h3>
                {user && user.role === "admin" && (
                  <Button 
                    onClick={() => setShow(true)} 
                    style={{ padding: "6px 12px", fontSize: "13px" }}
                  >
                    <FaPlus /> Add
                  </Button>
                )}
              </div>

              <div className="sidebar-lectures-list">
                {lectures && lectures.length > 0 ? (
                  lectures.map((lec, i) => {
                    const isCompleted = user?.completedLectures?.includes(lec._id);
                    const isActive = lecture?._id === lec._id;

                    return (
                      <div
                        key={lec._id}
                        className={`lecture-item-row ${isActive ? "active" : ""} ${isCompleted ? "completed" : ""}`}
                        onClick={() => fetchLecture(lec._id)}
                      >
                        <div className="lecture-item-left">
                          <button
                            className="progress-toggle-icon-btn"
                            onClick={(event) => {
                              event.stopPropagation();
                              toggleProgress(lec._id);
                            }}
                          >
                            {isCompleted ? (
                              <FaCheckCircle className="icon-completed" />
                            ) : (
                              <FaRegCircle className="icon-uncompleted" />
                            )}
                          </button>
                          <span className="lecture-item-title-text">
                            {i + 1}. {lec.title}
                          </span>
                        </div>

                        {user && user.role === "admin" && (
                          <Button
                            variant="danger"
                            style={{ padding: "4px 8px", fontSize: "11px" }}
                            onClick={(event) => {
                              event.stopPropagation();
                              deleteHandler(lec._id);
                            }}
                          >
                            Delete
                          </Button>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="no-lectures-state">
                    <p>No Lectures added yet.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right panel: video and notes workspace */}
            <div className="classroom-content">
              {lecLoading ? (
                <Loading />
              ) : (
                <>
                  {lecture ? (
                    <div className="lecture-viewer-container">
                      <div className="video-player-wrapper">
                        <video
                          controls
                          controlsList="nodownload"
                          disablePictureInPicture
                          disableRemotePlayback
                          autoPlay
                          src={lecture.video && lecture.video.startsWith("http") ? lecture.video : `${server}/${lecture.video}`}
                          onEnded={() => handleVideoEnded(lecture._id)}
                          width={"100%"}
                          className="main-lesson-video"
                        ></video>
                      </div>

                      {/* Navigation controls row */}
                      <div className="lecture-navigation-bar">
                        <Button
                          variant="secondary"
                          disabled={!hasPrev}
                          onClick={() => fetchLecture(lectures[currentIdx - 1]._id)}
                        >
                          <FaArrowLeft /> Previous Lesson
                        </Button>

                        <Button
                          variant={user?.completedLectures?.includes(lecture._id) ? "secondary" : "primary"}
                          onClick={() => toggleProgress(lecture._id)}
                        >
                          {user?.completedLectures?.includes(lecture._id) ? "Mark Incomplete" : "Mark as Completed"}
                        </Button>

                        <Button
                          variant="secondary"
                          disabled={!hasNext}
                          onClick={() => fetchLecture(lectures[currentIdx + 1]._id)}
                        >
                          Next Lesson <FaArrowRight />
                        </Button>
                      </div>

                      {/* Title & Description block */}
                      <Card className="lecture-details-card">
                        <span className="lecture-badge">Active Lesson</span>
                        <h2 className="active-lecture-title">{lecture.title}</h2>
                        <p className="active-lecture-description">{lecture.description}</p>
                      </Card>
                    </div>
                  ) : (
                    <div className="empty-lecture-state">
                      <FaVideo className="empty-state-icon" />
                      <h3>Select a Lecture to Begin Learning</h3>
                      <p>Pick a lesson from the list on the left side to load the video player.</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Modal for adding lectures */}
          <Modal isOpen={show} onClose={() => setShow(false)} title="Add New Lecture">
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

              <div className="common-form-group" style={{ marginBottom: "15px", display: "flex", flexDirection: "column", textAlign: "left" }}>
                <label htmlFor="videoFile" style={{ marginBottom: "5px", fontWeight: "600", fontSize: "14px" }}>Video File</label>
                <input
                  type="file"
                  id="videoFile"
                  onChange={changeVideoHandler}
                  required
                  style={{
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    backgroundColor: "#1e1e38",
                    color: "white"
                  }}
                />
              </div>

              {videoPrev && (
                <video
                  src={videoPrev}
                  width={"100%"}
                  controls
                  style={{ borderRadius: "8px", marginBottom: "15px" }}
                ></video>
              )}

              <Button type="submit" disabled={btnLoading} style={{ width: "100%", marginTop: "10px" }}>
                {btnLoading ? "Adding..." : "Add Lecture"}
              </Button>
            </form>
          </Modal>
        </div>
      )}
    </>
  );
};

export default Lecture;
