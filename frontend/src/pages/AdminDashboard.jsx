import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // JOB FORM
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    fetchJobs();
    fetchApplications();
  }, []);

  // ================= JOBS =================
  const fetchJobs = async () => {
    try {
      const res = await axios.get("https://job-portal-lqyq.onrender.com/api/jobs");
      setJobs(res.data);
    } catch (err) {
      console.log(err);
    }
  };
//add job
  const addJob = async () => {
  try {
    if (editingId) {
      await axios.put(
        `https://job-portal-lqyq.onrender.com/api/jobs/${editingId}`,
        {
          title,
          company,
          location,
          type,
        }
      );

      alert("Job Updated ✅");
    } else {
      await axios.post(
        "https://job-portal-lqyq.onrender.com/api/jobs",
        {
          title,
          company,
          location,
          type,
        }
      );

      alert("Job Added ✅");
    }

    setTitle("");
    setCompany("");
    setLocation("");
    setType("");
    setEditingId(null);

    fetchJobs();
  } catch (err) {
    console.log(err);
  }
};
//delete job
  const deleteJob = async (id) => {
    try {
      await axios.delete(`https://job-portal-lqyq.onrender.com/api/jobs/${id}`);
      alert("Job Deleted");
      fetchJobs();
    } catch (err) {
      console.log(err);
    }
  };
  //edit job
  const editJob = (job) => {
  setEditingId(job._id);

  setTitle(job.title);
  setCompany(job.company);
  setLocation(job.location);
  setType(job.type);
};

  // ================= APPLICATIONS =================
  const fetchApplications = async () => {
    try {
      const res = await axios.get(
        "https://job-portal-lqyq.onrender.com/api/applications"
      );
      setApplications(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `https://job-portal-lqyq.onrender.com/api/applications/status/${id}`,
        { status }
      );

      fetchApplications();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🔥 Admin Dashboard</h1>

      {/* ================= ADD JOB ================= */}
      <div style={{ marginBottom: "20px", padding: "10px", border: "1px solid #ddd" }}>
        <h3>Add Job</h3>

        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <input
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          placeholder="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />

        <button
  onClick={addJob}
  style={{ marginLeft: "10px" }}
>
  {editingId
    ? "Update Job"
    : "Add Job"}
</button>
      </div>

      {/* ================= JOB LIST ================= */}
      <h2>📌 All Jobs</h2>

      {jobs.map((job) => (
        <div
          key={job._id}
          style={{
            border: "1px solid #ddd",
            margin: "10px",
            padding: "10px",
            borderRadius: "8px",
          }}
        >
          <h3>{job.title}</h3>
          <p>{job.company}</p>
          <p>{job.location}</p>
          <p>{job.type}</p>
  
  <button
  onClick={() => editJob(job)}
  style={{
    background: "orange",
    color: "white",
    border: "none",
    padding: "5px 10px",
    marginRight: "10px",
    cursor: "pointer",
  }}
>
  Edit Job
</button>
          <button
            onClick={() => deleteJob(job._id)}
            style={{
              background: "red",
              color: "white",
              padding: "5px 10px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Delete Job
          </button>
        </div>
      ))}

      {/* ================= APPLICATIONS ================= */}
      <h2>📩 Applications</h2>

      {applications.map((app) => (
        <div
          key={app._id}
          style={{
            border: "1px solid #ddd",
            margin: "10px",
            padding: "10px",
            borderRadius: "8px",
          }}
        >
          <h3>{app.jobId?.title}</h3>
          <p>{app.userId?.name}</p>

          <select
            value={app.status}
            onChange={(e) =>
              updateStatus(app._id, e.target.value)
            }
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Rejected">Rejected</option>
            <option value="Selected">Selected</option>
          </select>
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;