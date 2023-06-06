const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getUser = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await prisma.user.findFirst({
			where: {
				password: "password",
			},
			select: {
				emasil: true,
				password: true,
			},
		});
		res.status(200).json({
			data: user,
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

module.exports = {
	getUser,
};
