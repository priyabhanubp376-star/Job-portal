import { useEffect, useState } from "react";
import axios from "axios";

function AdminResumes() {
  const [resumes, setResumes] = useState([]);

  const fetchResumes = () => {
    axios.get("https://job-portal-lqyq.onrender.com/api/resume/all")
      .then(res => setResumes(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  return (
    <div>
      <h2>All Resumes 📄</h2>

      <button onClick={fetchResumes}>
        Refresh
      </button>

      {resumes.length === 0 ? (
        <p>No resumes found</p>
      ) : (
        resumes.map((r) => (
          <div key={r._id}>
            <p>{r.filename}</p>

            <a
              href={`https://job-portal-lqyq.onrender.com/uploads/${r.filename}`}
              target="_blank"
            >
              View Resume
            </a>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminResumes;