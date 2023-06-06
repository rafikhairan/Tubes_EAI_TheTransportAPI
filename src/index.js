require("dotenv").config();

const PORT = process.env.PORT;
const express = require("express");
const app = express();
const ruteRoutes = require("./routes/rute");
const driverRoutes = require("./routes/driver");
const kendaraanRoutes = require("./routes/kendaraan");
const kotaRoutes = require("./routes/kota");

app.use(express.json());

app.use("/rute", ruteRoutes);
app.use("/driver", driverRoutes);
app.use("/kendaraan", kendaraanRoutes);
app.use("/kota", kotaRoutes);

app.listen(PORT, () => {
	console.log(`Server berjalan di port ${PORT}`);
});
