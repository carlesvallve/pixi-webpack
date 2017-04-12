import pubsub from 'pubsub-js'
import { randomNumber } from './lib/random'

export class Explosion extends PIXI.Container {
  constructor(props) {
    super()
    pubsub.subscribe('render', this.render.bind(this))

    this.props = props
    this.zIndex = 3
    this.gravity = 0.75

    for (let i = 0; i < this.props.max; i++) {
      this.setSprite()
    }
  }

  setSprite() {
    const graphics = new PIXI.Graphics()
    graphics.beginFill()
    //graphics.lineStyle(0, 0x000000, 1)
    graphics.drawCircle(0, 0, 5)
    graphics.endFill()

    const sprite = new PIXI.Sprite(graphics.generateTexture())
    sprite.anchor.set(0.5, 0.5)
    sprite.position.set(this.props.x, this.props.y)
    //sprite.tint = this.props.color

    sprite.vx = randomNumber(-15, 15)
    sprite.vy = randomNumber(-22, 15)

    //this.blur = Effects.blur(this.sprite, 1.5)
    //this.glow = Effects.glow(this.sprite, 10, 2, 2, 0xFF0000, 1)
    return this.addChild(sprite)
  }

  render() {
    const floorY = window.innerHeight - 50

    for (let i = 0; i < this.children.length; i++) {
      const sprite = this.getChildAt(i)

      // add gravity to velocity on y axis
      sprite.vy += this.gravity;

      // update position
      sprite.position.set(
        sprite.x += sprite.vx,
        sprite.y += sprite.vy
      )

      // check collision bottom
      if (sprite.y + sprite.vy >= floorY) {
        sprite.y = floorY
        sprite.vy = -sprite.vy * 0.9
      }

      // check collision left
      if (sprite.x + sprite.vx <= 0) {
        sprite.x = 0
        sprite.vx = -sprite.vx * 0.75
      }

      // check collision right
      if (sprite.x + sprite.vx >= window.innerWidth) {
        sprite.x = window.innerWidth
        sprite.vx = -sprite.vx * 0.75
      }

      // scale down
      const lifeSpeed = randomNumber(0.98, 0.995)
      sprite.scale.x *= lifeSpeed
      sprite.scale.y *= lifeSpeed

      // kill particle when her life ends
      if (sprite.scale.x <= 0.001) {
        this.removeChild(sprite)
      }
    }
  }

}

export default Explosion
