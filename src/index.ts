import express from "express";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { body, validationResult } from "express-validator";
import { registerFonts } from "./fonts";
import ForecastGenerator from "./ForecastGenerator";
import config from "./config";
import SignalGenerator from "./SignalGenerator";
import images from "./images";
// eslint-disable-next-line @typescript-eslint/no-var-requires,import/no-extraneous-dependencies
require("dotenv").config({ path: `${__dirname}/../.env` });

registerFonts();

const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.post(
	"/generate-forecast",
	body("currency").notEmpty().isString(),
	body("forecast").notEmpty().isFloat(),
	body("forecastUpper").notEmpty().isFloat(),
	body("forecastLower").notEmpty().isFloat(),
	body("forecastDate").notEmpty().isDate(),
	async (req, res) => {
		if (!validationResult(req).isEmpty()) {
			return res.status(422).json({
				success: false,
				errors: validationResult(req).array(),
			});
		}

		const path = await new ForecastGenerator(
			req.body.currency,
			req.body.forecast,
			req.body.forecastUpper,
			req.body.forecastLower,
			req.body.forecastDate
		).saveToS3();
		const client = new S3Client({ credentials: config.aws.credentials, region: config.aws.region });
		const command = new GetObjectCommand({
			Bucket: config.aws.bucket,
			Key: path,
		});

		const url = await getSignedUrl(client, command, {
			expiresIn: 3600,
		});
		return res.json({
			success: true,
			data: url,
		});
	}
);

app.post(
	"/generate-signal",
	body("currency").notEmpty().isString(),
	body("mode").notEmpty().isIn(Object.keys(images.graphics)),
	async (req, res) => {
		if (!validationResult(req).isEmpty()) {
			return res.status(422).json({
				success: false,
				errors: validationResult(req).array(),
			});
		}

		const path = await new SignalGenerator(req.body.currency, req.body.mode).saveToS3();
		const client = new S3Client({ credentials: config.aws.credentials, region: config.aws.region });
		const command = new GetObjectCommand({
			Bucket: config.aws.bucket,
			Key: path,
		});

		const url = await getSignedUrl(client, command, {
			expiresIn: 3600,
		});
		return res.json({
			success: true,
			data: url,
		});
	}
);

app.listen(config.server.port, () => {
	console.log(`App listening on port ${config.server.port}`);
});
