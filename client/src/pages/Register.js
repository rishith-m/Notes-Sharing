import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

export default function Register(){

  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const nav = useNavigate();

  const submit = async e =>{
    e.preventDefault();

    await axios.post(
      "http://localhost:5000/api/auth/register",
      {name,email,password}
    );

    nav("/");
  };

  return (
    <div className="register-container">

      <div className="register-card">

        <h2>Create Account</h2>

        <form onSubmit={submit}>

          <input
            type="text"
            placeholder="Full Name"
            required
            onChange={e=>setName(e.target.value)}
          />

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

          <button type="submit">Register</button>

        </form>

        <p>
          Already have an account? <a href="/">Login</a>
        </p>

      </div>

    </div>
  );
}
