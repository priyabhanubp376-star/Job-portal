
const express = require("express");
const router = express.Router();
const Application = require("../models/Application");

// APPLY JOB
router.post("/", async (req, res) => {
  try {
    const { userId, jobId } = req.body;

    const existing = await Application.findOne({ userId, jobId });

    if (existing) {
      return res.status(400).json({ message: "Already applied" });
    }

    const application = await Application.create({
      userId,
      jobId,
      status: "Applied",
    });

    res.status(201).json(application);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL (ADMIN)
router.get("/", async (req, res) => {
  const data = await Application.find()
    .populate("userId")
    .populate("jobId");

  res.json(data);
});

// USER APPLICATIONS
router.get("/user/:userId", async (req, res) => {
  const data = await Application.find({
    userId: req.params.userId,
  }).populate("jobId");

  res.json(data);
});

// DELETE
router.delete("/delete/:id", async (req, res) => {
  await Application.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// STATUS UPDATE
router.put("/status/:id", async (req, res) => {
  const { status } = req.body;

  const updated = await Application.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  res.json(updated);
});

module.exports = router;