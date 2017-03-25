import pubsub from 'pubsub-js'
import Audio  from './Audio'
import PlayerAnimation from './PlayerAnimation'
import { Options, Sides, Actions, Directions, DirectionVectors } from './lib/enums'
import { randomInt, randomNumber } from './lib/random'
import { getVector, getDistance }  from './lib/geometry'
import Vector from './lib/vector'


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
    this.increments = new Vector(0, 0) //{ x: 0, y: 0 }

    // create player animated sprite
    this.sprite = this.addChild(new PlayerAnimation({ player: this }))

    // create player label
    const style = {font:"10px Arial", fill:"white", stroke:'black', strokeThickness: 1, align:"center"}
    this.label = this.addChild(new PIXI.Text(this.num + 1, style))
    this.label.anchor.set(0.5, 1.7)
    this.label.visible = Options.display.labels.player


    this.hasBall = false

    this.updateFormation(randomNumber(1, 3))
  }

  select() {
    this.game.player = this
  }


  stop() {
    this.action = Actions.idle
    this.increments.set(0, 0)
  }

  isSelected() {
    return this === this.game.player
  }

  isControlling() {
    return this.game.ball.owner = this
  }


  moveInDirection(direction) {
    this.action = Actions.run
    this.direction = direction

    const inc = DirectionVectors[this.direction]
    this.increments.set(inc.x * this.speed, inc.y * this.speed)
  }


  moveByIncrements() {
    // move player by his increments
    this.position.set(
      this.x + this.increments.x,
      this.y + this.increments.y
    )
  }


  gotoTargetPoint(point) {
    // TODO: figure out a way to be able to kill timeout references if necessary
    this.game.wait(randomNumber(0, 1), () => {

      const vec = getVector(this.position, point)
      if (vec.length() === 0) { return }

      vec.normalize()
      vec.multiplyScalar(this.speed)

      this.action = Actions.run
      this.increments = vec
      this.direction = this.team.side
      this.targetPoint = point

    })
  }



  arriveToTargetPoint() {
    if (!this.targetPoint) { return }

    const step = { x: this.x + this.increments.x, y: this.y + this.increments.y }
    const dist = getDistance(this.position, this.targetPoint)
    const distStep = getDistance(this.position, step)

    if (dist < distStep) {
      this.position = this.targetPoint
      this.stop()
      this.targetPoint = null
      this.increments.set(0, 0)
    }
  }


  ballControl() {
    if (this === this.game.ball.shooter) { return }
    if (this !== this.game.player) { return }

    const dist = getDistance(this.position, this.game.ball.position)
    if (dist <= 16) {
      this.game.ball.setBallControl(this)
    }
  }


  kick() {
    if (!this.isControlling()) { return }

    this.action = Actions.kick

    const d = randomInt(200, 200)
    const inc = DirectionVectors[this.direction]
    const vec = { x: inc.x * d, y: inc.y * d }

    this.game.player = null
    this.action = Actions.idle

    this.game.ball.setBallKick(vec)
  }


  render() {
    this.label.style.fill = (this === this.game.player) ? 'yellow' : 'white'
    this.ballControl()
    this.updateFormation()
    this.moveByIncrements()
    this.arriveToTargetPoint()
  }


  updateFormation(time) {
    if (this !== this.game.ball.owner && this.action === Actions.idle) {
      const formation = this.team.formation.positions[this.num]
      this.gotoTargetPoint({
        x: formation.x,
        y: this.team.baseY + formation.y * this.team.separationY
      })
    }
  }

}

export default Player
