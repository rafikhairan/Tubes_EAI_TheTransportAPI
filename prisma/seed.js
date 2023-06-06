const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
	await prisma.kota.createMany({
		data: [{ nama: "Bandung" }, { nama: "Cimahi" }, { nama: "Depok" }, { nama: "Sukabumi" }, { nama: "Tasikmalaya" }],
	});

	// await prisma.rute.create({
	// 	data: {
	// 		nama: "Bandung - Sukabumi",
	// 		harga: 115000,
	// 		kendaraan: {
	// 			connect: {
	// 				id: 1,
	// 			},
	// 		},
	// 		kotaAsal: {
	// 			connect: {
	// 				id: 1,
	// 			},
	// 		},
	// 		kotaTujuan: {
	// 			connect: {
	// 				id: 4,
	// 			},
	// 		},
	// 	},
	// });
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
