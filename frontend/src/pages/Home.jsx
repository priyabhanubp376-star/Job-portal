import "./Home.css";

function Home() {
  return (
    <div className="home">

      {/* HERO SECTION */}
      <div className="hero">
        <h1>Find Your Dream Job</h1>
        <p>
          Thousands of opportunities are waiting for you.
          Build your career with top companies.
        </p>

        <div className="hero-buttons">
          <button>Browse Jobs</button>
          <button>Upload Resume</button>
        </div>
      </div>

      {/* STATS SECTION */}
      <div className="stats">
        <div>
          <h2>10K+</h2>
          <p>Jobs</p>
        </div>
        <div>
          <h2>5K+</h2>
          <p>Companies</p>
        </div>
        <div>
          <h2>8K+</h2>
          <p>Users</p>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2026 Job Portal. All rights reserved.</p>
      </footer>

    </div>
  );
}

export default Home;