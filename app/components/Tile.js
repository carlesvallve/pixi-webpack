import pubsub from 'pubsub-js'
import tweenManager from 'pixi-tween'
import Audio from './Audio'
import Effects from './Effects'
import Trap from './Trap'
import Star from './Star'


export class Tile extends PIXI.Container {
  constructor(props) {
    super()
    this.props = props

    // subscribe to game events
    pubsub.subscribe('render', this.render.bind(this))

    const { x, y, w, h } = this.props
    this.setSprite(w, h)
    this.position.set(x, y)
    this.zOrder = 1

    this.trap = this.addChild(new Trap({ w: h / 4, h: h / 2 }))
    this.star = null
  }

  setSprite(w, h) {
    // Draw a rectangle with rounded corners
    this.graphics = new PIXI.Graphics()
    this.graphics.beginFill(0x000000)
    this.graphics.drawRoundedRect(-w/2, -h/2, w, h, 10)
    this.graphics.endFill()

    var texture = this.graphics.generateTexture()
    this.sprite = new PIXI.Sprite(texture)
    this.sprite.anchor.set(0.5, 0)

    this.addChild(this.sprite)
  }

  spawnStar() {
    window.setTimeout(() => {
      this.star = this.addChild(new Star({ tile: this, color: 0xFFFFFF }))
    }, 100)
  }

  pickStar() {
    this.star.pickUp()
    window.setTimeout(() => {
      this.removeChild(this.star)
      this.star = null
    }, 2000)
  }

  render() {}
}

export default Tile
