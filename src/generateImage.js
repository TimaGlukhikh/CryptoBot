const fs = require("fs");
const { loadImage, registerFont, Canvas } = require("canvas");
require("path");

registerFont("./assets/SpaceGrotesk-Bold.ttf", { family: "SpaceGrotesk-Bold" });
registerFont("./assets/SpaceGrotesk-SemiBold.ttf", { family: "SpaceGrotesk-SemiBold" });

const dateNow = new Date();

const graphicNeutral = {
	image: "./assets/graphicneutral.svg",
	options: [260, 500, 1400, 600],
	nameOfGraphic: ["graphic_neutral", dateNow],
};

const graphicSell = {
	image: "./assets/graphicsell.svg",
	options: [260, 500, 1400, 600],
	nameOfGraphic: ["graphic_sell", dateNow],
};

const graphicBuy = {
	image: "./assets/graphicbuy.svg",
	options: [260, 500, 1400, 600],
	nameOfGraphic: ["graphic_buy", dateNow],
};

const availableGraphics = { graphicNeutral, graphicBuy, graphicSell };

const currency = {
	currency_name: "BTC",
};

const generateImage = async (currency, graphics) => {
	const canvas = new Canvas(1920, 1080, "image");
	const context = canvas.getContext("2d");

	const background = await loadImage("./assets/background.jpg");

	context.drawImage(background, 0, 0, 1920, 1080);

	console.log(availableGraphics[graphics]);

	const currentGraphic = availableGraphics[graphics];
	const image = await loadImage(currentGraphic.image);
	context.drawImage(image, ...currentGraphic.options);

	context.font = '150px "SpaceGrotesk-SemiBold"';
	context.fillStyle = "#F3CC30";
	context.fillText(currency, 180, 280);

	const imgBuffer = canvas.toBuffer("image/png");
	fs.writeFileSync("./results/drawnImag.png", imgBuffer);

	return "/Users/timagl/Downloads/CryptoBotGrapichs/results/drawnImag.png";
};

module.exports = generateImage;
