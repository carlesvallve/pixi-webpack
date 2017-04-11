import pubsub from 'pubsub-js'
import Effects from './Effects'
import { StarStates } from './States'


export class Star extends PIXI.Container {
  constructor(props) {
    super()
    this.props = props

    // subscribe to game events
    pubsub.subscribe('render', this.render.bind(this))

    this.setSprite(24, 24)
    this.position.set(0, -20)
    this.speed = 5
    this.zIndex = 1

    this.state = StarStates.spawn
  }

  setSprite(w, h) {
    const texture = PIXI.Texture.fromImage('macys')
    this.sprite = new PIXI.Sprite(texture)
    this.sprite.anchor.set(0.5, 0.5)
    this.sprite.width = w
    this.sprite.height = h
    this.sprite.scale.set(0, 0)
    this.sprite.tint = this.props.color

    this.glow = Effects.glow(this, 10, 2, 2, 0xFFFFFF, 1)
    this.addChild(this.sprite)
  }

  isPickable() {
    return this.state === StarStates.spawn
  }

  pickUp() {
    this.state = StarStates.pickup
  }

  render() {
    if (this.state === StarStates.spawn) {
      const dsx = (16 - this.sprite.width) / this.speed
      const dsy = (16 - this.sprite.height) / this.speed
      this.sprite.width += dsx
      this.sprite.height += dsy
    }

    if (this.state === StarStates.pickup) {
      const dy = (-200 - this.y) / 20 //this.speed
      this.y += dy
      this.sprite.rotation -= 0.1
      this.alpha -= 0.02
    }
  }
}

export default Star
