import pubsub from 'pubsub-js'
import Effects from './lib/effects'

export class Trap extends PIXI.Container {
  constructor(props) {
    super()
    pubsub.subscribe('render', this.render.bind(this))

    this.props = props

    const { x, y, w, h } = this.props
    this.setSprite(w, h)
    this.position.set(0, 0)

    this.active = false
    this.targetY = 0
    this.speed = 5
  }

  setSprite(w, h) {
    // Draw a triangle
    const graphics = new PIXI.Graphics();
    graphics.beginFill(0x000000)
    graphics.moveTo(0, -h / 2)
    graphics.lineTo(w, h / 2)
    graphics.lineTo(-w, h / 2)
    graphics.endFill();

    var texture = graphics.generateTexture()
    this.sprite = new PIXI.Sprite(texture)
    this.sprite.anchor.set(0.5, 0.5)

    this.addChild(this.sprite)
  }

  isActive() {
    return this.active
  }

  open() {
    this.active = true
    this.targetY = -this.props.h * 1.65
  }

  close() {
    this.active = false
    this.targetY = 0
  }

  render() {
    const dy = (this.targetY - this.y) / this.speed
    this.y += dy
  }
}

export default Trap
