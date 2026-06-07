import { useEffect, useState } from "react";
import axios from "axios";

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user?.id) {
      fetchApplications();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await axios.get(
        `https://job-portal-lqyq.onrender.com/api/applications/user/${user.id}`
      );

      setApplications(res.data);
    } catch (error) {
      console.log("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteApplication = async (id) => {
    try {
      await axios.delete(
        `https://job-portal-lqyq.onrender.com/api/applications/delete/${id}`
      );

      fetchApplications();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <h3>Loading...</h3>;
  }

  if (!user) {
    return <h3>Please login first</h3>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Applications</h1>

      {applications.length === 0 ? (
        <h3>No Applications Found</h3>
      ) : (
        applications.map((app) => (
          <div
            key={app._id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              marginTop: "10px",
              borderRadius: "8px",
            }}
          >
            <h3>{app.jobId?.title}</h3>

            <p>
              <b>Company:</b> {app.jobId?.company}
            </p>

            <p>
              <b>Location:</b> {app.jobId?.location}
            </p>

            <span
              style={{
                padding: "5px 10px",
                borderRadius: "5px",
                color: "white",
                background:
                  app.status === "Interview"
                    ? "orange"
                    : app.status === "Rejected"
                    ? "red"
                    : app.status === "Selected"
                    ? "green"
                    : "blue",
              }}
            >
              {app.status || "Applied"}
            </span>

            <button
              onClick={() => deleteApplication(app._id)}
              style={{
                marginLeft: "10px",
                background: "red",
                color: "white",
                border: "none",
                padding: "6px 12px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default MyApplications;