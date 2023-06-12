const express = require("express");
const kendaraanController = require("../controllers/kendaraan");
const router = express.Router();

router.get("/", kendaraanController.getKendaraan);
router.post("/", kendaraanController.createKendaraan);
router.put("/", kendaraanController.updateKendaraan);

module.exports = router;
