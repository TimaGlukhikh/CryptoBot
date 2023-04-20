const fs = require('fs');
const {
  createCanvas,
  loadImage,
  registerFont,
  Canvas,
} = require('canvas');
const { DatasetController } = require('chart.js');
const path = require('path');

registerFont('./assets/SpaceGrotesk-Bold.ttf', { family: 'SpaceGrotesk-Bold' });
registerFont('./assets/SpaceGrotesk-SemiBold.ttf', { family: 'SpaceGrotesk-SemiBold' });

const dateNow = new Date()




const graphic_neutral = {
  image: './assets/graphicneutral.svg',
  options: [260, 500, 1400, 600],
  nameOfGraphic: ['graphic_neutral', dateNow]
};

const graphic_sell = {
  image: './assets/graphicsell.svg',
  options: [260, 500, 1400, 600],
  nameOfGraphic: ['graphic_sell', dateNow]
};

const graphic_buy = {
  image: './assets/graphicbuy.svg',
  options: [260, 500, 1400, 600],
  nameOfGraphic: ['graphic_buy', dateNow]
};

const availableGraphics = {graphic_neutral, graphic_buy, graphic_sell};

const currency = {
  currency_name: 'BTC',
  font:'150px "SpaceGrotesk-SemiBold"',
  context_fillstyle: '#F3CC30',
  context_fillText: 'currency, 180, 280'
}


  const generateImage = async(currency, graphics) => {

  const canvas = new Canvas(1920, 1080, 'image');
  const context = canvas.getContext("2d");

  const background = await loadImage('./assets/background.jpg');

  context.drawImage(background, 0, 0, 1920, 1080)

  console.log(availableGraphics[graphics]);

  const currentGraphic = availableGraphics[graphics];
  const image = await loadImage(currentGraphic.image);
  context.drawImage(image, ...currentGraphic.options) //currentGraphic.nameOfgr)
  

                                   ////////////////

  //const graphic_neutral = await loadImage('/Users/timagl/Downloads/CryptoBotGrapichs/assets/graphicneutral.svg');
  //context.drawImage(graphic_neutral, 260, 500, 1400, 600)

  //const graphic_sell = await loadImage('/Users/timagl/Downloads/CryptoBotGrapichs/assets/graphicsell.svg');
  //context.drawImage(graphic_sell, 260, 500, 1400, 600)

  //const graphic_buy = await loadImage('/Users/timagl/Downloads/CryptoBotGrapichs/assets/graphicbuy.svg');
  //context.drawImage(graphic_buy, 260, 500, 1400, 600)

  context.font = '150px "SpaceGrotesk-SemiBold"'
  context.fillStyle = '#F3CC30'
  context.fillText(currency, 180, 280)
  
                                    /////////////////


  // const price_btc = "20,337$";
  // context.font = '150px "SpaceGrotesk-SemiBold"'
  // context.fillStyle = '#FFFFFF'
  // context.fillText(price_btc, 1160, 320)

  
  

  
  // context.font = '70px "SpaceGrotesk-Bold"'
  // context.fillStyle = '#FFFFFF'
  // context.fillText('current price:', 1250, 150)
  

  const imgBuffer = canvas.toBuffer('image/png');
  fs.writeFileSync('./results/drawnImage.png', imgBuffer)

  return '/Users/timagl/Downloads/CryptoBotGrapichs/results/drawnImage.png'

  }

module.exports = generateImage;





