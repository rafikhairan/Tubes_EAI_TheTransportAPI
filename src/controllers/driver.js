const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getDriver = async (req, res) => {
	const driver = await prisma.driver.findMany();

	res.status(200).json({
		message: "Berhasil mengambil data driver",
		driver,
	});
};

const createDriver = async (req, res) => {
	const { body } = req;
	const data = {
		nama: body.nama,
		alamat: body.alamat,
		noTelp: body.noTelp,
	};
	await prisma.driver.create({ data });

	res.status(201).json({
		message: "Berhasil menambahkan driver baru",
		data,
	});
};

module.exports = {
	getDriver,
	createDriver,
};
