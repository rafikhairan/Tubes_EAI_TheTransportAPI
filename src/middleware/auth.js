require("dotenv").config();

const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const auth = (req, res, next) => {
	const { authorization } = req.headers;
	if (!authorization) {
		return res.status(401).json({
			message: "Login terlebih dahulu untuk mendapatkan token",
		});
	}
	jwt.verify(authorization, JWT_SECRET, (err, user) => {
		if (err) {
			return res.status(403).json({
				message: "Token yang anda masukkan tidak valid",
			});
		}
		req.user = user;
		next();
	});
};

module.exports = auth;
