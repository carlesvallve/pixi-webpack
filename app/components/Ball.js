import pubsub from 'pubsub-js'


export class Ball extends PIXI.Container {

  constructor(props) {
    super()
    pubsub.subscribe('render', this.render.bind(this));

    this.x = props.x
    this.y = props.y

    this.shadow = this.addChild(this.setAnimation('ball_shadow', { x: 0.3, y: 0.7 }));
    this.sprite = this.addChild(this.setAnimation('ball'));
  }

  setAnimation(id, offset = { x: 0.5, y: 0.5 }) {
    const texture = PIXI.Texture.fromFrame(id + '_1.png')
    const anim = new PIXI.extras.AnimatedSprite([texture])

    anim.anchor.set(offset.x, offset.y)
    anim.scale.set(0.5, 0.5)
    anim.position.set(0, 0)
    anim.animationSpeed = 0
    anim.loop = true

    return anim
  }

  render() {

  }

}

export default Ball
