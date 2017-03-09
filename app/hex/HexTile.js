import pubsub from 'pubsub-js'

const HexTile = (parent, x, y) => {
  //const offset = -((mapsize_x / 2) * 40);

  //const hex_x = (x * 43) + (y * 43);
  //const hex_y = (x * -43 / 1.5) + (y * 43 / 1.5);
  //const hex_y = (x * -20)+(y * 20)// - offset ;

  const tileW = 64
  const tileH = 64

  const hex_x = ((x * tileW) + (y * tileW)) / 1.3333
  const hex_y = ((-x * tileH) + (y * tileH)) / 2

  const texture = PIXI.Texture.fromImage('assets/img/hex01.png')
  const sprite = new PIXI.Sprite(texture)
  sprite.anchor.x = 0.5
  sprite.anchor.y = 0.5
  sprite.position.x = hex_x
  sprite.position.y = hex_y
  sprite.width = tileW - 2
  sprite.height= tileH - 2 //40
  parent.addChild(sprite)


  // var textOptions = {
  //   font: &amp;amp;amp;quot;bold 64px Roboto&amp;amp;amp;quot;, // Set style, size and font
  //   fill: '#3498db', // Set fill color to blue
  //   align: 'center', // Center align the text, since it's multiline
  //   stroke: '#34495e', // Set stroke color to a dark blue-gray color
  //   strokeThickness: 20, // Set stroke thickness to 20
  //   lineJoin: 'round' // Set the lineJoin to round instead of 'miter'
  // }

  var text = new PIXI.Text(x +',' + y, {font:'14px Arial', fill:'white'})
  text.anchor.x = 0.5
  text.anchor.y = 0.5
  text.position.x = hex_x
  text.position.y = hex_y
  parent.addChild(text)
}

export default HexTile
