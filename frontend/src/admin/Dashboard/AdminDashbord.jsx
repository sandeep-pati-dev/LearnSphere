import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Utils/Layout";
import api from "../../api";
import Card from "../../components/ui/Card";
import "./dashboard.css";
import { FaGraduationCap, FaUsers, FaVideo, FaReceipt } from "react-icons/fa";

const AdminDashbord = ({ user }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  if (user && user.role !== "admin") return null;

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchStats() {
    try {
      const { data } = await api.get("/stats");
      setStats(data.stats);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <Layout>
      <div className="admin-dashboard-container">
        <div className="admin-dashboard-header">
          <h1>Admin Control Center</h1>
          <p>Real-time analytics and management widgets for the LearnSphere platform.</p>
        </div>

        {loading ? (
          <div className="admin-loading">Loading Analytics...</div>
        ) : (
          <div className="admin-stats-grid">
            <Card className="admin-stat-card">
              <div className="stat-icon courses-icon"><FaGraduationCap /></div>
              <div className="stat-details">
                <h3>{stats?.totalCourses || 0}</h3>
                <p>Total Courses</p>
              </div>
            </Card>

            <Card className="admin-stat-card">
              <div className="stat-icon users-icon"><FaUsers /></div>
              <div className="stat-details">
                <h3>{stats?.totalUsers || 0}</h3>
                <p>Registered Users</p>
              </div>
            </Card>

            <Card className="admin-stat-card">
              <div className="stat-icon lectures-icon"><FaVideo /></div>
              <div className="stat-details">
                <h3>{stats?.totalLectures || 0}</h3>
                <p>Lecture Lessons</p>
              </div>
            </Card>

            <Card className="admin-stat-card">
              <div className="stat-icon payments-icon"><FaReceipt /></div>
              <div className="stat-details">
                <h3>{stats?.totalPayments || 0}</h3>
                <p>Total Subscriptions</p>
              </div>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AdminDashbord;
