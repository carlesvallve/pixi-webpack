import { rectangle } from './utils'

export class World extends PIXI.Container {

  constructor(props) {
    super()
    this.rectangle = this.addChild(rectangle(-100, -100, 200, 200, 0x333333, 0x000000, 1));

    this.x = props.x
    this.y = props.y
    this.w = this.width
    this.h = this.height
    this.center = { x: props.x, y: props.y }
  }

  setDimensions(w, h) {
    this.w = w
    this.h = h
  }

  // updatePosition(dx, dy) {
  //
  //
  //   if (this.x - this.center.x < - this.width / 2) {
  //     console.log('<<<')
  //     this.x = this.center.x - this.width / 2
  //     return true
  //   }
  //
  //   if (this.x - this.center.x > this.width / 2) {
  //     console.log('>>>')
  //     this.x = this.center.x + this.width / 2
  //     return true
  //   }
  //
  //   this.x -= dx
  //   this.y -= dy
  //
  //   return false
  //   //console.log((this.x - this.center.x))
  // }
}

export default World
