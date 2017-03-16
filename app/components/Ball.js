import pubsub from 'pubsub-js'
import { Directions, DirectionVectors } from './enums'

export class Ball extends PIXI.Container {

  constructor(props) {
    super()
    pubsub.subscribe('render', this.render.bind(this));

    this.app = props.app
    this.position.set(props.x, props.y)

    this.owner = null

    this.shadow = this.app.world.background.addChild(this.setAnimation('ball_shadow', { x: 0.3, y: 0.7 }));
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
      const distance = 8
      const elasticity = 10
      const inc = DirectionVectors[this.owner.direction]

      const tx = this.owner.position.x + (inc.x * distance) + (this.owner.increments.x * distance)
      const ty = this.owner.position.y + (inc.y * distance) + (this.owner.increments.y * distance)
      const dx = (tx - this.x) / elasticity
      const dy = (ty - this.y) / elasticity
      this.x += dx
      this.y += dy
    }

    this.shadow.position = this.position
  }

}

export default Ball
