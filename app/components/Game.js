import pubsub         from 'pubsub-js'

import Keyboard       from './lib/Keyboard'
import Touch          from './lib/Touch'
import { randomInt }  from './lib/random'

import { GameStates } from'./States'
import Bg from './Bg'
import Tile from './Tile'
import Player from './Player'
import Explosion from './Explosion'

import Effects from './lib/effects'


export class Game extends PIXI.Container {
  constructor(props) {
    super()
    pubsub.subscribe('render', this.render.bind(this))
    pubsub.subscribe('gamestart', this.gameStart.bind(this))
    pubsub.subscribe('gameover', this.gameOver.bind(this))
    pubsub.subscribe('collision', this.onCollision.bind(this))

    this.props = props
    this.keyboard = new Keyboard()
    this.touch = this.addChild(new Touch())

    this.bg = this.addChild(new Bg({ renderer: this.props.renderer }))
    this.init()
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
    this.player = this.addChild(new Player({
      color: 0x000000,
      x: x,
      y: this.props.renderer.height * 0.4,
      w: 32,
      h: 32,
      floorY: y,
      trackW: w + m
    }))

    // init game vars
    this.activeStar = false

    this.blur = Effects.blur(this, 0)
    //this.glow = Effects.glow(this, 10, 2, 2, 0xFFFFFF, 1)
  }

  gameStart() {
    this.state = GameStates.play
    //this.bg.setRandomColor()
  }

  gameOver() {
    this.state = GameStates.over
    this.bg.setRandomColor()

    this.removeChild(this.player)

    this.explosion = this.addChild(new Explosion({
      x: this.player.x,
      y: this.player.y,
      max: 32,
    }))
  }

  onCollision(e, params) {
    if (this.state === GameStates.over) { return }

    const tile = this.tiles[params.trackNum]
    //params.player.x = tile.x;

    // pick stars
    if (tile.star !== null && tile.star.isPickable()) {
      params.player.pickStar(tile)
      this.activeStar = false
    }

    // die on traps
    if (tile.trap.active) {
      params.player.x = tile.x;
      params.player.die()
      this.state = GameStates.over
      return
    }

    // update tiles
    window.setTimeout(() => {
      this.updateTiles()
    })
  }

  updateTiles() {
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
          tile.spawnStar()
          this.activeStar = true
        }
      }
    }
  }

  render() {
    if (this.state === GameStates.play) {}
    if (this.state === GameStates.over) {}
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
