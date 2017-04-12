import pubsub from 'pubsub-js'
import tweenManager from 'pixi-tween'
import Effects from './lib/effects'
import Trap from './Trap'
import Star from './Star'


export class Tile extends PIXI.Container {
  constructor(props) {
    super()
    pubsub.subscribe('render', this.render.bind(this))

    this.props = props

    const { x, y, w, h } = this.props
    this.setSprite(w, h)
    this.position.set(x, y)
    this.zOrder = 1

    this.trap = this.addChild(new Trap({ w: h / 4, h: h / 2 }))
    this.star = null
    this.starTurns = 0
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
      this.starTurns = 0
    }, 100)
  }

  pickStar() {
    this.star.pickUp()
    window.setTimeout(() => {
      this.removeChild(this.star)
      this.star = null
      this.starTurns = 0
    }, 2000)
  }

  unspawnStar() {
    this.star.unspawn()
    window.setTimeout(() => {
      this.removeChild(this.star)
      this.star = null
      this.starTurns = 0
    },500)
  }

  render() {

  }
}

export default Tile
