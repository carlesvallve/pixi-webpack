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

    this.state = { action: Actions.run }

    console.log('Player', this)

    this.shadow = this.addChild(this.setAnimations('shadow'))
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
    anim.animationSpeed = 0.25
    anim.loop = true
    anim.visible = false
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

  move(direction) {
    this.direction = direction
    this.state.action = Actions.run
    this.updateAnimation(this.shadow, this.direction)
    this.updateAnimation(this.sprite, this.direction)
  }


  stop(direction) {
    this.state.action = Actions.idle
    this.updateAnimation(this.shadow, this.direction)
    this.updateAnimation(this.sprite, this.direction)
  }

  updateAnimation(sprite, direction) {
    for (var key in sprite.animation) {
      if (key === direction) {
        // show and play current animation
        sprite.animation[key].visible = true
        if (this.state.action === Actions.idle) {
          sprite.animation[key].gotoAndStop(0)
        } else {
          sprite.animation[key].play()
        }
      } else {
        // hide and stop other animations
        sprite.animation[key].visible = false
        sprite.animation[key].gotoAndStop(0)
      }
    }
  }

  render() {
  }
}

export default Player
