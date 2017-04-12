import { randomInt } from './random'

export const gradientRadial = (w, h, radius = 480) => {
  var canvas = document.createElement('canvas');
  canvas.width  = w
  canvas.height = h

  var context = canvas.getContext('2d');
  var grad = context.createRadialGradient(w/2,h/2,0,w/2,h/2, radius);
  grad.addColorStop(0, 'rgba(0,0,0,0)');
  grad.addColorStop(1, 'rgba(0,0,0,1)');

  context.setTransform(1,0,0,1,0,0);
  context.fillStyle = grad;
  context.fillRect(0, 0, w, h)

  return PIXI.Texture.fromCanvas(canvas)
}

export const randomColorFromPalette = () => {
  const colors = [0xFF0000, 0x00FF00, 0x0000FF, 0xFFFFFF, 0xFFFFFF, 0xFFFFFF, 0x333333, 0xCCCCCC, 0x00FFFF, 0xFFFF00, 0xFF00FF]
  const color = colors[randomInt(0, colors.length - 1)]
  return color
}

export const randomColor = (oldColor = null) => {
  // set random rgb color
  const rgb = {
    r: parseInt(Math.random() * 256, 10),
    g: parseInt(Math.random() * 256, 10),
    b: parseInt(Math.random() * 256, 10)
  }

  // const rgb = {
  //   r: parseInt(128 + Math.random() * 128, 10),
  //   g: parseInt(128 +Math.random() * 128, 10),
  //   b: parseInt(128 +Math.random() * 128, 10)
  // }

  // mix the color with given old one
  if (oldColor !== undefined) {
    oldColor = intToRgb(oldColor)
    rgb.r += oldColor.r / 2
    rgb.g += oldColor.g / 2
    rgb.b += oldColor.b / 2
  }

  // convert back to hex color
  const color = rgbToInt(rgb)
  return color;
}

export const intToRgb = (color) => {
  const rgb = {
    r: 0xff & color,
    g: (0xff00 & color) >> 8,
    b: (0xff0000 & color) >> 16
  }
  return rgb
}

export const rgbToInt = (rgb) => {
  const color = rgb.r | rgb.g << 8 | rgb.b << 16
  return color
}

export const colorInterpolation = (colorStart, colorEnd, speed) => {
  let from = intToRgb(colorStart)
  const to = intToRgb(colorEnd)

  const inc = {
    r: (to.r - from.r) / speed,
    g: (to.g - from.g) / speed,
    b: (to.b - from.b) / speed
  }

  from.r += inc.r
  from.g += inc.g
  from.b += inc.b

  const color = rgbToInt(from)

  return color
}
