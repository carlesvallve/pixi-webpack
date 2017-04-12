import pubsub from 'pubsub-js'
import { generateRandomColor, colorInterpolation } from './lib/colors'


export class Bg extends PIXI.Sprite {
  constructor(props) {
    super()
    pubsub.subscribe('render', this.render.bind(this))

    this.props = props

    this.texture = this.generateGradientRadial(400)
    this.setRandomColor()

    this.speed = 20
  }

  generateGradientRadial(radius = 400) {
    const w = this.props.renderer.width
    const h = this.props.renderer.height
    var canvas = document.createElement('canvas');
    canvas.width  = w
    canvas.height = h
    var context = canvas.getContext('2d');
    var grad = context.createRadialGradient(w/2,h/2,0,w/2,h/2,400);

    grad.addColorStop(0, 'rgba(0,0,0,0)');
    grad.addColorStop(1, 'rgba(0,0,0,1)');

    //context.setTransform(1,0,0,1,0,0);
    context.fillStyle = grad;
    context.fillRect(0, 0, w, h)

    return PIXI.Texture.fromCanvas(canvas)
  }

  setRandomColor() {
    this.color = generateRandomColor(this.color)
  }

  render() {
    this.props.renderer.backgroundColor += colorInterpolation(
      this.props.renderer.backgroundColor,
      this.color,
      this.speed
    )
  }
}

export default Bg
