const Job = require("../models/Job");
module.exports = {
  createJob: async (req, res) => {
    const newJob = new Job(req.body);
    try {
      await newJob.save();
      res
        .status(201)
        .json({ status: "success", message: "Job created successfully" });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  updateJob: async (req, res) => {
    const jobId = req.params.id;
    const updated = req.body;
    try {
      const updatedJob = await findByIdAndUpdate(jobId, updated, { new: true });
      if (!updatedJob) {
        return res
          .status(404)
          .json({ status: false, message: "Job not found" });
      }
      res
        .status(200)
        .json({ status: true, message: "Job updated successfully" });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteJob: async (req, res) => {
    const jobId = req.params.id;
    try {
      await Job.findByIdAndDelete(jobId);
      res.status(200).json({
        status: true,
        message: "Job deleted successfully",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getJob: async (req, res) => {
    const job = req.params.id;
    try {
      const job = await Job.findById(
        { _id: jobId },
        { createdAt: 0, updatedAt: 0 }
      );
      res.status(200).json({
        status: true,
        message: "Job fetched successfully",
        data: job,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
