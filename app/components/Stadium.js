import pubsub             from 'pubsub-js'
import { Directions, Actions }     from './enums'

export class Stadium extends PIXI.Container {

  constructor(props) {
    super()
    pubsub.subscribe('render', this.render.bind(this));

    this.x = props.x
    this.y = props.y

    const texture = PIXI.Texture.fromImage('stadium');
    const sprite = new PIXI.Sprite(texture);
    sprite.anchor.x = 0.501;
    sprite.anchor.y = 0.5475;
    sprite.position.x = 0;
    sprite.position.y = 0;
    sprite.scale.x = 1;
    sprite.scale.y = 1;
    this.addChild(sprite);
  }

  render() {

  }
}

export default Stadium
