import pubsub from 'pubsub-js'
import Audio from './Audio'


export class Player extends PIXI.Container {
  constructor(props) {
    super()
    this.props = props

    // subscribe to game events
    pubsub.subscribe('render', this.render.bind(this))
    pubsub.subscribe('keyDown', this.keyDown.bind(this))
    pubsub.subscribe('collision', this.onCollision.bind(this))

    const { id, x, y, w, h } = this.props
    this.setSprite(id, w, h)
    this.position.set(x, y)
    this.centerX = x

    // initialize gravity and velocity
    this.gravity = 0.5
    this.vx = 0
    this.vy = (Math.random() * +10) + 5

    this.trackNum = 1
  }

  setSprite(id, w, h) {
    const texture = PIXI.Texture.fromImage(id)
    this.sprite = new PIXI.Sprite(texture)
    this.sprite.anchor.set(0.5, 0.5)
    this.sprite.width = w
    this.sprite.height = h
    this.addChild(this.sprite)
  }

  keyDown(e, key) {
    //console.log('key', key)
    if (key === 37) { this.changeTrack(-1) }
    if (key === 39) { this.changeTrack(1)  }
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


    // checking for rebound on floor level
    const y = this.props.floorY - this.props.h / 2
    if (this.y >= y) {
      //this.y = y
      this.vy = - this.vy * 1
      //if (this.vy > -2) { this.vy = 0 }
      pubsub.publish('collision', { track: this.trackNum })
    } else {
      // adding gravity to velocity on y axis
      this.vy += this.gravity;
    }



    // updating horizontal movement depending on track
    const w = this.props.trackW
    const x = this.centerX - w + this.trackNum * w
    this.vx = (x - this.x) / 3

    // updating position
    this.position.set(
      this.x += this.vx,
      this.y += this.vy
    )

    // updating rotation
    this.sprite.rotation -= 0.1
  }
}

export default Player
