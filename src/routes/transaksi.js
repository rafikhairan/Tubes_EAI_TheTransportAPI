const express = require("express");
const transaksiController = require("../controllers/transaksi");
const router = express.Router();

router.get("/", transaksiController.getTransaksi);
router.post("/", transaksiController.createTransaksi);

module.exports = router;
