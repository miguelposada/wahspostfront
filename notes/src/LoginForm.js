import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [userID, setUserID] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        formData
      );
      console.log(response.status, response.data.message);
      if (response.data.token) {
        const { token, userId } = response.data;

        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);

        setUserID(userID);

        navigate("/notes");
      } else {
        setError(`Wrong Credentials. ${response.data.message}`);
      }
    } catch (error) {
      setError(`Error with login process. ${error}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default LoginForm;
