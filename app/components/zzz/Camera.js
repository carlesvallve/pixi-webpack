import pubsub from 'pubsub-js'
import { rectangle } from './lib/geometry'

export class Camera extends PIXI.Container {

  constructor(props) {
    super()
    pubsub.subscribe('render', this.render.bind(this));

    this.visible = false
    this.elasticity = 10

    this.world = props.world
    this.target = props.target || { x: 0, y: 0 }
    this.x = this.target.x
    this.y = this.target.y
    this.w = this.world.width - this.world.center.x * 2
    this.h = this.world.height - this.world.center.y * 2
    this.offset = props.offset

    this.rectangle = this.addChild(rectangle(-4, -1, 8, 2, 0xffff00, 0x000000, 0));
    this.rectangle = this.addChild(rectangle(-1, -4, 2, 8, 0xffff00, 0x000000, 0));
  }


  setTarget(target) {
    this.target = target
  }


  render() {
    // get increments for this frame
    const dx = (this.target.x - this.x) / this.elasticity
    const dy = (this.target.y - this.y) / this.elasticity

    // update camera position
    this.x += dx
    this.y += dy

    // bound to world limits
    if (this.x < -this.w / 2) { this.x = -(this.w / 2) }
    if (this.x > this.w / 2) { this.x = (this.w / 2) }
    if (this.y < -this.h / 2 - this.offset.y) { this.y = -this.h / 2 - this.offset.y }
    if (this.y > this.h / 2 - this.offset.y) { this.y = this.h / 2 - this.offset.y }

    // update world position
    this.world.x = - this.x + this.world.center.x
    this.world.y = - this.y + this.world.center.y
  }
}

export default Camera
