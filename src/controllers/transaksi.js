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
					tanggalPesan: true,
					user: {
						select: {
							nama: true,
						},
					},
					tiket: {
						select: {
							id: true,
							jenisTiket: true,
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
			transaksi.tanggalPesan = transaksi.tanggalPesan.toDateString();
		} else {
			transaksi.forEach((data) => {
				data.tanggalPesan = data.tanggalPesan.toDateString();
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
	const { idRute, jumlahBeli, jenisTiket } = req.body;
	const tiket = {};
	if (jumlahBeli > 1) {
		tiket.create = [];
		for (let i = 1; i <= jumlahBeli; i++) {
			tiket.create.push({
				rute: {
					connect: {
						id: idRute,
					},
				},
			});
		}
	} else {
		tiket.create = {
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
				user: {
					connect: {
						id: req.user.id,
					},
				},
				tanggalPesan: new Date(),
				tiket,
			},
			select: {
				id: true,
				tanggalPesan: true,
			},
		});
		transaksi.tanggalPesan = transaksi.tanggalPesan.toDateString();
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
