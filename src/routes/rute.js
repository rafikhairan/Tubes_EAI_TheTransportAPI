const express = require("express");
const ruteController = require("../controllers/rute");
const router = express.Router();

router.get("/", ruteController.getAllRute);
router.post("/", ruteController.createRute);
router.delete("/:idRute", ruteController.deleteRute);
router.put("/:idRute", ruteController.updateRute);

module.exports = router;
