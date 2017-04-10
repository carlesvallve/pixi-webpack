import pubsub from 'pubsub-js'


export class Trap extends PIXI.Container {
  constructor(props) {
    super()
    this.props = props

    // subscribe to game events
    pubsub.subscribe('render', this.render.bind(this))
    //pubsub.subscribe('collision', this.onCollision.bind(this))

    const { x, y, w, h } = this.props
    this.setSprite(w, h)
    this.position.set(0, h)

    this.active = false
    this.targetY = h
    this.speed = 5
    this.delay = 150
  }

  setSprite(w, h) {
    // Draw a triangle
    const graphics = new PIXI.Graphics();
    graphics.beginFill(0x000000)
    graphics.moveTo(0, -h)
    graphics.lineTo(w, 0)
    graphics.lineTo(-w, 0)
    graphics.endFill();

    var texture = graphics.generateTexture()
    this.sprite = new PIXI.Sprite(texture)
    this.sprite.anchor.set(0.5, 1)

    const blurFilter = new PIXI.filters.BlurFilter()
    blurFilter.blur = 0.5
    this.sprite.filters = [blurFilter]

    this.addChild(this.sprite)
  }

  toggle() {
    if (this.active) {
      this.close()
    } else {
      this.open()
    }
  }

  open() {
    this.active = true
    window.setTimeout(() => { this.targetY = 2 }, this.delay)
  }

  close() {
    this.active = false
    window.setTimeout(() => { this.targetY = this.props.h }, this.delay)
  }

  render() {
    const dy = (this.targetY - this.y) / this.speed
    this.y += dy
  }
}

export default Trap
