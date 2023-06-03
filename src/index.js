require("dotenv").config();

const PORT = process.env.PORT;
const express = require("express");
const app = express();

app.use(express.json());

app.listen(PORT, () => {
	console.log(`Server berjalan di port ${PORT}`);
});
