import pubsub from 'pubsub-js'
import { randomInt } from './lib/random'


export class Bg extends PIXI.Sprite {
  constructor(props) {
    super()

    // subscribe to game events
    pubsub.subscribe('render', this.render.bind(this))

    this.props = props
    this.texture = this.generateGradientRadial(400)
    this.setRandomColor()
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
    const colors = [0xFF0000, 0x00FF00, 0x0000FF, 0xFFFFFF, 0xFFFFFF, 0xFFFFFF, 0x333333, 0xCCCCCC, 0x00FFFF, 0xFFFF00, 0xFF00FF]
    this.color = colors[randomInt(0, colors.length - 1)]
  }

  render() {
    // interpolate towards new color
    // TODO: we need to figure out how to extract r,g,b values of a color object 0x123456
    const r = this.props.renderer
    const d = this.color - r.backgroundColor
    r.backgroundColor += d / 1 // this.color
  }
}


export default Bg
