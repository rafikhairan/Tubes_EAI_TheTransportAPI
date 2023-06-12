const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { hashPassword } = require("../src/utils/bcrypt");

async function main() {
	await prisma.kota.createMany({
		data: [{ nama: "Bandung" }, { nama: "Cimahi" }, { nama: "Depok" }, { nama: "Sukabumi" }, { nama: "Tasikmalaya" }],
	});

	await prisma.user.create({
		data: {
			email: "admin@gmail.com",
			password: await hashPassword("password"),
			isAdmin: true,
		},
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
