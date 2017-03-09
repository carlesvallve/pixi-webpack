/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
export const randomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
export const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


/**
 * create a 100x100 white rectangle with a 10px black border at position 10,10
 * this.addChild(rectangle(0, 0, 10, 10, 0xFFFFFF, 0x000000, 1));
 */
export const rectangle = (x, y, width, height, backgroundColor, borderColor, borderWidth) => {
  var box = new PIXI.Graphics();

  box.beginFill(backgroundColor);
  box.lineStyle(borderWidth , borderColor);
  box.drawRect(0, 0, width - borderWidth, height - borderWidth);
  box.endFill();
  box.position.x = x + borderWidth/2;
  box.position.y = y + borderWidth/2;

  return box;
}
