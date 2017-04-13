import pubsub from 'pubsub-js'
import { randomInt } from './lib/random'
import { PlayerStates } from'./States'
import { loadPlayerAssets, sfx } from './Assets'
import Audio from './lib/audio'
import Effects from './lib/effects'
import Explosion from './Explosion'


export class Player extends PIXI.Container {
  constructor(props) {
    super()
    this.props = props

    loadPlayerAssets((res) => {
      this.assets = res
      this.init(this.props.x, this.props.y)
    })
  }

  getRandomId() {
    const ids = Object.keys(this.assets)
    return ids[randomInt(0, ids.length - 1)]
  }

  init() {
    const id = this.getRandomId()

    // subscribe to game events
    pubsub.subscribe('render', this.render.bind(this))
    pubsub.subscribe('keyDown', this.keyDown.bind(this))
    pubsub.subscribe('touchStart', this.touchStart.bind(this))
    pubsub.subscribe('collision', this.onCollision.bind(this))

    // create player sprite
    const { x, y, w, h } = this.props
    this.setSprite(id, w, h)
    this.position.set(x, y)
    this.zIndex = 2

    // remember original position
    this.centerX = x
    this.centerY = y

    // initialize gravity and velocity
    this.gravity = 0.75 // 0.5 // 1
    this.impulse = 26 //28 // 20
    this.vx = 0
    this.vy = 0 //(Math.random() * +10) + 5

    // initialize game vars
    //this.playing = false
    this.trackNum = 1
    this.state = PlayerStates.idle
  }

  setSprite(id, w, h) {
    const texture = PIXI.Texture.fromImage(id)
    this.sprite = new PIXI.Sprite(texture)
    this.sprite.anchor.set(0.5, 0.5)
    this.sprite.width = w
    this.sprite.height = h
    this.sprite.tint = this.props.color

    //this.blur = Effects.blur(this.sprite, 1.5)
    //this.glow = Effects.glow(this.sprite, 10, 2, 2, 0xFF0000, 1)
    this.addChild(this.sprite)
  }

  setRandomImage() {
    this.sprite.texture = PIXI.Texture.fromImage(this.getRandomId())
  }

  keyDown(e, key) {
    if (this.state === PlayerStates.idle) {
      this.state = PlayerStates.play
      this.visible = true
      pubsub.publish('gamestart', {})
      return
    }

    if (key === 37) { this.changeTrack(-1) }
    if (key === 39) { this.changeTrack(1)  }
    if (key === 40) { this.impulse = 0 }
    if (key === 38) { this.impulse = 26 }
  }

  touchStart(e, params) {
    if (this.state === PlayerStates.idle) {
      this.state = PlayerStates.play
      this.visible = true
      pubsub.publish('gamestart', {})
      return
    }

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
    Audio.play(sfx.woosh, 0.3, [0.75, 1.0], false)
  }

  pickStar(tile) {
    Audio.play(sfx.dingEcho, 1, [2, 2], false)
    tile.pickStar()
    this.setRandomImage()
  }

  die() {
    Audio.play(sfx.flesh, 0.5, [0.5, 1.0], false)
    Audio.play(sfx.squish2, 0.5, [0.5, 1.0], false)
    this.state = PlayerStates.dead
    this.visible = false
    pubsub.publish('explosion', { x: this.x, y: this.y })

    window.setTimeout(() => {
      this.state = PlayerStates.idle
      this.position.set(this.props.x, this.props.y)
      this.vx = 0
      this.vy = 0
      this.visible = true
      this.sprite.rotation = 0
      this.trackNum = 1
      this.setRandomImage()
      pubsub.publish('gameover', {})
    }, 250)

  }

  onCollision(e, params) {
    Audio.play(sfx.drop, 1, [1, 1.25], false)
  }

  render() {
    if (this.state === PlayerStates.idle ||
        this.state === PlayerStates.dead) {
      return
    }


    // update horizontal movement depending on track
    const w = this.props.trackW
    const x = this.centerX - w + this.trackNum * w
    this.vx = (x - this.x) / 5

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
      pubsub.publish('collision', { player: this, trackNum: this.trackNum })
    } else {
      // update rotation
      this.sprite.rotation -= 0.1
    }
  }
}

export default Player
