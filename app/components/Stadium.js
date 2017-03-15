//import pubsub from 'pubsub-js'

export class Stadium extends PIXI.Container {

  constructor(props) {
    super()
    //pubsub.subscribe('render', this.render.bind(this));

    this.position.set(props.x, props.y)

    const texture = PIXI.Texture.fromImage('stadium')
    const sprite = new PIXI.Sprite(texture)
    sprite.anchor.set(0.5, 0.5)
    sprite.scale.set(1)
    this.addChild(sprite)
  }

  render() {

  }
}

export default Stadium
