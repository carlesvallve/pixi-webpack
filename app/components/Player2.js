import { Directions } from './enums'

export class Player2 extends PIXI.Container {

  constructor(color) {
    super()

    this.color = color
    this.direction = Directions.N

    this.shadow = this.addChild(this.generatePlayerSprite('shadow', this.direction))
    this.sprite = this.addChild(this.generatePlayerSprite(color, this.direction))
  }

  generatePlayerSprite(color, direction) {
    // create an array of textures from an image path
    let frames = [] // N: [], NE:[], E:[], SE:[], S:[], SW:[], W:[], NW:[]
    //let player = {}

    //const container = new PIXI.Container();
    //container.animations = {}

  //  const direction = Directions.N

    //console.log('>>>',color)

    //for (var direction in frames) {
    for (let i = 1; i <= 8; i++) {
      //var val = i < 10 ? '0' + i : i;
      // magically works since the spritesheet was loaded with the pixi loader
      frames.push(
        PIXI.Texture.fromFrame('player_' + color + '_run_' + direction + '_' + i + '.png')
      )
    }
    //}

    const anim = new PIXI.extras.AnimatedSprite(frames)
    anim.visible = false
    //anim.position.set(0, 0)
    anim.anchor.set(0.5)
    anim.animationSpeed = 0.25
    anim.loop = true
    anim.tint = 0x66ff66
    anim.loop = true
    //anim.currentFrame
    //onComplete = () => {}
    //onFrameChange= () => {}
    anim.play()
    //anim.stop(
    //anim.gotoAndPlay(frameNum)
    //anim.gotoAndStop(frameNum)

    //container.animations[direction] = anim
    //container.addChild(anim);

    console.log(anim)

    this.addChild(anim)

    return anim //container
  }

  move(direction) {
    this.direction = direction
    this.shadow = this.generatePlayerSprite('shadow', this.direction)
    this.sprite = this.generatePlayerSprite(this.color, this.direction)
    //this.shadow.animations[direction].play()
    //this.sprite.animations[direction].play()
  }

  stop(direction) {
    this.direction = direction
    //this.shadow.animations[direction].gotoAndStop(0)
    //this.sprite.animations[direction].gotoAndStop(0)
  }

  //updateAnimation(sprite, direction, color) {
    //this.sprite = generatePlayerSprite(color, direction)
    //this.shadow = generatePlayerSprite('shadow', direction)
    // for (let i = 1; i <= 8; i++) {
    //   sprite = new PIXI.extras.AnimatedSprite(
    //     PIXI.Texture.fromFrame('player_' + color + '_run_' + direction + '_' + i + '.png')
    //   )
    // }
    // for (var key in sprite.animations) {
    //   if (key === direction) {
    //     sprite.animations[key].visible = true
    //   } else {
    //     sprite.animations[key].visible = false
    //     sprite.animations[key].stop()
    //   }
    // }
  //}

  update() {
    //this.sprite = this.generatePlayerSprite(this.color, this.direction)
    //this.shadow = this.generatePlayerSprite('shadow', this.direction)
    // this.updateAnimation(this.shadow, this.direction, 'shadow')
    // this.updateAnimation(this.sprite, this.direction, this.color)
  }
}

export default Player
