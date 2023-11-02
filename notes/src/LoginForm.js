import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        formData
      );
      console.log(response.status, response.data.message);
      if (response.data.token) {
        const token = response.data.token;

        // Almacenar el token en localStorage o en una cookie para su uso posterior.
        localStorage.setItem("token", token);

        // Redirigir a la página de notas después de la autenticación.
        navigate("/notes");
      } else {
        setError(`Wrong Credentials. ${response.data.message}`);
      }
      // Si la autenticación fue exitosa, se asume que el servidor devolvió un token.
    } catch (error) {
      // Si hubo un error en la autenticación, muestra un mensaje de error.
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
