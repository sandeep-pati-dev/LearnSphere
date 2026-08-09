import React, { useState } from "react";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../../context/UserContext";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

const Verify = () => {
  const [otp, setOtp] = useState("");
  const { btnLoading, verifyOtp } = UserData();
  const navigate = useNavigate();
  
  const submitHandler = async (e) => {
    e.preventDefault();
    await verifyOtp(Number(otp), navigate);
  };

  return (
    <div className="auth-page">
      <Card className="auth-form">
        <h2>Verify Account</h2>
        <form onSubmit={submitHandler}>
          <Input
            label="OTP Code"
            id="otp"
            type="number"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            placeholder="123456"
          />

          <Button type="submit" disabled={btnLoading} style={{ width: "100%", marginTop: "10px" }}>
            {btnLoading ? "Please Wait..." : "Verify"}
          </Button>
        </form>
        <p>
          Go back to <Link to="/login">Login</Link>
        </p>
      </Card>
    </div>
  );
};

export default Verify;
