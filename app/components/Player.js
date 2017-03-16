import pubsub from 'pubsub-js'
import PlayerAnimation from './PlayerAnimation'
import { Sides, Actions, Directions, DirectionVectors } from './enums'
import { getDistance } from './geometry'
import Audio from './Audio'


export class Player extends PIXI.Container {

  constructor(props) {
    super(props)
    pubsub.subscribe('render', this.render.bind(this));

    // initialize player properties
    this.app = props.app
    this.action = Actions.idle
    this.team = props.team
    this.color = this.team ? this.team.color : 'red'
    this.side = this.team ? this.team.side : Directions.N
    this.direction = this.side
    this.position.set(props.x, props.y)
    this.speed = props.speed || 2 + Math.random() * 1
    this.inc = { x: 0, y: 0 }

    // create player animated sprite
    this.sprite = this.addChild(new PlayerAnimation({ player: this }))

    this.hasBall = false
  }


  stop() {
    this.action = Actions.idle
    this.increments = { x: 0, y: 0 }
  }

  isSelected() {
    return this === this.app.player
  }

  isControlling() {
    return this.app.ball.owner = this
  }

  move(direction) {
    this.action = Actions.run
    this.direction = direction

    const inc = DirectionVectors[this.direction]
    this.increments = { x: inc.x * this.speed, y: inc.y * this.speed }
    this.position.set(this.x + this.increments.x, this.y + this.increments.y)
  }


  ballControl() {
    if (this !== this.app.player) { return }

    const ball = this.app.ball
    const dist = getDistance(this.position, this.app.ball.position)

    if (dist <= 16) {
      ball.setOwner(this)
    }
  }

  shoot() {
    if (!this.isControlling()) { return }

    this.action = Actions.kick

    Audio.playRandom(Audio.sfx.kick,
      0.2 + Math.random() * 0.2, // volume
      1.0 // + Math.random() * 0.5  // speed
    )
  }


  render() {
    this.ballControl()
  }

}

export default Player
