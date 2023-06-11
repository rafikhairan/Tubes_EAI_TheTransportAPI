const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllRute = async (req, res) => {
	const { kotaAsal, kotaTujuan, harga } = req.query;
	const conditions = {};
	let select = {};
	if (kotaAsal) {
		conditions.kotaAsal = {
			nama: kotaAsal,
		};
	}
	if (kotaTujuan) {
		conditions.kotaTujuan = {
			nama: kotaTujuan,
		};
	}
	if (harga) {
		conditions.harga = parseFloat(harga);
	}
	if (req.user.isAdmin == true) {
		select = {
			id: true,
			nama: true,
			harga: true,
			kendaraan: {
				select: {
					noPol: true,
					driver: {
						select: {
							nama: true,
							noTelp: true,
						},
					},
				},
			},
		};
	} else {
		select = {
			nama: true,
			harga: true,
		};
	}
	try {
		let rute = await prisma.rute.findMany({
			where: {
				...conditions,
			},
			select,
		});
		if (rute.length != 0) {
			if (rute.length == 1) {
				rute = rute[0];
			}
			res.status(200).json({
				message: "Berhasil mengambil data rute",
				rute,
			});
		} else {
			res.status(400).json({
				message: "Pencarian tidak dapat ditemukan",
			});
		}
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

const createRute = async (req, res) => {
	const { body } = req;
	const idKotaAsal = await prisma.kota
		.findFirst({
			where: {
				nama: body.kotaAsal,
			},
		})
		.then((data) => {
			return data.id;
		});
	const idKotaTujuan = await prisma.kota
		.findFirst({
			where: {
				nama: body.kotaTujuan,
			},
		})
		.then((data) => {
			return data.id;
		});

	try {
		const rute = await prisma.rute.create({
			data: {
				nama: `${body.kotaAsal} - ${body.kotaTujuan}`,
				harga: parseFloat(body.harga),
				kendaraan: {
					connect: {
						noPol: body.noPol,
					},
				},
				kotaAsal: {
					connect: {
						id: idKotaAsal,
					},
				},
				kotaTujuan: {
					connect: {
						id: idKotaTujuan,
					},
				},
			},
		});
		res.status(201).json({
			message: "Rute baru berhasil ditambahkan",
			rute,
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

const deleteRute = async (req, res) => {
	const { idRute } = req.params;

	try {
		await prisma.rute.delete({
			where: {
				id: parseInt(idRute),
			},
		});
		res.status(200).json({
			message: `Rute dengan id ${idRute} berhasil dihapus`,
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

const updateRute = async (req, res) => {
	const { idRute } = req.params;
	const { harga, noPol } = req.body;
	const data = {};

	if (harga) {
		data.harga = parseFloat(harga);
	}
	if (noPol) {
		data.kendaraan = {
			connect: {
				noPol,
			},
		};
	}

	try {
		const rute = await prisma.rute.update({
			where: {
				id: parseInt(idRute),
			},
			data: {
				...data,
			},
		});
		res.status(200).json({
			message: `Berhasil mengupdate data dengan id ${idRute}`,
			rute,
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

module.exports = {
	getAllRute,
	createRute,
	deleteRute,
	updateRute,
};
