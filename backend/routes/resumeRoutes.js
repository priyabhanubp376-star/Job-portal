const express = require("express");
const router = express.Router();

const { upload } = require("../utils/upload");
const Resume = require("../models/Resume");

// =====================
// UPLOAD RESUME
// =====================
router.post("/upload", upload.single("resume"), async (req, res) => {
  try {
    console.log("FILE:", req.file);

    if (!req.file) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    const newResume = await Resume.create({
      filename: req.file.filename,
      path: req.file.path
    });

    console.log("SAVED:", newResume);

    res.json(newResume);

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Upload failed" });
  }
});

// =====================
// GET ALL RESUMES (ADMIN)
// =====================
router.get("/all", async (req, res) => {
  try {
    const resumes = await Resume.find().sort({ createdAt: -1 });

    console.log("ALL RESUMES:", resumes);

    res.json(resumes);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching resumes" });
  }
});

module.exports = router;