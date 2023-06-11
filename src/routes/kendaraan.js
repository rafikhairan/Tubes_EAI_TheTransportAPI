const express = require("express");
const kendaraanController = require("../controllers/kendaraan");
const router = express.Router();
const checkAdminMiddleware = require("../middleware/checkAdmin");

router.get("/", kendaraanController.getKendaraan);
router.post("/", checkAdminMiddleware, kendaraanController.createKendaraan);

module.exports = router;
