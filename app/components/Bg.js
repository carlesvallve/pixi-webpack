import pubsub from 'pubsub-js'
import { gradientRadial, randomColor, colorInterpolation } from './lib/colors'


export class Bg extends PIXI.Sprite {
  constructor(props) {
    super()
    pubsub.subscribe('render', this.render.bind(this))

    this.props = props
    this.speed = 20

    this.texture = gradientRadial(
      this.props.renderer.width,
      this.props.renderer.height,
      480
    )

    this.setRandomColor()
  }



  setRandomColor() {
    this.color = randomColor(this.color)
  }

  render() {
    this.props.renderer.backgroundColor = colorInterpolation(
      this.props.renderer.backgroundColor,
      this.color,
      this.speed
    )
  }
}

export default Bg
