import { loadImage } from "canvas";
import ImageGenerator from "./ImageGenerator";
import images from "./images";

export default class SignalGenerator extends ImageGenerator {
  private readonly currency: string;

  private mode: "sell" | "buy" | "neutral" | "strong_sell" | "strong_buy";

  constructor(currency: string, mode: "sell" | "buy" | "neutral" | "strong_sell" | "strong_buy") {
    super();
		this.currency = currency;
    this.mode = mode;
  }

  protected generate(): Promise<Buffer> {
    const { drawBackground } = this;
    (async () => drawBackground(this.context))();
    return this.drawGraphic().then(() => {
      this.drawCurrency();
      return this.canvas.toBuffer("image/png");
    });
  }

  private async drawBackground(context: typeof this.context) {
    return loadImage(images.background).then((background) => {
      context.drawImage(background, 0, 0, 1920, 1080);
    });
  }

  private drawGraphic() {
    return loadImage(images.graphics[this.mode]).then((graphic) => {
      this.context.drawImage(graphic, 260, 500, 1400, 600);
    });
  }

  private drawCurrency() {
    this.context.font = "150px \"SpaceGrotesk\" semi-bold";
    this.context.fillStyle = "#F3CC30";
    this.context.fillText(this.currency, 180, 280);
  }
}
