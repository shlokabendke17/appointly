import { useState } from "react";
import axios from "axios"; 
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const RegisterUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "", 
    role: "User", 
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register-user", formData);
      if (res.data.success) {
        setSuccess("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4">Register as User</h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Full Name <span style={{ color: "red" }}>*</span> </label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="John Doe"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email Address <span style={{ color: "red" }}>*</span></label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password <span style={{ color: "red" }}>*</span></label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Confirm Password <span style={{ color: "red" }}>*</span></label>
          <input
            type="password"
            name="confirmPassword"
            className="form-control"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        {/* Hidden role */}
        {/* <input type="hidden" name="role" value="user" /> */}
        <div className="mb-3">
          <label className="form-label">Role <span style={{ color: "red" }}>*</span></label>
          <input
            type="text"
            name="role"
            className="form-control"
            value={formData.role}
            readOnly // prevents editing
          />
          <small className="form-text text-muted">
            This registration is for common users. If you want to register as a service provider,{" "}
            <Link to="/register-provider" >Click Here</Link>
          </small>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterUser;
