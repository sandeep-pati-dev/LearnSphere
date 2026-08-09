import React, { useEffect, useState } from "react";
import "./users.css";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import Layout from "../Utils/Layout";
import toast from "react-hot-toast";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

const AdminUsers = ({ user }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  const [users, setUsers] = useState([]);

  async function fetchUsers() {
    try {
      const { data } = await api.get("/user");
      setUsers(data.users);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateRole = async (id) => {
    if (window.confirm("Are you sure you want to update this user's role?")) {
      try {
        const { data } = await api.put(`/user/${id}`, {});

        toast.success(data.message);
        fetchUsers();
      } catch (error) {
        toast.error(error.response?.data?.message || "Error updating role");
      }
    }
  };

  return (
    <Layout>
      <div className="users">
        <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>All Users</h1>
        <Card className="table-container">
          <table border="1" style={{ borderCollapse: "collapse", width: "100%", border: "1px solid rgba(255,255,255,0.05)" }}>
            <thead>
              <tr style={{ background: "rgba(255,255,255,0.02)" }}>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Update Role</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((e, i) => (
                  <tr key={e._id}>
                    <td>{i + 1}</td>
                    <td>{e.name}</td>
                    <td>{e.email}</td>
                    <td>{e.role}</td>
                    <td>
                      <Button
                        onClick={() => updateRole(e._id)}
                        variant="primary"
                        style={{ padding: "6px 12px", fontSize: "14px" }}
                      >
                        Update Role
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No users found</td>
                </tr>
              )}
            </tbody>
          </table>
        </Card>
      </div>
    </Layout>
  );
};

export default AdminUsers;
