import React, { lazy, Suspense } from "react";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import { UserData } from "./context/UserContext";
import Loading from "./components/loading/Loading";
import Footer from "./components/footer/Fotter";

// Route-level Lazy Loading
const Home = lazy(() => import("./pages/home/Home"));
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Verify = lazy(() => import("./pages/auth/Verify"));
const About = lazy(() => import("./pages/about/About"));
const Account = lazy(() => import("./pages/account/Account"));
const Courses = lazy(() => import("./pages/courses/Courses"));
const CourseDescription = lazy(() => import("./pages/coursedescription/CourseDescription"));
const PaymentSuccess = lazy(() => import("./pages/paymentsuccess/PaymentSuccess"));
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
const CourseStudy = lazy(() => import("./pages/coursestudy/CourseStudy"));
const Lecture = lazy(() => import("./pages/lecture/Lecture"));
const AdminDashbord = lazy(() => import("./admin/Dashboard/AdminDashbord"));
const AdminCourses = lazy(() => import("./admin/Courses/AdminCourses"));
const AdminUsers = lazy(() => import("./admin/Users/AdminUsers"));

const App = () => {
  const { isAuth, user, loading } = UserData();

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <BrowserRouter>
          <Header isAuth={isAuth} user={user} />
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route
                path="/account"
                element={isAuth ? <Account user={user} /> : <Login />}
              />
              <Route path="/login" element={isAuth ? <Home /> : <Login />} />
              <Route
                path="/register"
                element={isAuth ? <Home /> : <Register />}
              />
              <Route path="/verify" element={isAuth ? <Home /> : <Verify />} />
              <Route path="/courses" element={<Courses />} />
              <Route
                path="/course/:id"
                element={isAuth ? <CourseDescription user={user} /> : <Login />}
              />
              <Route
                path="/payment-success/:id"
                element={isAuth ? <PaymentSuccess user={user} /> : <Login />}
              />
              <Route
                path="/:id/dashboard"
                element={isAuth ? <Dashboard user={user} /> : <Login />}
              />
              <Route
                path="/course/study/:id"
                element={isAuth ? <CourseStudy user={user} /> : <Login />}
              />
              <Route
                path="/lectures/:id"
                element={isAuth ? <Lecture user={user} /> : <Login />}
              />
              <Route
                path="/admin/dashboard"
                element={isAuth ? <AdminDashbord user={user} /> : <Login />}
              />
              <Route
                path="/admin/course"
                element={isAuth ? <AdminCourses user={user} /> : <Login />}
              />
              <Route
                path="/admin/users"
                element={isAuth ? <AdminUsers user={user} /> : <Login />}
              />
            </Routes>
          </Suspense>
          <Footer />
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
