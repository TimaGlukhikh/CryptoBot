const fs = require("fs");
const { loadImage, registerFont, Canvas } = require("canvas");
require("path");

registerFont("./assets/SpaceGrotesk-Bold.ttf", { family: "SpaceGrotesk-Bold" });
registerFont("./assets/SpaceGrotesk-SemiBold.ttf", { family: "SpaceGrotesk-SemiBold" });

const forecastDate = {
	date_now: "00.00.0000",
};

const currencyForecast = {
	currency_name: "BTC",
};

const forecast = {
	forecast_meaning: "000",
};

const forecastUpper = {
	upper_meaning: "000 ",
};

const forecastLower = {
	lower_meaning: "000",
};

const generateForecast = async (currencyForecast, forecast, forecastUpper, forecastLower, forecastDate) => {
	const canvas = new Canvas(1920, 1080, "image");
	const context = canvas.getContext("2d");

	const background = await loadImage("./assets/background.jpg");

	context.drawImage(background, 0, 0, 1920, 1080);

	context.font = '200px "SpaceGrotesk-SemiBold"';
	context.fillStyle = "#F3CC30";
	context.fillText(currencyForecast, 150, 300);

	context.font = '100px "SpaceGrotesk-Bold"';
	context.fillStyle = "#FFFFFF";
	context.fillText(forecast, 1000, 500);
	context.fillText(forecastUpper, 1000, 650);
	context.fillText(forecastLower, 1000, 800);
	context.fillText(forecastDate, 1250, 950);

	context.font = '100px "SpaceGrotesk-Bold"';
	context.fillStyle = "#FFFFFF";
	context.fillText("Forecast:", 150, 500);
	context.fillText("Forecast Upper:", 150, 650);
	context.fillText("Forecast Lower:", 150, 800);
	context.fillText("Forecast Date:", 150, 950);

	const imgBuffer = canvas.toBuffer("image/png");
	fs.writeFileSync("./results/portfolioImage.png", imgBuffer);

	return "/Users/timagl/Downloads/CryptoBotGrapichs/results/portfolioImage.png";
};

module.exports = generateForecast;
