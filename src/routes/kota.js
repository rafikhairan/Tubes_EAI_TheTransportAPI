const express = require("express");
const kotaController = require("../controllers/kota");
const router = express.Router();

router.get("/", kotaController.getKota);
router.post("/", kotaController.createKota);

module.exports = router;
