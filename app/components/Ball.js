import pubsub from 'pubsub-js'
import { Directions, DirectionVectors } from './enums'

export class Ball extends PIXI.Container {

  constructor(props) {
    super()
    pubsub.subscribe('render', this.render.bind(this));

    this.app = props.app
    this.position.set(props.x, props.y)

    this.owner = null
    this.elasticity = 10

    this.shadow = this.app.world.addChildAt(this.setAnimation('ball_shadow', { x: 0.3, y: 0.7 }), 1);
    this.sprite = this.addChild(this.setAnimation('ball'));
  }

  setAnimation(id, offset = { x: 0.5, y: 0.5 }) {
    const texture = PIXI.Texture.fromFrame(id + '_1.png')
    const anim = new PIXI.extras.AnimatedSprite([texture])

    anim.scale.set(0.5)
    anim.anchor.set(offset.x, offset.y)
    anim.alpha = id === 'ball_shadow' ? 0.8 : 1
    anim.animationSpeed = 0
    anim.loop = true

    return anim
  }

  setOwner(player) {
    this.owner = player
  }

  render() {

    // stick ball to ball owner
    if (this.owner !== null) {
      const inc = DirectionVectors[this.owner.direction]
      const tx = this.owner.position.x + (inc.x * 8) + (this.owner.increments.x * 8)
      const ty = this.owner.position.y + (inc.y * 8) + (this.owner.increments.y * 8)
      const dx = (tx - this.x) / this.elasticity
      const dy = (ty - this.y) / this.elasticity
      this.x += dx
      this.y += dy
    }

    this.shadow.position = this.position
  }

}

export default Ball
