import pubsub from 'pubsub-js'
import Effects from './lib/effects'
import { StarStates } from './States'


export class Star extends PIXI.Container {
  constructor(props) {
    super()
    pubsub.subscribe('render', this.render.bind(this))

    this.props = props

    this.setSprite(14, 14)
    this.position.set(0, -30)
    this.speed = 5
    this.zIndex = 1

    this.state = StarStates.spawn
  }

  setSprite(w, h) {
    const texture = PIXI.Texture.fromImage('star')
    this.sprite = new PIXI.Sprite(texture)
    this.sprite.anchor.set(0.5, 0.5)
    this.sprite.width = w
    this.sprite.height = h
    this.sprite.scale.set(0, 0)
    this.sprite.tint = this.props.color

    this.glow = Effects.glow(this, 8, 1.5, 0, 0xFFFFFF, 1)
    this.addChild(this.sprite)
  }

  isPickable() {
    return this.state === StarStates.spawn
  }

  pickUp() {
    this.state = StarStates.pickup
  }

  unspawn() {
    this.state = StarStates.unspawn
  }

  render() {
    if (this.state === StarStates.spawn) {
      const dsx = (14 - this.sprite.width) / this.speed
      const dsy = (14 - this.sprite.height) / this.speed
      this.sprite.width += dsx
      this.sprite.height += dsy
      //this.rotation += 360 / this.speed
      if (dsx === 0) {
        this.state = StarStates.idle
      }
    }

    if (this.state === StarStates.pickup) {
      const dy = (150 - this.y) / 20 //this.speed
      this.y += dy
      this.sprite.rotation -= 0.1
      this.alpha -= 0.02
    }

    if (this.state === StarStates.unspawn) {
      const dsx = (0 - this.sprite.width) / this.speed
      const dsy = (0 - this.sprite.height) / this.speed
      this.sprite.width += dsx
      this.sprite.height += dsy
      this.rotation += 0.1 //360 / this.speed
    }
  }
}

export default Star
