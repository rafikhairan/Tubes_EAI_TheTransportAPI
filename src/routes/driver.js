const express = require("express");
const driverController = require("../controllers/driver");
const router = express.Router();

router.get("/", driverController.getDriver);
router.post("/", driverController.createDriver);

module.exports = router;
