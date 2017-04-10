import pubsub from 'pubsub-js'
import Audio from './Audio'


export class Player extends PIXI.Container {
  constructor(props) {
    super()
    this.props = props

    // subscribe to game events
    pubsub.subscribe('render', this.render.bind(this))
    pubsub.subscribe('keyDown', this.keyDown.bind(this))
    pubsub.subscribe('touchStart', this.touchStart.bind(this))
    pubsub.subscribe('collision', this.onCollision.bind(this))

    // create player sprite
    const { id, x, y, w, h } = this.props
    this.setSprite(id, w, h)
    this.position.set(x, y)
    this.centerX = x
    this.centerY = y

    // g0.5 ------- 28
    // g1 --------- y

    // initialize gravity and velocity
    this.gravity = 0.75 // 0.5 // 1
    this.impulse = 24 //28 // 20
    this.vx = 0
    this.vy = (Math.random() * +10) + 5

    // initialize track number
    this.trackNum = 1
  }

  setSprite(id, w, h) {
    const texture = PIXI.Texture.fromImage(id)
    this.sprite = new PIXI.Sprite(texture)
    this.sprite.anchor.set(0.5, 0.5)
    this.sprite.width = w
    this.sprite.height = h
    this.sprite.tint = this.props.color

    const blurFilter = new PIXI.filters.BlurFilter()
    blurFilter.blur = 0.5
    this.sprite.filters = [blurFilter]

    this.addChild(this.sprite)
  }

  keyDown(e, key) {
    if (key === 37) { this.changeTrack(-1) }
    if (key === 39) { this.changeTrack(1)  }
  }

  touchStart(e, params) {
    const x = params.touches[0].pageX
    const y = params.touches[0].pageY
    const dx = (x - this.x)
    if (Math.abs(dx) > 10) {
      this.changeTrack(Math.sign(dx))
    }
  }

  changeTrack(d) {
    this.trackNum += d
    if (this.trackNum < 0) { this.trackNum = 0; return }
    if (this.trackNum > 2) { this.trackNum = 2; return }
    Audio.play(Audio.sfx.bass, 1, [0.5, 0.75], false)
  }

  onCollision(e, params) {
    //console.log('!', e, params)
    Audio.play(Audio.sfx.drop, 1, [0.5, 0.75], false)
  }


  render() {
    // update horizontal movement depending on track
    const w = this.props.trackW
    const x = this.centerX - w + this.trackNum * w
    this.vx = (x - this.x) / 3

    // add gravity to velocity on y axis
    this.vy += this.gravity;

    // update position
    this.position.set(
      this.x += this.vx,
      this.y += this.vy
    )

    // check for rebound at floor level
    const floorY = this.props.floorY - this.props.h / 2
    if (this.y + this.vy >= floorY) {
      this.y = floorY
      this.vy = this.impulse * -this.gravity
      pubsub.publish('collision', { track: this.trackNum })
    } else {
      // update rotation
      this.sprite.rotation -= 0.1
    }
  }
}

export default Player
