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




export const drawShapes = () => {
  // Initialize the pixi Graphics class
  var graphics = new PIXI.Graphics();

  // Draw a circle
  graphics.beginFill(0xe74c3c); // Set the fill color
  graphics.drawCircle(60, 185, 40); // drawCircle(x, y, radius)
  graphics.endFill(); // Applies fill to lines and shapes since the last call to beginFill.

  // Draw an ellipse
  graphics.beginFill(0x3498db); // Blue
  graphics.drawEllipse(170, 185, 45, 25); // drawEllipse(x, y, width, height)
  graphics.endFill();

  // Draw a rectangle
  graphics.beginFill(0x9b59b6); // Purple
  graphics.drawRect(240, 150, 75, 75); // drawRect(x, y, width, height)
  graphics.endFill();
  graphics.beginFill(0x2c3e50); // Dark blue-gray 'ish

  // Draw a rectangle with rounded corners
  graphics.beginFill(0x9b59b6); // Purple
  graphics.drawRoundedRect(350, 160, 75, 50, 10); // drawRoundedRect(x, y, width, height, radius)
  graphics.endFill();

  // Draw a triangle
  graphics.beginFill(0xff9900); // Purple
  graphics.moveTo(400, 60);
  graphics.lineTo(440, 140);
  graphics.lineTo(360, 140);
  graphics.endFill();

  // Draw a polygon to look like a star
  graphics.beginFill(0xf1c40f); // Yellow
  graphics.drawPolygon([550, 100, // Starting x, y coordinates for the star
                        570, 150, // Star is drawn in a clockwork motion
                        630, 155,
                        585, 195,
                        600, 250,
                        550, 220,
                        500, 250,
                        515, 195,
                        470, 155,
                        530, 150
                      ]);

  graphics.endFill();

  return graphics
}
