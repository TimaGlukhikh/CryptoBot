const generateImage = require('/Users/timagl/Downloads/CryptoBotGrapichs/src/index.js')
generateImage(currency, graphics)

const imgBuffer = canvas.toBuffer('image/png');
fs.writeFileSync('/Users/timagl/Downloads/CryptoBotGrapichs/results/drawnImage.png', imgBuffer)