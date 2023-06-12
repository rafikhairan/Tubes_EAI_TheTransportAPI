const express = require("express");
const tourismController = require("../controllers/tourism");
const router = express.Router();

router.get("/", tourismController.getBookingBundle);
router.post("/", tourismController.postKendaraan);

module.exports = router;
