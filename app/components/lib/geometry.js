import Vector from './vector.js'
import { randomInt } from './random'

export const getVector = (pos1, pos2) => {
  const x = pos2.x - pos1.x
  const y = pos2.y - pos1.y
  return new Vector(x, y)
}


export const getDistance = (pos1, pos2) => {
  const vector = getVector(pos1, pos2)
  return vector.length()
}


export const getBounds = (rect) => {
  const bounds = rect.getLocalBounds()

  return {
    left: rect.position.x,
    right: rect.position.x + bounds.width,
    top: rect.position.y,
    bottom: rect.position.y + bounds.height
  }
}


export const getRandomPointInRadius = (point, radius, onlyHorizontal = false) => {
  //var pt_angle = Math.random() * 2 * Math.PI;
  //var pt_radius_sq = Math.random() * radius * radius;
  //var pt_x = Math.sqrt(pt_radius_sq) * Math.cos(pt_angle);
  //var pt_y = Math.sqrt(pt_radius_sq) * Math.sin(pt_angle);

  // You can avoid square / squareRoot
  const pt_angle = Math.random() * 2 * Math.PI;
  const r =randomInt(16, radius) // * radius
  const x = point.x + r * Math.cos(pt_angle);
  const y = point.y + r * Math.sin(pt_angle);

  return new Vector(x, onlyHorizontal ? point.y : y)
}

/**
 * create a 100x100 white rectangle with a 10px black border at position 10,10
 * this.addChild(rectangle(0, 0, 10, 10, 0xFFFFFF, 0x000000, 1));
 */
export const rectangle = (x, y, width, height, backgroundColor, borderColor, borderWidth, blendMode = null) => {
  var box = new PIXI.Graphics();

  box.beginFill(backgroundColor);
  box.lineStyle(borderWidth , borderColor);
  box.drawRect(0, 0, width - borderWidth, height - borderWidth);
  box.endFill();
  box.position.x = x + borderWidth/2;
  box.position.y = y + borderWidth/2;

  if (blendMode) {
    box.blendMode = blendMode //PIXI.blendModes.ADD
  }

  return box;
}
