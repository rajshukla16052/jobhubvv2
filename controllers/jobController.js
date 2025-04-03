const Job = require("../models/Job");
module.exports = {
  createJob: async (req, res) => {
    const newJob = new Job(req.body);
    console.log(newJob);
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
    const jobId = req.params.id;
    console.log(jobId);
    try {
        const job = await Job.findById({ _id: jobId }, { createdAt: 0, updatedAt: 0, __V: 0 });
        res.status(200).json(job);
    } catch (error) {
        res.status(500).json(error);
    }
},



  getAllJobs: async (req, res) => {
    const recent = req.query.new;

    try {
      // let job = await Job.findById({},{createdAt:0, updatedAt:0, __V:0}).sort({createdAt:-1}).limit(2)
      let jobs;
      if (recent) {
        jobs = await Job.find({}, { createdAt: 0, updatedAt: 0, __V: 0 })
          .sort({ createdAt: -1 })
          .limit(2);
      } else {
        jobs = await Job.find({}, { createdAt: 0, updatedAt: 0, __V: 0 });
      }
      res.status(200).json(jobs);
    } catch (error) {
      res.status(500);
    }
  },

  searchJobs: async (req, res) => {
    try {
      const results = await Job.aggregate([
        {
          $search: {
            index: "jobsearch",
            text: {
              query: req.params.key,
              path: {
                wildcard: "*",
              },
            },
          },
        },
      ]);
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getAgentJobs: async (req, res) => {
    const uid = req.params.uid;
    try {
      const agentJobs = await Job.find(
        {
          agentId: uid,
        },
        { __v: 0, createdAt: 0, updatedAt: 0 }
      ).sort({ createdAt: -1 });
      res.status(200).json(agentJobs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
