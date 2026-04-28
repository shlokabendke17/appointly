import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      if (res.data.success) {
        // 1️⃣ Store JWT token in localStorage
        localStorage.setItem("token", res.data.token);

        // 2️⃣ Store role if needed
        localStorage.setItem("role", res.data.user.role);
        
        localStorage.setItem("name", res.data.user.name); // store user name

        localStorage.setItem("user", JSON.stringify(res.data.user));


        // 3️⃣ Redirect to frontend dashboard route
        if (res.data.user.role === "user") {
          navigate("/dashboard/user"); // <-- frontend route
        } else if (res.data.user.role === "provider") {
          navigate("/dashboard/provider"); // <-- frontend route
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container col-md-6 mt-5">
      <h2 className="mb-3">Login</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email</label>
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
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-dark w-100">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
