import pubsub from 'pubsub-js'


export class LabelScore extends PIXI.Sprite {
  constructor(props) {
    super()
    pubsub.subscribe('render', this.render.bind(this))

    this.props = props
    this.speed = 3
    this.sc = 0.5

    this.position.set(this.props.x, this.props.y)
    this.scale.set(this.sc, this.sc)

    this.label = this.addChild(new PIXI.Text(
      this.props.caption, {
        align: 'center',
        dropShadow: true,
        dropShadowDistance: 2,
        dropShadowAlpha: 0.6,
        dropShadowBlur: 0,
        dropShadowColor: 0x000000,
        fill: 0xFFFFFF,
        fontFamily: 'Helvetica',
        fontSize: 48
      })
    )

    this.label.anchor.set(0.5, 0.5)
    this.label.position.set(0, 0)
  }

  show() {
    this.visible = true
  }

  hide() {
    this.visible = false
  }

  set(caption) {
    this.label.text = caption

    this.sc = 1
    window.setTimeout(() => { this.sc = 0.5 }, 250)
  }

  render() {
    const dsc = (this.sc - this.scale.x) / this.speed
    this.scale.x += dsc
    this.scale.y += dsc
  }
}

export default LabelScore
