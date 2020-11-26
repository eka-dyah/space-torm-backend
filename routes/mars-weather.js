const express = require("express");
const { default: Axios } = require("axios");
const HttpError = require("../../weather-backend/models/http-error");

const route = express.Router();

route.route("/").get(async (req, res, next) => {
	let response;

	try {
		response = await Axios.get(
			`https://api.nasa.gov/insight_weather/?api_key=${process.env.NASA_API_KEY}&feedtype=json&ver=1.0`
		);
	} catch (error) {
		return next(new HttpError("Something Error", 500));
	}
	
	res.json(response.data);
});

module.exports = route;
