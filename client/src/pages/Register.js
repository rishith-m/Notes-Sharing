import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const API = "https://notes-sharing-n9n8.onrender.com";

export default function Register(){

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try{

      const data = {
        name,
        email,
        password
      };

      await axios.post(
        `${API}/api/auth/register`,
        data
      );

      alert("Registered Successfully!");
      nav("/");

    }catch(err){
      console.log(err);
      alert("Register Failed");
    }
  };

  return (
    <div className="register-container">

      <div className="register-card">

        <h2>Create Account</h2>

        <form onSubmit={submit}>

          <input
            type="text"
            placeholder="Name"
            required
            value={name}
            onChange={e=>setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={e=>setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={e=>setPassword(e.target.value)}
          />

          <button type="submit">
            Register
          </button>

        </form>

      </div>

    </div>
  );
}
