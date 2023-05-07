import { registerFont } from "canvas";

type Fonts = {
	[x: string]: {
		[y: string]: {
			path: string;
		};
	};
};

const fonts: Fonts = {
	SpaceGrotesk: {
		bold: {
			path: `${__dirname}/../assets/fonts/SpaceGrotesk-Bold.ttf`,
		},
		"semi-bold": {
			path: `${__dirname}/../assets/fonts/SpaceGrotesk-SemiBold.ttf`,
		},
	},
};

export default fonts;

export function registerFonts() {
	Object.keys(fonts).forEach((family) => {
		Object.keys(fonts[family]).forEach((weight) => {
			registerFont(fonts[family][weight].path, { family, weight });
		});
	});
}
