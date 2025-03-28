const router = require("express").Router();
const jobController = require("../controllers/jobController");
router.post("/", jobController.createJob);
router.get("/", jobController.getAllJobs);
router.get("/:id", jobController.getJob);
router.put("/:id", jobController.updateJob);
router.delete("/:id", jobController.deleteJob);
// router.get("/agent/:id", jobController.getAgentJobs);
// router.get("/search", jobController.searchJobs);

module.exports = router;
