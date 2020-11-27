const express = require("express");
const HttpError = require("../utils/HttpError");
const { default: Axios } = require("axios");

const route = express.Router();

route.route("/").get(async (req, res, next) => {
	let response;
	try {
		response = await Axios.get(
			`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`
		);
	} catch (error) {
		const err = new HttpError("Something error", 500);
		return next(err);
	}

	res.json(response.data);
});

module.exports = route;
