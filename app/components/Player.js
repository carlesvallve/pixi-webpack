import { Directions } from './enums'

export class Player extends PIXI.Container {

  constructor(color) {
    super()

    this.shadow = this.addChild(this.generatePlayerSprite('shadow'))
    this.sprite = this.addChild(this.generatePlayerSprite(color))

    this.direction = Directions.N

    console.log('sprite', this.animation)
  }

  generatePlayerSprite(color) {
    // create an array of textures from an image path
    let frames = { N: [], NE:[], E:[], SE:[], S:[], SW:[], W:[], NW:[] }
    let player = {}

    const container = new PIXI.Container();

    for (var key in frames) {
      for (let i = 1; i <= 8; i++) {
        //var val = i < 10 ? '0' + i : i;
        // magically works since the spritesheet was loaded with the pixi loader
        frames[key].push(PIXI.Texture.fromFrame('player_' + color + '_run_' + key + '_' + i + '.png'));

        const anim = new PIXI.extras.AnimatedSprite(frames[key])
        anim.visible = false
        anim.position.set(0, 0)
        anim.anchor.set(0.5)
        anim.animationSpeed = 0.25
        anim.loop = true
        //anim.tint = 0x66ff66
        //anim.loop
        //anim.currentFrame
        //onComplete = () => {}
        //onFrameChange = () => {}
        //anim.play()
        //anim.stop()
        //anim.gotoAndPlay(frameNum)
        //anim.gotoAndStop(frameNum)

        container.addChild(anim);
        player[key] = anim
      }
    }

    container.animation = player
    return container
  }

  move(direction) {
    this.direction = direction
    this.shadow.animation[direction].play()
    this.sprite.animation[direction].play()
  }

  stop(direction) {
    this.direction = direction
    this.shadow.animation[direction].gotoAndStop(0)
    this.sprite.animation[direction].gotoAndStop(0)
  }

  updateAnimation(sprite, direction) {
    for (var key in sprite.animation) {
      if (key === direction) {
        sprite.animation[key].visible = true
      } else {
        sprite.animation[key].visible = false
        sprite.animation[key].stop()
      }
    }
  }

  update() {
    this.updateAnimation(this.shadow, this.direction)
    this.updateAnimation(this.sprite, this.direction)
  }
}

export default Player
