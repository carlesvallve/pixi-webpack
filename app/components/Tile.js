import pubsub from 'pubsub-js'
import tweenManager from 'pixi-tween'
import Audio from './Audio'
import Trap from './Trap'
import Star from './Star'

export class Tile extends PIXI.Container {
  constructor(props) {
    super()
    this.props = props

    this.zOrder = 1

    // subscribe to game events
    pubsub.subscribe('render', this.render.bind(this))
    pubsub.subscribe('collision', this.onCollision.bind(this))

    const { x, y, w, h } = this.props
    this.setSprite(w, h)
    this.position.set(x, y)

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

    const blurFilter = new PIXI.filters.BlurFilter()
    blurFilter.blur = 0.5
    this.sprite.filters = [blurFilter]

    this.addChild(this.sprite)
  }

  spawnStar() {
    window.setTimeout(() => {
      this.star = this.addChild(new Star({ tile: this, color: 0xFFFFFF }))
    }, 300)
  }

  pickStar() {
    Audio.play(Audio.sfx.ding, 1, [2, 2.5], false)
    this.removeChild(this.star)
    this.star = null;
  }


  onCollision(e, params) {
    //console.log('!', e, params)
    //this.sprite.tint = 0x000000;
    //this.triangle.visible = false
  }

  render() {}
}

export default Tile
