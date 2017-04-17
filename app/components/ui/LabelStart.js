import pubsub from 'pubsub-js'


export class LabelStart extends PIXI.Container {
  constructor(props) {
    super()
    pubsub.subscribe('render', this.render.bind(this))

    this.props = props
    this.position.set(this.props.x, this.props.y)

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
        fontSize: 14,
        //stroke: 0x000000,
        //strokeThickness: 2
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

  render() {}
}

export default LabelStart
