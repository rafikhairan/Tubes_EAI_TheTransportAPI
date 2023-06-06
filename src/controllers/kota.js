const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getKota = async (req, res) => {
	const kota = await prisma.kota.findMany();

	res.status(200).json({
		message: "Berhasil mengambil data kota",
		kota,
	});
};

const createKota = async (req, res) => {
	const { body } = req;
	const kota = await prisma.kota.create({
		data: {
			nama: body.nama,
		},
	});

	res.status(200).json({
		message: "Berhasil menambahkan kota baru",
		kota,
	});
};

module.exports = {
	getKota,
	createKota,
};
