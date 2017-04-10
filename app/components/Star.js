import pubsub from 'pubsub-js'

export class Star extends PIXI.Container {
  constructor(props) {
    super()
    this.props = props

    // subscribe to game events
    pubsub.subscribe('render', this.render.bind(this))
    //pubsub.subscribe('collision', this.onCollision.bind(this))

    this.setSprite(24, 24)
    this.position.set(0, -20)
    this.speed = 5
  }

  setSprite(w, h) {
    const texture = PIXI.Texture.fromImage('macys')
    this.sprite = new PIXI.Sprite(texture)
    this.sprite.anchor.set(0.5, 0.5)
    this.sprite.width = w
    this.sprite.height = h
    this.sprite.scale.set(0, 0)
    this.sprite.tint = this.props.color

    const blurFilter = new PIXI.filters.BlurFilter()
    blurFilter.blur = 0.5
    this.sprite.filters = [blurFilter]

    this.addChild(this.sprite)
  }

  render() {
    const dsx = (16 - this.sprite.width) / this.speed
    const dsy = (16 - this.sprite.height) / this.speed
    this.sprite.width += dsx
    this.sprite.height += dsy
  }
}

export default Star
