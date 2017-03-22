import pubsub from 'pubsub-js'
import Audio from './Audio'
import PlayerAnimation from './PlayerAnimation'
import { Options, Sides, Actions, Directions, DirectionVectors } from './lib/enums'
import { getDistance } from './lib/geometry'
import { randomInt, randomNumber } from './lib/random'


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
    this.increments = { x: 0, y: 0 }
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
    this.increments = { x: inc.x * this.speed, y: inc.y * this.speed }
  }


  moveByIncrements() {
    // move player by his increments
    if (this.increments === undefined) { return }
    this.position.set(this.x + this.increments.x, this.y + this.increments.y)
  }


  gotoTargetPoint(point) {
    const dist = getDistance(this.position, point)
    if (dist <= this.speed) { return }

    this.targetPoint = point
    const distx = point.x - this.x
    const disty = point.y - this.y

    const dx = distx === 0 ? 0 : distx * this.speed / 100
    const dy = disty === 0 ? 0 : disty * this.speed / 100

    //const dx = distx === 0 ? 0 : (distx / 100) * this.speed
    //const dy = disty === 0 ? 0 : (disty / 100) * this.speed

    this.increments = { x: dx, y: dy }

    console.log(dx, dy)

    //console.log(distx, dx)
    //   x: ((point.x - this.x) / 100), //* this.speed,
    //   y: ((point.y - this.y) / 100) //* this.speed,
    // }

    // 1 --- speedx
    // distx -- n

    this.action = Actions.run
    this.direction = this.team.side
  }

  arriveToTargetPoint() {
    if (!this.targetPoint) { return }

    const dist = getDistance(this.position, this.targetPoint)

    if (dist <= this.speed * 2) {
      this.position = this.targetPoint
      this.stop()
      this.targetPoint = null
    }
  }


  ballControl() {
    if (this === this.game.ball.shooter) { return }
    if (this !== this.game.player) {
      return
    }

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
    this.label.style.fill = (this === this.game.ball.owner) ? 'yellow' : 'white'
    this.ballControl()
    this.updateFormation()
    this.moveByIncrements()
    this.arriveToTargetPoint()
  }


  updateFormation(time) {
    //this.num === 10 &&
    if (this !== this.game.player && this.action === Actions.idle) {
      const formation = this.team.formation.positions[this.num]
      this.gotoTargetPoint({
        x: formation.x,
        y: this.team.baseY + formation.y * this.team.separationY
      })
    }

    // this.game.wait(time, ()=> {
    //
    //   //if (this !== this.game.player) {
    //     const formation = this.team.formation.positions[this.num]
    //     this.gotoTargetPoint({
    //       x: formation.x,
    //       y: this.team.baseY + formation.y * this.team.separationY
    //     })
    //   //}
    //
    //   this.updateFormation(randomNumber(1, 3))
    // })
  }


  //this.moveByIncrements(this.increments)
}

export default Player
