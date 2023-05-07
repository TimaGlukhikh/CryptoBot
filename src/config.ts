// eslint-disable-next-line @typescript-eslint/no-var-requires,import/no-extraneous-dependencies
require("dotenv").config({ path: `${__dirname}/../.env` });

export default {
	server: {
		port: process.env.PORT || 3000,
	},
	aws: {
		region: process.env.AWS_REGION || "eu-central-1",
		bucket: process.env.AWS_BUCKET || "cryptobot1337",
		credentials: {
			accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
			secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
		},
	},
};
