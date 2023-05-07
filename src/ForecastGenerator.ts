import { loadImage } from "canvas";
import ImageGenerator from "./ImageGenerator";
import images from "./images";

export default class ForecastGenerator extends ImageGenerator {
	private readonly currency: string;

	private readonly forecast: number;

	private readonly forecastUpper: number;

	private readonly forecastLower: number;

	private readonly forecastDate: string;

	constructor(
		currency: string,
		forecast: number,
		forecastUpper: number,
		forecastLower: number,
		forecastDate: string
	) {
		super();
		this.currency = currency;
		this.forecast = forecast;
		this.forecastUpper = forecastUpper;
		this.forecastLower = forecastLower;
		this.forecastDate = forecastDate;
	}

	protected generate() {
		return this.drawBackground().then(() => {
			this.drawCurrency();
			this.drawForecast();

			return this.canvas.toBuffer("image/png");
		});
	}

	private drawBackground() {
		return loadImage(images.background).then((background) => {
			this.context.drawImage(background, 0, 0, 1920, 1080);
		});
	}

	private drawCurrency() {
		this.context.font = '200px "SpaceGrotesk" semi-bold';
		this.context.fillStyle = "#F3CC30";
		this.context.fillText(this.currency, 150, 300);
	}

	private drawForecast() {
		this.context.font = '100px "SpaceGrotesk" bold';

		this.context.fillText("Forecast:", 150, 500);
		this.context.fillText(`${String(this.forecast)}$`, 1000, 500);

		this.context.fillText("Forecast Upper:", 150, 650);
		this.context.fillText(`${String(this.forecastUpper)}$`, 1000, 650);

		this.context.fillText("Forecast Lower:", 150, 800);
		this.context.fillText(`${String(this.forecastLower)}$`, 1000, 800);

		this.context.fillText("Forecast Date:", 150, 950);
		this.context.fillText(this.forecastDate, 1000, 950);
	}
}
