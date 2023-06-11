const express = require("express");
const ruteController = require("../controllers/rute");
const router = express.Router();
const checkAdminMiddleware = require("../middleware/checkAdmin");

router.get("/", ruteController.getAllRute);
router.post("/", checkAdminMiddleware, ruteController.createRute);
router.delete("/:idRute", checkAdminMiddleware, ruteController.deleteRute);
router.put("/:idRute", checkAdminMiddleware, ruteController.updateRute);

module.exports = router;
