const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getKota = async (req, res) => {
	let kota = await prisma.kota.findMany();
	if (kota.length == 1) {
		kota = kota[0];
	}
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
