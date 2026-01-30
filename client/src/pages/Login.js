import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login(){

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const nav = useNavigate();

  const submit = async e =>{
    e.preventDefault();

    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      {email,password}
    );

    localStorage.setItem("token",res.data.token);
    nav("/dashboard");
  };

  return (
    <div className="login-container">

      <div className="login-card">

        <h2>Student Login</h2>

        <form onSubmit={submit}>

          <input
            type="email"
            placeholder="Email"
            required
            onChange={e=>setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            required
            onChange={e=>setPassword(e.target.value)}
          />

          <button type="submit">Login</button>

        </form>

        <p>
          Don’t have an account? <a href="/register">Register</a>
        </p>

      </div>

    </div>
  );
}
