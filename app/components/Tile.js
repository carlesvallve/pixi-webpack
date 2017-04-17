import pubsub from 'pubsub-js'
import tweenManager from 'pixi-tween'
import { randomInt, randomArr } from './lib/random'
import Effects from './lib/effects'
import Trap from './Trap'
import Star from './Star'
import { TileStates } from './States'
import './lib/math'

export class Tile extends PIXI.Container {
  constructor(props) {
    super()
    pubsub.subscribe('render', this.render.bind(this))

    this.props = props

    const { x, y, w, h } = this.props
    this.setSprite(w, h)
    this.position.set(x, y)
    this.zOrder = 1

    this.trap = this.addChild(new Trap({ w: h / 4, h: h / 2 }))
    this.star = null
    this.starTurns = 0

    this.startAngle = 0
    this.endAngle = 0
    this.rotationSpeed = 20

    this.state = TileStates.idle
  }

  setSprite(w, h) {
    // Draw a rectangle with rounded corners
    this.graphics = new PIXI.Graphics()
    this.graphics.beginFill(0x000000)
    this.graphics.drawRoundedRect(-w/2, -h/2, w, h, 10)
    this.graphics.endFill()

    var texture = this.graphics.generateTexture()
    this.sprite = new PIXI.Sprite(texture)
    this.sprite.anchor.set(0.5, 0.5)

    this.addChild(this.sprite)
  }

  hasActiveTrap() {
    return this.trap.isActive() && !this.isRotated() //this.rotation === 0 //!this.isRotated() // this.rotation === 0
  }

  hasActiveStar() {
    return this.star !== null && this.star.isPickable() && this.rotation === 0
  }

  isRotated() {
    return this.rotation !== 0 //endAngle !== 0
  }


  toggleTrap() {
    if (this.trap.isActive()) {
      this.closeTrap()
    } else {
      this.openTrap()
    }
  }

  rotate() {
    //this.rotation += randomArr([-0.1, 0.1])
    const d = Math.sign(randomInt(-1, 1))
    this.startAngle = this.rotation
    this.endAngle = this.startAngle === 0 ? Math.radians(180) * d : 0 //this.isRotated() ? 0 : Math.radians(180)
  }

  resetRotation(chance = 50) {
    const r = randomInt(0, 100)
    if (r > chance) { return }
    this.startAngle = 0
    this.endAngle = 0
    this.rotation = 0
  }


  openTrap() {
    if (this.hasActiveTrap() && this.endAngle !== 0) {
      this.rotate()
      return
    }

    //this.resetRotation(50)

    this.trap.open()
  }

  closeTrap() {
    this.trap.close()
  }

  spawnStar() {
    //this.resetRotation(100)
    window.setTimeout(() => {
      this.star = this.addChild(new Star({ tile: this, color: 0xFFFFFF }))
      this.starTurns = 0
    }, 100)
  }

  pickStar() {
    const pos = { x: this.star.worldTransform.tx, y: this.star.worldTransform.ty }
    this.star.setParent(this.parent)
    this.star.position.set(pos.x, pos.y)

    this.star.pickUp()
    window.setTimeout(() => {
      //this.parent.removeChild(this.star)
      this.star = null
      this.starTurns = 0
    }, 2000)
  }

  unspawnStar() {
    const star = this.star
    if (this.star === null) { return }

    const pos = { x: star.worldTransform.tx, y: star.worldTransform.ty }
    star.setParent(this.parent)
    star.position.set(pos.x, pos.y)
    this.star = null
    this.starTurns = 0
    star.unspawn()
    window.setTimeout(() => {
      this.parent.removeChild(star)
    },500)
  }

  render() {
    //if (this.state === TileStates.rotate) {
      const drot = (this.endAngle - this.rotation) / this.rotationSpeed //this.speed
      if (drot !== 0) {
        this.rotation += (this.endAngle - this.startAngle) /  this.rotationSpeed
      }

  }
}

export default Tile
