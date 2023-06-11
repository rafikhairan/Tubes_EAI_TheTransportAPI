const express = require("express");
const kotaController = require("../controllers/kota");
const router = express.Router();
const checkAdminMiddleware = require("../middleware/checkAdmin");

router.get("/", kotaController.getKota);
router.post("/", checkAdminMiddleware, kotaController.createKota);

module.exports = router;
