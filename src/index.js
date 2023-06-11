require("dotenv").config();

const PORT = process.env.PORT;
const express = require("express");
const app = express();

const { register, login } = require("./controllers/auth");

const ruteRoutes = require("./routes/rute");
const kendaraanRoutes = require("./routes/kendaraan");
const kotaRoutes = require("./routes/kota");
const transaksiRoutes = require("./routes/transaksi");

const authMiddleware = require("./middleware/auth");
const checkAdminMiddleware = require("./middleware/checkAdmin");

app.use(express.json());

app.post("/register", register);
app.post("/login", login);
app.use("/rute", authMiddleware, ruteRoutes);
app.use("/kendaraan", [authMiddleware, checkAdminMiddleware], kendaraanRoutes);
app.use("/kota", authMiddleware, kotaRoutes);
app.use("/transaksi", authMiddleware, transaksiRoutes);

app.listen(PORT, () => {
	console.log(`Server berjalan di port ${PORT}`);
});

console.log(process.env.DATABASE_URL);
