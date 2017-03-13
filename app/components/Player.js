import pubsub             from 'pubsub-js'
import { Directions, Actions }     from './enums'

export class Player extends PIXI.Container {

  constructor(props) {
    super()
    pubsub.subscribe('render', this.render.bind(this));

    this.x = props.x
    this.y = props.y
    this.color = props.color
    this.direction = Directions.S
    this.inc = { x: 0, y: 0 }
    this.speed = 1 + Math.random() * 2
    this.state = { action: Actions.run }

    this.sfx = {
      step: PIXI.sound.Sound.from('/assets/audio/sfx/step/step.wav')
    }
    //sound.volume = 0.25
    //sound.loop = true
    //sound.play()

    this.shadow = this.addChild(this.setAnimations('shadow'))
    this.shadow .alpha = 0.8
    this.sprite = this.addChild(this.setAnimations(this.color))
  }

  setAnimations(color) {
    // create an array of textures from an image path
    let frames = { N: [], NE:[], E:[], SE:[], S:[], SW:[], W:[], NW:[] }
    let animation = {}

    const container = new PIXI.Container();

    for (var direction in frames) {
      for (let i = 1; i <= 8; i++) {
        //var val = i < 10 ? '0' + i : i;
        // magically works since the spritesheet was loaded with the pixi loader
        frames[direction].push(PIXI.Texture.fromFrame(
          'player_' + color + '_' + this.state.action + '_' + direction + '_' + i + '.png'
        ))
        animation[direction] = this.setAnimation(frames[direction])
        container.addChild(animation[direction]);
      }
    }


    container.animation = animation

    return container
  }

  setAnimation(frames) {
    const anim = new PIXI.extras.AnimatedSprite(frames)
    anim.anchor.set(0.5)
    anim.position.set(0, 0)
    anim.animationSpeed = 0.225 * this.speed //0.225
    anim.loop = true
    anim.visible = false
    //anim.alpha = 0.1
    anim.play()
    anim.stop()
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


  stop(direction) {
    this.state.action = Actions.idle
    this.updateAnimation(this.shadow, this.direction)
    this.updateAnimation(this.sprite, this.direction)

    this.inc = { x: 0, y: 0 }

    if (this.lastFrame !== 0) {
      this.playStepSound()
      this.lastFrame = 0
    }

  }


  move(direction) {
    this.direction = direction
    this.state.action = Actions.run

    this.updateAnimation(this.shadow, this.direction)
    this.updateAnimation(this.sprite, this.direction)

    this.inc = this.getIncrements(this.direction)
  }


  getIncrements(direction) {
    switch(direction){
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

  setStep() {
    const anim = this.sprite.animation[this.direction]
    if (anim.currentFrame === 2 || anim.currentFrame === 6) {
      if (this.lastFrame != anim.currentFrame) {
        this.playStepSound()
        this.lastFrame = anim.currentFrame
      }
    } else {
      this.position.set(this.x + this.inc.x * this.speed, this.y + this.inc.y * this.speed)
    }
  }

  playStepSound() {
    this.sfx.step.speed = 1.5 + Math.random() * 0.5
    this.sfx.step.volume = 0.2 + Math.random() * 0.2
    this.sfx.step.play()
  }


  updateAnimation(sprite, direction) {
    for (var key in sprite.animation) {
      if (this.state.action === Actions.idle) {
        sprite.animation[key].gotoAndStop(0)
      } else {
        sprite.animation[key].play()
      }

      sprite.animation[key].visible = key === direction
    }
  }


  render() {

    this.setStep()
  }

}

export default Player
