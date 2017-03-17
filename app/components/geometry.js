//import PIXI.Vector from './vector.js'
require('./vector.js')

export const getVector = (pos1, pos2) => {
  const x = pos2.x - pos1.x
  const y = pos2.y - pos1.y
  return new PIXI.Vector(x, y) //{ x, y }
}

export const getDistance = (pos1, pos2) => {
  const vector = getVector(pos1, pos2)
  return vector.length()
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

export const getBounds = (rect) => {
  const bounds = rect.getLocalBounds()

  return {
    left: rect.position.x,
    right: rect.position.x + bounds.width,
    top: rect.position.y,
    bottom: rect.position.y + bounds.height
  }
}
