import { useState } from "react";
import axios from "axios";
import "./Upload.css";
import { useNavigate } from "react-router-dom";

export default function Upload(){

  const [title,setTitle] = useState("");
  const [subject,setSubject] = useState("");
  const [file,setFile] = useState(null);

  const nav = useNavigate();
  const token = localStorage.getItem("token");

  const submit = async e =>{
    e.preventDefault();

    if(!file){
      alert("Please select a file");
      return;
    }

    const form = new FormData();
    form.append("title", title);
    form.append("subject", subject);
    form.append("file", file);

    try{

      await axios.post(
        "https://notes-sharing-n9n8.onrender.com",
        form,
        {
          headers:{
            "x-auth-token": token,
            "Content-Type":"multipart/form-data"
          }
        }
      );

      alert("Uploaded Successfully!");
      nav("/dashboard");

    }catch(err){

      console.log(err);
      alert("Upload Failed");

    }
  };

  return (
    <div className="upload-container">

      <div className="upload-card">

        <h2>Upload Notes</h2>

        <form onSubmit={submit}>

          <input
            placeholder="Title"
            required
            onChange={e=>setTitle(e.target.value)}
          />

          <input
            placeholder="Subject"
            required
            onChange={e=>setSubject(e.target.value)}
          />

          <input
            type="file"
            required
            onChange={e=>setFile(e.target.files[0])}
          />

          <button>Upload</button>

        </form>

      </div>

    </div>
  );
}
