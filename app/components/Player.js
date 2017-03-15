import pubsub from 'pubsub-js'
import Audio from './Audio'
import { Sides, Actions, Directions, DirectionVectors } from './enums'
import { getDistance } from './geometry'


export class Player extends PIXI.Container {

  constructor(props) {
    super()
    pubsub.subscribe('render', this.render.bind(this));

    this.position.set(props.x, props.y)

    this.app = props.app
    this.team = props.team
    this.color = this.team ? this.team.color : 'red'
    this.side = this.team ? this.team.side : Directions.N
    this.direction = this.side // === Directions.N ? Directions.S : Directions.N
    this.inc = { x: 0, y: 0 }
    this.speed = 2 + Math.random() * 1
    this.action = Actions.run

    this.shadows = {
      idle: this.app.world.addChildAt(this.setAnimations('shadow', 'run', 1, 1), 2),
      run: this.app.world.addChildAt(this.setAnimations('shadow', 'run', 1, 8), 2),
      kick: this.app.world.addChildAt(this.setAnimations('shadow', 'run', 2, 4), 2),
      fall: this.app.world.addChildAt(this.setAnimations('shadow', 'falling', 1, 3), 2),
      tackle: this.app.world.addChildAt(this.setAnimations('shadow', 'tacle', 1, 1), 2),
      throw: this.app.world.addChildAt(this.setAnimations('shadow', 'throwin', 1, 3), 2)
    }

    this.sprites = {
      idle: this.addChild(this.setAnimations(this.color, 'run', 1, 1)),
      run: this.addChild(this.setAnimations(this.color, 'run', 1, 8)),
      kick: this.addChild(this.setAnimations(this.color, 'run', 2, 4)),
      fall: this.addChild(this.setAnimations(this.color, 'falling', 1, 3)),
      tackle: this.addChild(this.setAnimations(this.color, 'tacle', 1, 1)),
      throw: this.addChild(this.setAnimations(this.color, 'throwin', 1, 3))
    }

    this.stop()
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

        animation[direction] = this.setAnimation(color, frames[direction])
        container.addChild(animation[direction]);
      }
    }

    container.animation = animation
    return container
  }


  setAnimation(id, frames) {
    const anim = new PIXI.extras.AnimatedSprite(frames)
    anim.scale.set(1)
    anim.anchor.set(0.3, 0.5)
    anim.animationSpeed = 0.225 * this.speed
    anim.loop = true
    anim.alpha = id === 'shadow' ? 0.8 : 1
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

    this.increments = { x: 0, y: 0 }

    // if (this.lastFrame !== 0) {
    //   Audio.play(Audio.sfx.step,
    //     0.2 + Math.random() * 0.2, // volume
    //     1.5 + Math.random() * 1.0  // speed
    //   )
    //   this.lastFrame = 0
    // }
  }


  move(direction) {
    this.action = Actions.run
    this.direction = direction

    const inc = DirectionVectors[this.direction]
    this.increments = { x: inc.x * this.speed, y: inc.y * this.speed }
    this.position.set(this.x + this.increments.x, this.y + this.increments.y)
    this.setStepSound()

    this.updateAnimation(this.shadows, true)
    this.updateAnimation(this.sprites)
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
    for (var action in sprites) {
      for (var direction in sprites[action].animation) {
        const animation = sprites[action].animation[direction]
        if (action === this.action && direction === this.direction) {
          if (animation.parent.parent !== this) {
            animation.position = this.position
          }
          animation.visible = true
        } else {
          animation.visible = false
        }
      }
    }
  }


  ballControl() {
    if (this !== this.app.player) { return }

    const ball = this.app.ball
    const dist = getDistance(this.position, this.app.ball.position)
    //console.log(dist)

    if (dist <= 16) {
      ball.setOwner(this)
    }
  }



  render() {

    this.ballControl()
    //console.log(d)

  }

}

export default Player
