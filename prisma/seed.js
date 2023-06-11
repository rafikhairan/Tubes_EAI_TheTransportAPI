const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
	await prisma.kota.createMany({
		data: [{ nama: "Bandung" }, { nama: "Cimahi" }, { nama: "Depok" }, { nama: "Sukabumi" }, { nama: "Tasikmalaya" }],
	});
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
