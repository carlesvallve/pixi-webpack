import pubsub from 'pubsub-js'
import Audio from './Audio'
import PlayerAnimation from './PlayerAnimation'
import { Sides, Actions, Directions, DirectionVectors } from './enums'
import { getDistance } from './geometry'
import { randomInt } from './utils'


export class Player extends PIXI.Container {

  constructor(props) {
    super(props)
    pubsub.subscribe('render', this.render.bind(this));

    // initialize player properties
    this.game = props.game
    this.action = Actions.idle
    this.team = props.team
    this.color = this.team ? this.team.color : 'red'
    this.side = this.team ? this.team.side : Directions.N
    this.num = props.num
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
    return this === this.game.player
  }

  isControlling() {
    return this.game.ball.owner = this
  }

  move(direction) {
    this.action = Actions.run
    this.direction = direction

    const inc = DirectionVectors[this.direction]
    this.increments = { x: inc.x * this.speed, y: inc.y * this.speed }
    this.position.set(this.x + this.increments.x, this.y + this.increments.y)
  }


  ballControl() {
    if (this !== this.game.player) { return }

    const ball = this.game.ball
    const dist = getDistance(this.position, this.game.ball.position)

    if (dist <= 16) {
      ball.setBallControl(this)
    }
  }


  kick() {
    if (!this.isControlling()) { return }

    this.action = Actions.kick

    const d = randomInt(200, 200)
    const inc = DirectionVectors[this.direction]
    const vec = { x: inc.x * d, y: inc.y * d }

    this.game.ball.setBallKick(vec)
  }


  render() {
    this.ballControl()
  }

}

export default Player
