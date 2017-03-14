//import { rectangle } from './utils'

export class World extends PIXI.Container {

  constructor(props) {
    super()

    this.x = props.x
    this.y = props.y
    this.center = { x: props.x, y: props.y }

    //this.rectangle = this.addChild(rectangle(-100, -100, 200, 200, 0x333333, 0x000000, 1));
  }
}

export default World
