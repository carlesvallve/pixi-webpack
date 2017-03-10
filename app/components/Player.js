import pubsub             from 'pubsub-js'
import { Directions }     from './enums'
import { rectangle }      from './utils'

export class Player extends PIXI.Container {

  constructor(props) {
    super()
    pubsub.subscribe('render', this.render.bind(this));
    this.props = props

    this.x = props.x
    this.y = props.y
    this.color = props.color
    this.direction = Directions.S

    this.shadow = this.addChild(this.setAnimation('shadow'))
    this.sprite = this.addChild(this.setAnimation(this.color))

    this.logFrames()

    //console.log('initializing player', this)
  }

  setAnimation(color) {
    // create an array of textures from an image path
    this.frames = { N: [], NE:[], E:[], SE:[], S:[], SW:[], W:[], NW:[] }
    //let player = {}

    //const container = new PIXI.Container();
    //container.animations = {}

    //const direction = Directions.N

    //console.log('>>>',color)

    for (var key in this.frames) {
      for (let i = 1; i <= 8; i++) {
        //var val = i < 10 ? '0' + i : i;
        // magically works since the spritesheet was loaded with the pixi loader
        this.frames[key].push(
          PIXI.Texture.fromFrame('player_' + color + '_run_' + this.direction + '_' + i + '.png')
        )
      }
    }

    const anim = new PIXI.extras.AnimatedSprite(this.frames[this.direction])
    anim.visible = true
    //anim.position.set(0, 0)
    anim.anchor.set(0.5)
    anim.animationSpeed = 0.25
    anim.loop = true
    //anim.tint = 0x66ff66
    //anim.currentFrame
    //onComplete = () => {}
    //onFrameChange= () => {}
    anim.play()
    //anim.stop(
    //anim.gotoAndPlay(frameNum)
    //anim.gotoAndStop(frameNum)

    //container.animations[direction] = anim
    //container.addChild(anim);

    //this.frames = frames



    return anim //container
  }

  logFrames() {
    console.log(this.frames[this.direction])
    for (let i = 0; i < this.frames[this.direction].lengh; i++) {
      console.log(this.frames[this.direction][i])
    }
  }

  move(direction) {
    if (direction === this.direction) { return }

    this.direction = direction

    this.removeChild(this.shadow)
    this.shadow = this.addChild(this.setAnimation('shadow'))

    this.removeChild(this.sprite)
    this.sprite = this.addChild(this.setAnimation(this.color))

    //this.shadow.play()
    //this.sprite.play()
    //console.log('player move', this.sprite, this.anim)
  }

  stop(direction) {
    this.direction = direction
    this.shadow.gotoAndStop(0)
    this.sprite.gotoAndStop(0)

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

  render() {
    //this.sprite = this.generatePlayerSprite(this.color, this.direction)
    //this.shadow = this.generatePlayerSprite('shadow', this.direction)
    // this.updateAnimation(this.shadow, this.direction, 'shadow')
    // this.updateAnimation(this.sprite, this.direction, this.color)
  }
}

export default Player
