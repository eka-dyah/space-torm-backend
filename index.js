const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const HttpError = require("../weather-backend/models/http-error");

const app = express();

const apod = require("./routes/apod");
const marsWeather = require("./routes/mars-weather");

app.use(bodyParser.json());
app.use(logger("dev"));

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Credentials", true);
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, OPTIONS, PUT, PATCH, DELETE"
	);
	next();
});

app.use("/apod", apod);
app.use("/mars-weather", marsWeather);

app.use((req, res, next) => {
	const error = new HttpError("Not Found", 404);
	throw error;
});

app.use((error, req, res, next) => {
	res.status(error.code || 500).json({
		error: error.message || "An error has occured",
		code: error.code || 500,
	});
});

app.listen(process.env.PORT || 5000);
