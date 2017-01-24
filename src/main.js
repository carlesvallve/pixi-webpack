import * as PIXI from 'pixi.js';
//import audio from 'pixi-audio.js'
import { setRenderer, setStage, setBunny } from './modules/renderer.js'
import { randomInt } from './modules/utils.js'

const renderer = setRenderer()
const stage = setStage()
const bunny = setBunny(stage)

// PIXI.loader
// .add("assets/tilesets/terrain-tiles.png")
// .load(setGrid)
//
// function setGrid() {
  //Create the `tileset` sprite from the texture
  var texture = PIXI.Texture.fromImage("assets/tilesets/terrain-tiles.png") //.baseTexture;

  //Create a rectangle object that defines the position and
  //size of the sub-image you want to extract from the texture
  var rects = [
    new PIXI.Rectangle(0, 0, 40, 40),
    new PIXI.Rectangle(40, 0, 40, 40),
    new PIXI.Rectangle(80, 0, 40, 40),
    new PIXI.Rectangle(0, 40, 40, 40),
    new PIXI.Rectangle(40, 40, 40, 40)
  ]

  console.log(PIXI.audioManager)

  const width = 7
  const height = 7
  const tiles = []

  const grid = new PIXI.Container();
  grid.position.set(30, 30)
  stage.addChild(grid);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      //var textureCache = PIXI.utils.TextureCache["assets/tilesets/terrain-tiles.png"];
      var rect = rects[randomInt(0, rects.length - 1)]
      var tempTexture = new PIXI.Texture(texture, rect);
      //var textureCache = PIXI.TextureCache[(i*8)+j] = tempTexture;

      //Tell the texture to use that rectangular section

      //tempTexture.frame = rects[r]

      //console.log(x, y, '->', tempTexture.frame)

      //Create the sprite from the texture
      var tile = new PIXI.Sprite(tempTexture);
      tile.anchor.set(0.5, 0.5)
      tile.position.set(x * 36, y * 34)
      tile.rotation = 0.95 //[0, 90, 180][randomInt(0, 3)]

      //Add the tile to the stage
      grid.addChild(tile);

      tiles.push(tile)
      //renderer.render(stage);
    }
  }



//}


// render loop

function animate() {
    for (let i = 0; i < tiles.length; i++) {
      tiles[i].rotation += 0.01
    }
    bunny.rotation += 0.01;
    renderer.render(stage);
    requestAnimationFrame(animate);
}
animate();
