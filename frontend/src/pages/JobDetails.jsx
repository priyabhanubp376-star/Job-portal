import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function JobDetails() {
  const { id } = useParams();

  const [job, setJob] = useState(null);

  useEffect(() => {
    fetchJob();
  }, []);

  const fetchJob = async () => {
    try {
      const res = await axios.get(
        `https://job-portal-lqyq.onrender.com/api/jobs/${id}`
      );

      setJob(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!job) {
    return <h2>Loading...</h2>;
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1>{job.title}</h1>

      <h3>{job.company}</h3>

      <p>
        <b>Location:</b> {job.location}
      </p>

      <p>
        <b>Type:</b> {job.type}
      </p>

      <p>
        <b>Description:</b>
      </p>

      <p>
        {job.description ||
          "No description available"}
      </p>
    </div>
  );
}

export default JobDetails;