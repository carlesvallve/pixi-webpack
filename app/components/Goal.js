//import pubsub from 'pubsub-js'
import { rectangle } from './utils'


export class Goal extends PIXI.Container {

  constructor(props) {
    super()
    //pubsub.subscribe('render', this.render.bind(this));

    this.side = props.side
    this.position.set(props.x, props.y)

    const texture = PIXI.Texture.fromImage('goal' + this.side);
    const sprite = new PIXI.Sprite(texture);
    sprite.anchor.set(0.52, this.side === 'N' ? 0.95 : 0.4)
    sprite.scale.set(0.5);
    this.addChild(sprite);

    //this.rectangle = sprite.addChild(rectangle(-80, -2, 160, 4, 0xffffff, 0x000000, 0));
  }

  render() {

  }
}

export default Goal
