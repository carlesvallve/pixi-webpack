import pubsub             from 'pubsub-js'
import { Directions, Actions }     from './enums'
import Audio from './Audio'

export class Player extends PIXI.Container {

  constructor(props) {
    super()
    pubsub.subscribe('render', this.render.bind(this));

    //this.scale.set(2, 2)
    this.x = props.x
    this.y = props.y
    this.color = props.color
    this.direction = Directions.S
    this.inc = { x: 0, y: 0 }
    this.speed = 2 + Math.random() * 1
    this.action = Actions.run

    this.shadows = {
      idle: this.addChild(this.setAnimations('shadow', 'run', 1, 1)),
      run: this.addChild(this.setAnimations('shadow', 'run', 1, 8)),
      kick: this.addChild(this.setAnimations('shadow', 'run', 2, 4)),
      fall: this.addChild(this.setAnimations('shadow', 'falling', 1, 3)),
      tackle: this.addChild(this.setAnimations('shadow', 'tacle', 1, 1)),
      throw: this.addChild(this.setAnimations('shadow', 'throwin', 1, 3))
    }

    this.sprites = {
      idle: this.addChild(this.setAnimations(this.color, 'run', 1, 1)),
      run: this.addChild(this.setAnimations(this.color, 'run', 1, 8)),
      kick: this.addChild(this.setAnimations(this.color, 'run', 2, 4)),
      fall: this.addChild(this.setAnimations(this.color, 'falling', 1, 3)),
      tackle: this.addChild(this.setAnimations(this.color, 'tacle', 1, 1)),
      throw: this.addChild(this.setAnimations(this.color, 'throwin', 1, 3))
    }

    console.log(this.sprites)
  }


  setAnimations(color, action, frameStart, frameEnd) {
    const container = new PIXI.Container()
    let frames = { N: [], NE:[], E:[], SE:[], S:[], SW:[], W:[], NW:[] }
    let animation = {}

    for (var direction in frames) {
      for (let i = frameStart; i <= frameEnd; i++) {
        // magically works since the spritesheet was loaded with the pixi loader
        frames[direction].push(PIXI.Texture.fromFrame(
          'player_' + color + '_' + action + '_' + direction + '_' + i + '.png'
        ))

        animation[direction] = this.setAnimation(frames[direction])
        container.addChild(animation[direction]);
      }
    }

    container.animation = animation
    container.alpha = color === 'shadow' ? 0.8 : 1
    return container
  }


  setAnimation(frames) {
    const anim = new PIXI.extras.AnimatedSprite(frames)
    anim.anchor.set(0.3, 0.5)
    anim.position.set(0, 0)
    anim.animationSpeed = 0.225 * this.speed
    anim.loop = true
    anim.visible = false
    anim.play()
    //anim.stop()
    //anim.tint = 0x66ff66
    //anim.loop
    //anim.currentFrame
    //onComplete = () => {}
    //onFrameChange = () => {}
    //anim.stop()
    //anim.gotoAndPlay(frameNum)
    //anim.gotoAndStop(frameNum)
    return anim
  }


  stop() {
    this.action = Actions.idle
    this.updateAnimation(this.shadows)
    this.updateAnimation(this.sprites)

    if (this.lastFrame !== 0) {
      Audio.play(Audio.sfx.step,
        0.2 + Math.random() * 0.2, // volume
        1.5 + Math.random() * 1.0  // speed
      )
      this.lastFrame = 0
    }
  }


  move(direction) {
    this.action = Actions.run
    this.direction = direction

    this.updateAnimation(this.shadows)
    this.updateAnimation(this.sprites)

    const inc = this.getIncrements()
    this.position.set(this.x + inc.x * this.speed, this.y + inc.y * this.speed)
    this.setStepSound()
  }


  getIncrements() {
    switch(this.direction){
      case Directions.N:  return { x: 0, y: -1 }
      case Directions.E:  return { x: 1, y: 0 }
      case Directions.S:  return { x: 0, y: 1 }
      case Directions.W:  return { x: -1, y: 0 }

      case Directions.NE: return { x: 1, y: -1 }
      case Directions.SE: return { x: 1, y: 1 }
      case Directions.SW: return { x: -1, y: 1 }
      case Directions.NW: return { x: -1, y: -1 }
    }

    return { x: 0, y: 0 }
  }


  setStepSound() {
    const anim = this.sprites[this.action].animation[this.direction]
    if (this.action === Actions.run) {
      if (anim.currentFrame === 2 || anim.currentFrame === 6) {
        if (this.lastFrame != anim.currentFrame) {
          Audio.play(Audio.sfx.step,
            0.2 + Math.random() * 0.2, // volume
            2.0 + Math.random() * 1.0  // speed
          )
          this.lastFrame = anim.currentFrame
        }
      }
    }
  }


  updateAnimation(sprites) {
    for( var action in sprites) {
      for (var direction in sprites[action].animation) {
        if (action === this.action && direction === this.direction) {
          sprites[action].animation[direction].visible = true
        } else {
          sprites[action].animation[direction].visible = false
        }
      }
    }
  }


  render() {
    // this.position.set(this.x + this.inc.x * this.speed, this.y + this.inc.y * this.speed)
    // this.setStepSound()
  }

}

export default Player
