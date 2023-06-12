const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getKendaraan = async (req, res) => {
	let kendaraan = await prisma.kendaraan.findMany({
		select: {
			noPol: true,
			armada: true,
			kursiTersedia: true,
			driver: {
				select: {
					nama: true,
					alamat: true,
					noTelp: true,
				},
			},
			rute: {
				select: {
					nama: true,
				},
			},
		},
	});
	if (kendaraan.length == 1) {
		kendaraan = kendaraan[0];
	}
	res.status(200).json({
		message: "Berhasil mengambil data kendaraan",
		kendaraan,
	});
};

const createKendaraan = async (req, res) => {
	const { body } = req;
	const { driver } = req.body;
	try {
		const kendaraan = await prisma.kendaraan.create({
			data: {
				armada: body.armada,
				noPol: body.noPol,
				kursiTersedia: body.kursiTersedia,
				driver: {
					create: {
						nama: driver.nama,
						alamat: driver.alamat,
						noTelp: driver.noTelp,
					},
				},
			},
			select: {
				noPol: true,
				armada: true,
				kursiTersedia: true,
				driver: {
					select: {
						nama: true,
						alamat: true,
						noTelp: true,
					},
				},
				rute: {
					select: {
						nama: true,
					},
				},
			},
		});
		res.status(201).json({
			message: "Berhasil menambahkan kendaraan beserta driver baru",
			kendaraan,
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

const updateKendaraan = async (req, res) => {
	const { noPol, kursiTersedia } = req.body;
	try {
		const kendaraan = await prisma.kendaraan.update({
			where: {
				noPol,
			},
			data: {
				kursiTersedia,
			},
		});
		res.status(201).json({
			message: "Berhasil mengupdate kendaraan",
			kendaraan,
		});
	} catch (error) {
		res.status(500).json({
			error: error.message,
		});
	}
};

module.exports = {
	getKendaraan,
	createKendaraan,
	updateKendaraan,
};
