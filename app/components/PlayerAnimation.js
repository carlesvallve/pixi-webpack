import pubsub      from 'pubsub-js'
import Audio       from './Audio'
import { Actions } from './enums'


export class PlayerAnimation extends PIXI.Container {

  constructor(props) {
    super()
    pubsub.subscribe('render', this.render.bind(this));

    this.game = props.player.game
    this.player = props.player

    this.shadows = {
      idle: this.game.background.addChild(this.setAnimations('shadow', 'run', 1, 1)),
      run: this.game.background.addChild(this.setAnimations('shadow', 'run', 1, 8)),
      kick: this.game.background.addChild(this.setAnimations('shadow', 'run', 2, 4)),
      fall: this.game.background.addChild(this.setAnimations('shadow', 'falling', 1, 3)),
      tackle: this.game.background.addChild(this.setAnimations('shadow', 'tacle', 1, 1)),
      throw: this.game.background.addChild(this.setAnimations('shadow', 'throwin', 1, 3))
    }

    this.sprites = {
      idle: this.addChild(this.setAnimations(this.player.color, 'run', 1, 1)),
      run: this.addChild(this.setAnimations(this.player.color, 'run', 1, 8)),
      kick: this.addChild(this.setAnimations(this.player.color, 'run', 2, 4)),
      fall: this.addChild(this.setAnimations(this.player.color, 'falling', 1, 3)),
      tackle: this.addChild(this.setAnimations(this.player.color, 'tacle', 1, 1)),
      throw: this.addChild(this.setAnimations(this.player.color, 'throwin', 1, 3))
    }

    this.updateAnimation(this.shadows)
    this.updateAnimation(this.sprites)
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
    anim.animationSpeed = 0.225 * this.player.speed
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


  updateAnimation(sprites) {
    for (var action in sprites) {
      for (var direction in sprites[action].animation) {
        const animation = sprites[action].animation[direction]

        if (action === this.player.action && direction === this.player.direction) {
          // show current animation sprite
          if (animation.parent.parent !== this) {
            animation.position = this.player.position
          }
          animation.visible = true
        } else {
          // hide other animation sprites
          animation.visible = false
        }
      }
    }
  }


  setStepSound() {
    const anim = this.sprites[this.player.action].animation[this.player.direction]
    if (this.lastFrame === anim.currentFrame) {
      return
    }

    if (this.player.action === Actions.run) {
      if (anim.currentFrame === 2 || anim.currentFrame === 6) {
        Audio.play(Audio.sfx.step,
          0.2 + Math.random() * 0.2, // volume
          2.0 + Math.random() * 1.0  // speed
        )
      } else if (this.player.action === Actions.idle) {
        if (anim.currentFrame === 0) {
          Audio.play(Audio.sfx.step,
            0.2 + Math.random() * 0.2, // volume
            2.0 + Math.random() * 1.0  // speed
          )
        }
      }
    }

    this.lastFrame = anim.currentFrame
  }


  render() {
    this.updateAnimation(this.shadows)
    this.updateAnimation(this.sprites)
    this.setStepSound()
  }

}

export default PlayerAnimation
