import "./Jobs.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);

  // SEARCH & FILTER STATES
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchJobs();

    if (user?.id) {
      fetchAppliedJobs();
    }
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get(
        "https://job-portal-lqyq.onrender.com/api/jobs"
      );
      setJobs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAppliedJobs = async () => {
    try {
      const res = await axios.get(
        `https://job-portal-lqyq.onrender.com/api/applications/user/${user.id}`
      );

      const ids = res.data.map(
        (app) => app.jobId?._id
      );

      setAppliedJobs(ids);
    } catch (err) {
      console.log(err);
    }
  };

  const applyJob = async (jobId) => {
    try {
      await axios.post(
        "https://job-portal-lqyq.onrender.com/api/applications",
        {
          userId: user.id,
          jobId,
        }
      );

      setAppliedJobs((prev) => [
        ...prev,
        jobId,
      ]);

      alert("Applied Successfully 🎉");
    } catch (err) {
      console.log(err);
      alert("Application Failed");
    }
  };

  // FILTER LOGIC
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      job.company
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesLocation =
      locationFilter === "" ||
      job.location === locationFilter;

    const matchesType =
      typeFilter === "" ||
      job.type === typeFilter;

    return (
      matchesSearch &&
      matchesLocation &&
      matchesType
    );
  });

  return (
    <div className="jobs-page">
      <h1>Explore Jobs</h1>

      {/* FILTERS */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search jobs..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          value={locationFilter}
          onChange={(e) =>
            setLocationFilter(e.target.value)
          }
        >
          <option value="">
            All Locations
          </option>

          {[...new Set(
            jobs.map((job) => job.location)
          )].map((location) => (
            <option
              key={location}
              value={location}
            >
              {location}
            </option>
          ))}
        </select>

        <select
          value={typeFilter}
          onChange={(e) =>
            setTypeFilter(e.target.value)
          }
        >
          <option value="">
            All Types
          </option>

          {[...new Set(
            jobs.map((job) => job.type)
          )].map((type) => (
            <option
              key={type}
              value={type}
            >
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="job-grid">
        {filteredJobs.map((job) => {
          const isApplied =
            appliedJobs.includes(job._id);

          return (
            <div
              key={job._id}
              className="job-card"
            >
              <h2>{job.title}</h2>

              <p className="company">
                {job.company}
              </p>

              <div className="info">
                <span>
                  📍 {job.location}
                </span>

                <span className="type">
                  {job.type}
                </span>
              </div>
  
<Link to={`/jobs/${job._id}`}>
  <button
    style={{
      marginBottom: "10px",
      background: "#16a34a",
    }}
  >
    View Details
  </button>
</Link>



              <button
                onClick={() =>
                  applyJob(job._id)
                }
                disabled={isApplied}
                style={{
                  background: isApplied
                    ? "gray"
                    : "#1e293b",
                  cursor: isApplied
                    ? "not-allowed"
                    : "pointer",
                }}
              >
                {isApplied
                  ? "Applied"
                  : "Apply Now"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Jobs;