import { Canvas, CanvasRenderingContext2D } from "canvas";
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import * as fs from "fs";
import config from "./config";

export default abstract class ImageGenerator {
	protected canvas: Canvas;

	protected context: CanvasRenderingContext2D;

	protected path = `results`;

	protected abstract generate(): Promise<Buffer>;

	protected constructor() {
		this.canvas = this.createCanvas();
		this.context = this.createContext();
	}

	protected createCanvas(): Canvas {
		return new Canvas(1920, 1080, "image");
	}

	protected createContext(): CanvasRenderingContext2D {
		return this.canvas.getContext("2d");
	}

	public saveToS3(): Promise<string> {
		const name = this.generateName();

		return this.generate().then(async (buffer) => {
			// eslint-disable-next-line no-new
			await new Upload({
				client: new S3Client({
					credentials: config.aws.credentials,
					region: config.aws.region,
				}),
				params: {
					Bucket: config.aws.bucket,
					Key: `${this.path}/${name}`,
					Body: buffer,
				},
			}).done();

			return `${this.path}/${name}`;
		});
	}

	public saveLocally(): Promise<string> {
		return this.generate().then((buffer) => {
			const path = `${__dirname}/../results/${this.generateName()}`;
			fs.writeFileSync(path, buffer);
			return path;
		});
	}

	protected generateName(): string {
		const date = new Date();
		return `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}:${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}.png`;
	}
}
