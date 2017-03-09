import * as PIXI from 'pixi.js';
//import audio from 'pixi-audio.js'
import { setRenderer, setStage, setBunny } from './modules/renderer.js'
import { randomInt } from './modules/utils.js'
import { keyboard } from './modules/Keyboard.js'

import Tilesets from './modules/Tilesets'
import Player from './modules/Player'
import { Directions } from './modules/enums'

//const app = new PIXI.Application();
//document.body.appendChild(app.view);

const app = {
  renderer: setRenderer(),
  stage: setStage()
}

let player = null


const tilesets = new Tilesets((sprites) => {
  console.log('received callback in main after all tilesets loaded', sprites)
  //setPlayerAnim(sprites.playerShadow.N)
  //setPlayerAnim(sprites.playerRed.N)

  //setPlayer(sprites.playerRed)
  player = new Player('red')
  player.x = app.renderer.width / 2
  player.y = app.renderer.height / 2
  app.stage.addChild(player)

  console.log('Player:', player)

})

// const setPlayer = (player) => {
//   player.x = app.renderer.width / 2
//   player.y = app.renderer.height / 2
//   //player.anchor.set(0.5)
//   //anim.animationSpeed = 0.25
//   //anim.tint = 0x66ff66
//   app.stage.addChild(player);
// }


// const setPlayerAnim = (anim) => {
//   anim.x = app.renderer.width / 2
//   anim.y = app.renderer.height / 2
//   anim.anchor.set(0.5)
//   anim.animationSpeed = 0.25
//   //anim.tint = 0x66ff66
//   //anim.loop
//   //anim.currentFrame
//   //onComplete = () => {}
//   //onFrameChange = () => {}
//
//   anim.play()
//   //anim.stop()
//   //anim.gotoAndPlay(frameNum)
//   //anim.gotoAndStop(frameNum)
//
//
//
//   app.stage.addChild(anim);
// }




const setKeyboardInteraction = () => {
  // 37: left 38: up 39: right 40: down
  //var keyObject = keyboard(37);
  keyboard(37).press = () => { player.move(Directions.W) }
  keyboard(38).press = () => { player.move(Directions.N) }
  keyboard(39).press = () => { player.move(Directions.E) }
  keyboard(40).press = () => { player.move(Directions.S) }

  keyboard(37).release = () => { player.stop(Directions.W) }
  keyboard(38).release = () => { player.stop(Directions.N) }
  keyboard(39).release = () => { player.stop(Directions.E) }
  keyboard(40).release = () => { player.stop(Directions.S) }

  // keyObject.release = () => {
  //   //key object released
  // }
}


// render loop

function animate() {
    if (player !== null) {
      player.update()
    }
    // for (let i = 0; i < tiles.length; i++) {
    //   tiles[i].rotation += 0.01
    // }
    // bunny.rotation += 0.01;
    setKeyboardInteraction()

    app.renderer.render(app.stage)
    requestAnimationFrame(animate)
}
animate();











// PIXI.loader
// .add("assets/tilesets/terrain-tiles.png")
// .load(setGrid)

function setGrid() {
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
}
