import axios from "axios";
import { useEffect, useState } from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const nav = useNavigate();

  // Fetch Notes
  useEffect(() => {
    axios
      .get(`${API}/api/notes`) // ✅ Fixed template string
      .then((res) => setNotes(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    nav("/");
  };

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <div className="navbar">
        <h2>📚 Notes Sharing</h2>

        <button onClick={logout}>Logout</button>
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Upload Section */}
        <div className="upload-box">
          <h3>Upload New Notes</h3>

          <p>Go to upload section to share your notes with others.</p>

          <button
            onClick={() => nav("/upload")}
            style={{
              background: "#4facfe",
              color: "white",
              border: "none",
              padding: "8px 15px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Upload Notes
          </button>
        </div>

        {/* Notes Section */}
        <h3>Available Notes</h3>

        <div className="notes-grid">
          {notes.map((note) => (
            <div className="note-card" key={note._id}>
              <h4>{note.title}</h4>

              <p>
                <b>Subject:</b> {note.subject}
              </p>

              <p>
                <b>By:</b> {note.user?.name}
              </p>

              <a
                href={`https://notes-sharing-n9n8.onrender.com/uploads/${note.file}`}
                target="_blank"
                rel="noreferrer"
              >open
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
