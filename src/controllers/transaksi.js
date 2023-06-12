const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getTransaksi = async (req, res) => {
	try {
		let transaksi;
		if (req.user.isAdmin == false) {
			transaksi = await prisma.transaksi.findMany({
				where: {
					user: {
						id: req.user.id,
					},
				},
				select: {
					id: true,
					tanggalTransaksi: true,
					user: {
						select: {
							nama: true,
						},
					},
					tiket: {
						select: {
							id: true,
							rute: {
								select: {
									nama: true,
									kendaraan: {
										select: {
											noPol: true,
										},
									},
								},
							},
						},
					},
				},
			});
		} else {
			transaksi = await prisma.transaksi.findMany();
		}
		if (transaksi.length == 1) {
			transaksi = transaksi[0];
		}
		if (transaksi.length == undefined) {
			transaksi.tanggalTransaksi = transaksi.tanggalTransaksi.toDateString();
		} else {
			transaksi.forEach((data) => {
				data.tanggalTransaksi = data.tanggalTransaksi.toDateString();
			});
		}
		res.status(200).json({
			message: "Berhasil mengambil data transaksi",
			transaksi,
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

const createTransaksi = async (req, res) => {
	const { idRute, jumlahBeli, tanggalPesan } = req.body;
	const tiket = {};
	if (jumlahBeli > 1) {
		tiket.create = [];
		for (let i = 1; i <= jumlahBeli; i++) {
			tiket.create.push({
				tanggalPesan,
				rute: {
					connect: {
						id: idRute,
					},
				},
			});
		}
	} else {
		tiket.create = {
			tanggalPesan,
			rute: {
				connect: {
					id: idRute,
				},
			},
		};
	}
	try {
		const transaksi = await prisma.transaksi.create({
			data: {
				tanggalTransaksi: new Date(),
				user: {
					connect: {
						email: req.user.email,
					},
				},
				tiket,
			},
			select: {
				id: true,
				tanggalTransaksi: true,
			},
		});
		await prisma.rute.update({
			where: {
				id: idRute,
			},
			data: {
				kendaraan: {
					update: {
						kursiTersedia: {
							decrement: jumlahBeli,
						},
					},
				},
			},
		});
		transaksi.tanggalTransaksi = transaksi.tanggalTransaksi.toDateString();
		res.status(201).json({
			message: "Berhasil memesan tiket",
			transaksi,
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

module.exports = {
	getTransaksi,
	createTransaksi,
};
