const express = require("express");
const router = express.Router();
const { addSoftwareDescription } = require("../Controllers/softwareDescriptionController");

// Route to add software description
router.post("/admin/software-description", addSoftwareDescription);

module.exports = router;
