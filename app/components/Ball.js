import pubsub from 'pubsub-js'
import Audio from './Audio'
import { Directions, DirectionVectors } from './lib/enums'
import { getBounds, getDistance } from './lib/geometry'
import { randomInt } from './lib/random'

export class Ball extends PIXI.Container {

  constructor(props) {
    super()
    pubsub.subscribe('render', this.render.bind(this));

    this.game = props.game
    this.position.set(props.x, props.y)

    this.shadow = this.game.background.addChild(this.setAnimation('ball_shadow', { x: 0.3, y: 0.7 }));
    this.sprite = this.addChild(this.setAnimation('ball'));

    this.initialized = false
    this.out = false
    this.scoring = false
    this.owner = null
    this.lastOwner = null
    this.shooter = null
    this.targetPoint = null

    this.reset()
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


  render() {
    this.getBounds()
    this.updateBallControl()
    this.updateBallKick()

    this.shadow.position = this.position
  }

  reset() {
    this.initialized = false

    this.game.wait(0.2, () => {
      this.owner = null
      this.shooter = null
      this.targetPoint = null

      this.game.wait(0.2, () => {
        this.position.set(0, 0)
        this.initialized = true
        this.out = false
        this.scoring = false

        this.game.wait(0.2, () => {
          Audio.play(Audio.sfx.whistle[1], 0.2 + Math.random() * 0.2, 1.0 + Math.random() * 0.2)
        })
      })
    })
  }

  isInactive() {
    return this.out || this.scoring || !this.initialized
  }


  getBounds() {
    if (!this.initialized) { return }

    const pitch = getBounds(this.game.areas.pitch)
    const goalN = getBounds(this.game.areas.goalN)
    const goalS = getBounds(this.game.areas.goalS)

    //console.log(goalN.left, goalN.right, this.x)
    //console.log(this.x)

    // out

    if (this.x < pitch.left || this.x > pitch.right) {
      this.out = true
      Audio.play(Audio.sfx.whistle[1], 0.2 + Math.random() * 0.2, 1.0 + Math.random() * 0.2)
      this.reset()
      return
    }

    // corners
    if (this.y < pitch.top && (this.x < goalN.left || this.x > goalN.right)) {
      this.out = true
      Audio.play(Audio.sfx.whistle[1], 0.2 + Math.random() * 0.2, 1.0 + Math.random() * 0.2)
      this.reset()
      return
    }
    if (this.y > pitch.bottom && (this.x < goalS.left || this.x > goalS.right)) {
      this.out = true
      Audio.play(Audio.sfx.whistle[1], 0.2 + Math.random() * 0.2, 1.0 + Math.random() * 0.2)
      this.reset()
      return
    }

    // penalty areas


    // goals
    if (!this.out) {
      if (this.y < pitch.top && (this.x > goalN.left && this.x < goalN.right)) {
        this.lastOwner.team.scoreGoal(this.lastOwner)
        this.scoring = true
        return
      }
      if (this.y > pitch.bottom && (this.x > goalS.left && this.x < goalS.right)) {
        this.lastOwner.team.scoreGoal(this.lastOwner)
        this.scoring = true
        return
      }
    }
  }


  // BALL CONTROL

  setBallControl(player) {
    this.shooter = null
    this.owner = player

    if (player !== null) {
      this.lastOwner = player
      this.owner.team.setAttacking()
    }
  }

  updateBallControl() {
    // stick ball to ball owner
    if (this.owner !== null) {
      this.targetPoint = null

      const distance = 8
      const elasticity = this.out || this.scoring ? 30 : 10
      const inc = DirectionVectors[this.owner.direction]

      const tx = this.owner.position.x + (inc.x * distance) + (this.owner.increments.x * distance)
      const ty = this.owner.position.y + (inc.y * distance) + (this.owner.increments.y * distance)
      const dx = (tx - this.x) / elasticity
      const dy = (ty - this.y) / elasticity
      this.x += dx
      this.y += dy
    }
  }


  // BALL KICK

  setBallKick(vec) {
    if (this.owner === null) { return }
    this.shooter = this.owner
    this.owner = null

    this.targetPoint = {
      x: this.x + vec.x, //+ randomInt(-50, 50),
      y: this.y + vec.y  //+ randomInt(-50, 50)
    }

    Audio.playRandom(Audio.sfx.kick,
      0.2 + Math.random() * 0.2, // volume
      1.0 // + Math.random() * 1.0  // speed
    )
  }

  updateBallKick() {
    if (this.targetPoint !== null) {

      // move to target point
      const elasticity =  this.out ? 40 : 12
      const tx = this.targetPoint.x
      const ty = this.targetPoint.y
      const dx = (tx - this.x) / elasticity
      const dy = (ty - this.y) / elasticity
      this.x += dx
      this.y += dy

      // collisions with goal elements
      const pitch = getBounds(this.game.areas.pitch)
      const goal = getBounds(this.game.areas.goalN)
      const d = 5

      // outside goal
      if (this.out && this.x < 0 && this.x > goal.left - d) { this.x = goal.left - d }
      if (this.out && this.x > 0 && this.x < goal.right + d) { this.x = goal.right + d }

      // inside goal
      if (this.scoring) {
        if (this.y < pitch.top - 30) { this.y = pitch.top - 30 }
        if (this.y > pitch.bottom + 30) { this.y = pitch.bottom + 30 }
        if (this.x < 0 && this.x < goal.left + d) { this.x = goal.left + d }
        if (this.x > 0 && this.x > goal.right - d) { this.x = goal.right - d }
      }

      // arrival to target point
      if (getDistance(this.position, this.targetPoint) < 8) {
        this.targetPoint = null
        this.shooter = null
      }
    }
  }

}

export default Ball
