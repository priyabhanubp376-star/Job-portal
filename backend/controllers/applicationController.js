const applyJob = async (req, res) => {
  try {
    const { userId, jobId } = req.body;

    // ✅ STEP: check duplicate
    const existing = await Application.findOne({
      userId,
      jobId,
    });

    if (existing) {
      return res.status(400).json({
        message: "Already applied for this job",
      });
    }

    // ✅ create application
    const application = await Application.create({
      userId,
      jobId,
      status: "Applied",
    });

    res.json(application);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};