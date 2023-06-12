const getBookingBundle = async (req, res) => {
	try {
		const response = await fetch("https://tourism-api-production.up.railway.app/booking_bundle");
		const result = await response.json();
		res.status(200).json({
			result,
		});
	} catch (error) {
		res.status(500).json({
			error: error.message,
		});
	}
};

const postKendaraan = async (req, res) => {
	const data = {
		...req.body,
	};
	try {
		const response = await fetch(`https://tourism-api-production.up.railway.app/booking_bundle/${req.body.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		const result = await response.json();
		res.status(201).json({
			message: result.message,
		});
	} catch {
		res.status(500).json({
			message: error.message,
		});
	}
};

module.exports = {
	getBookingBundle,
	postKendaraan,
};
