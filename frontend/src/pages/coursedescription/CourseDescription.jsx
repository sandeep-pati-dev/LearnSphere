import React, { useEffect, useState } from "react";
import "./coursedescription.css";
import { useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import { server } from "../../main";
import toast from "react-hot-toast";
import { UserData } from "../../context/UserContext";
import Loading from "../../components/loading/Loading";
import api from "../../api";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { FaBookReader, FaChalkboardTeacher, FaCalendarAlt, FaCheckCircle, FaLock } from "react-icons/fa";

const CourseDescription = ({ user }) => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const { fetchUser } = UserData();
  const { fetchCourse, course, fetchCourses, fetchMyCourse } = CourseData();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourse(params.id);
  }, [params.id]);

  const checkoutHandler = async () => {
    setLoading(true);

    try {
      const {
        data: { order, key },
      } = await api.post(`/course/checkout/${params.id}`, {});

      const options = {
        key: key,
        amount: order.id,
        currency: "INR",
        name: "LearnSphere",
        description: "Learn with us",
        order_id: order.id,
        handler: async function (response) {
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
            response;

          try {
            const { data } = await api.post(
              `/verification/${params.id}`,
              {
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
              }
            );

            await fetchUser();
            await fetchCourses();
            await fetchMyCourse();
            toast.success(data.message);
            setLoading(false);

            navigate(`/payment-success/${razorpay_payment_id}`);
          } catch (error) {
            toast.error(error.response?.data?.message || "Checkout failed");
            setLoading(false);
          }
        },
        theme: { color: "#686CFD" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.log("Checkout Error:", error.response);
      toast.error(error.response?.data?.message || "Checkout failed");
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <>
      {course && (
        <div className="course-detail-container">
          {/* Left Column: Course details and learning objectives */}
          <div className="course-detail-left">
            <h1 className="course-detail-title">{course.title}</h1>
            <p className="course-detail-category-badge">{course.category}</p>

            <div className="course-overview-section">
              <h3>Course Overview</h3>
              <p>{course.description}</p>
            </div>

            <div className="learning-objectives-section">
              <h3>What you'll learn in this course</h3>
              <div className="objectives-grid">
                <div className="objective-item">
                  <FaCheckCircle className="check-icon" />
                  <span>Build complete practical real-world production portfolios.</span>
                </div>
                <div className="objective-item">
                  <FaCheckCircle className="check-icon" />
                  <span>Understand core architecture patterns and clean code design.</span>
                </div>
                <div className="objective-item">
                  <FaCheckCircle className="check-icon" />
                  <span>Implement secure API integrations and token authentications.</span>
                </div>
                <div className="objective-item">
                  <FaCheckCircle className="check-icon" />
                  <span>Optimize web performance and assets caching schemas.</span>
                </div>
              </div>
            </div>

            <div className="instructor-card-section">
              <h3>Your Instructor</h3>
              <Card className="instructor-card">
                <div className="instructor-avatar">
                  <FaChalkboardTeacher />
                </div>
                <div className="instructor-details">
                  <h4>{course.createdBy}</h4>
                  <p>Senior Full-Stack Architect & Educator</p>
                  <p className="instructor-bio">
                    Passionately teaching industry-standard clean coding practices, modern frameworks integration, and professional server systems architectures.
                  </p>
                </div>
              </Card>
            </div>
          </div>

          {/* Right Column: Checkout Pricing Card */}
          <div className="course-detail-right">
            <Card className="checkout-sticky-card">
              <img
                src={course.image && course.image.startsWith("http") ? course.image : `${server}/${course.image}`}
                alt={course.title}
                className="checkout-course-image"
                loading="lazy"
              />
              <div className="checkout-price-strip">
                <span className="price-tag">₹{course.price}</span>
                <span className="original-price">₹{course.price * 2}</span>
                <span className="discount-percent">50% OFF</span>
              </div>

              <div className="checkout-features-list">
                <div className="feature-line">
                  <FaCalendarAlt />
                  <span>Duration: <strong>{course.duration} Weeks</strong></span>
                </div>
                <div className="feature-line">
                  <FaBookReader />
                  <span>Format: <strong>Video Lectures & Tasks</strong></span>
                </div>
              </div>

              <div className="checkout-cta-wrapper">
                {user && user.subscription.includes(course._id) ? (
                  <Button
                    onClick={() => navigate(`/course/study/${course._id}`)}
                    style={{ width: "100%", fontSize: "16px", padding: "12px" }}
                  >
                    Go to Classroom
                  </Button>
                ) : (
                  <Button
                    onClick={checkoutHandler}
                    style={{ width: "100%", fontSize: "16px", padding: "12px" }}
                  >
                    Enroll Now
                  </Button>
                )}
              </div>

              <p className="checkout-secure-note">
                <FaLock /> 30-Day Money-Back Guarantee. Secure Payment Gateway.
              </p>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseDescription;
