import pubsub from 'pubsub-js'
import { randomInt } from './lib/random'
import Tile from './Tile'
import Player from './Player'
import Keyboard from './Keyboard'
import Touch from './Touch'
//import Audio     from './Audio'
//import StepSequencer from 'step-sequencer'


export class Game extends PIXI.Container {
  constructor(props) {
    super()
    this.props = props

    // subscribe to game events
    pubsub.subscribe('render', this.render.bind(this))
    pubsub.subscribe('collision', this.onCollision.bind(this))

    console.log(this.props.playerId)

    this.activeStar = false

    this.keyboard = new Keyboard()

    this.touch = this.addChild(new Touch())
    pubsub.subscribe('touchStart', this.touchStart.bind(this))
    pubsub.subscribe('touchMove', this.touchMove.bind(this))
    pubsub.subscribe('touchEnd', this.touchEnd.bind(this))

    this.init()
  }

  touchStart(e, params) {
    //console.log('touchStart', e, params)
  }

  touchMove(e, params) {
    //console.log('touchMove', e, params)
  }

  touchEnd(e, params) {
    //console.log('touchEnd', e, params)
  }

  init() {
    // create tiles
    const x = this.props.renderer.width / 2
    const y = this.props.renderer.height * 0.75
    const w = (this.props.renderer.width * 0.75) / 3
    const h = w / 3
    const m = 5

    this.tiles = [
      this.addChild(new Tile({ num: 0, x: x - w - m, y: y, w: w, h: h })),
      this.addChild(new Tile({ num: 1, x: x, y: y, w: w, h: h })),
      this.addChild(new Tile({ num: 2,  x: x + w + m, y: y, w: w, h: h }))
    ]

    // create player
    const player = this.addChild(new Player({
      id: this.props.playerId,
      color: 0x000000,
      x: x,
      y: this.props.renderer.height * 0.4,
      w: 32,
      h: 32,
      floorY: y,
      trackW: w + m
    }))
  }

  onCollision(e, params) {
    // a tile has 50% chance to change state
    let closedTiles = []

    for (let i = 0; i < this.tiles.length; i++) {
      const tile = this.tiles[i]
      if (tile.star === null) {
        const r = randomInt(1, 100)
        if (r <= 75) { tile.trap.toggle() }
        if (!tile.trap.active) {
          closedTiles.push(tile)
        }
      }
    }

    // but we want to make sure that there is always a closed tile
    if (closedTiles.length === 0) {
      const tile = this.tiles[randomInt(0, this.tiles.length - 1)]
      tile.trap.close()
      closedTiles.push(tile)
    }

    // there is a possibility that only one star appears on a closed tile
    if (closedTiles.length > 0 && !this.activeStar) {
      const r = randomInt(1, 100)
      if (r <= 50) {
        const tile = closedTiles[randomInt(0, closedTiles.length - 1)]
        if (tile.star === null) {
          tile.spawnStar({ color: 0xFFFFFF })
          this.activeStar = true
        }
      }
    }
  }

  render() {
    //console.log('rendering game', this.keyboard.keys)

  }

  // debugLines() {
  //   const g1 = new PIXI.Graphics()
  //   g1.lineStyle(1, 0xff0000)
  //      .moveTo(0, player.props.y) // - player.props.h)
  //      .lineTo(600, player.props.y) // - player.props.h)
  //
  //   this.addChild(g1)
  //
  //   const g2 = new PIXI.Graphics()
  //   g2.lineStyle(1, 0xff0000)
  //      .moveTo(0, y)
  //      .lineTo(600, y)
  //
  //   this.addChild(g2)
  // }
}

export default Game
