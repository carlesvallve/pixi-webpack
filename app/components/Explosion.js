import pubsub from 'pubsub-js'
import { randomInt } from './lib/random'

export class Explosion extends PIXI.Container {
  constructor(props) {
    super()
    pubsub.subscribe('render', this.render.bind(this))
    this.props = props

    this.sprites = []
    for (let i = 0; i < 10; i++) {
      this.sprites.push(this.setSprite())
    }
  }

  setSprite() {
    const graphics = new PIXI.Graphics()
    graphics.lineStyle(1, 0x000000, 1)
    graphics.drawCircle(0, 0, 5)

    const sprite = new PIXI.Sprite(graphics.generateTexture())
    sprite.anchor.set(0.5, 0.5)
    //sprite.tint = this.props.color

    sprite.v = { x: 0 y: 0 }

    //this.blur = Effects.blur(this.sprite, 1.5)
    //this.glow = Effects.glow(this.sprite, 10, 2, 2, 0xFF0000, 1)
    return this.addChild(sprite)
  }

  render() {

  }

}

export default Explosion
