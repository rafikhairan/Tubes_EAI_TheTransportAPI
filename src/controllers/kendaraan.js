const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getKendaraan = async (req, res) => {
	const kendaraan = await prisma.kendaraan.findMany({
		select: {
			noPol: true,
			armada: true,
			kursiTersedia: true,
			driver: {
				select: {
					nama: true,
					noTelp: true,
				},
			},
		},
	});

	res.status(200).json({
		message: "Berhasil mengambil data kendaraan",
		kendaraan,
	});
};

const createKendaraan = async (req, res) => {
	const { body } = req;

	try {
		const kendaraan = await prisma.kendaraan.create({
			data: {
				armada: body.armada,
				noPol: body.noPol,
				kursiTersedia: body.kursiTersedia,
				driver: {
					connect: {
						id: body.idDriver,
					},
				},
			},
		});
		res.status(201).json({
			message: "Berhasil menambahkan kendaraan baru",
			kendaraan,
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

module.exports = {
	getKendaraan,
	createKendaraan,
};
