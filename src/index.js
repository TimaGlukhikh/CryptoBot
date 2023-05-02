const express = require("express");

const app = express();

const generateForecast = require("./generateForecast.js");

app.use(express.json());
app.use(express.urlencoded());

app.post("/generate-forecast", async (req, res) => {
	const path = await generateForecast(
		req.body.currencyForecast,
		req.body.forecast,
		req.body.forecastUpper,
		req.body.forecastLower,
		req.body.forecastDate
	);
	res.sendFile(path);
});

const generateImage = require("./generateImage.js");

app.use(express.json());
app.use(express.urlencoded());

app.post("/generate-image", async (req, res) => {
	const path = await generateImage(req.body.currency, req.body.graphics);
	res.sendFile(path);
});

app.listen(3000, () => {
	console.log(`Example app listening on port ${3000}`);
});
