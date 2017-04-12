import pubsub from 'pubsub-js'

import Keyboard       from './lib/Keyboard'
import Touch          from './lib/Touch'
import Effects        from './lib/effects'
import { randomInt }  from './lib/random'

import { GameStates } from'./States'

//import Bg from './Bg'
import Tile from './Tile'
import Player from './Player'
import Explosion from './Explosion'


export class Game extends PIXI.Container {
  constructor(props) {
    super()
    pubsub.subscribe('render', this.render.bind(this))
    //pubsub.subscribe('keyDown', this.keyDown.bind(this))
    //pubsub.subscribe('touchStart', this.touchStart.bind(this))
    pubsub.subscribe('gamestart', this.gameStart.bind(this))
    pubsub.subscribe('gameover', this.gameOver.bind(this))
    pubsub.subscribe('collision', this.onCollision.bind(this))
    pubsub.subscribe('explosion', this.onExplosion.bind(this))

    this.props = props
    this.keyboard = new Keyboard()
    this.touch = this.addChild(new Touch())

    this.init()
  }


  init() {
    // create tiles
    const x = this.props.renderer.width / 2
    const y = this.props.renderer.height * 0.7
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
      y: this.props.renderer.height * 0.3,
      w: 32,
      h: 32,
      floorY: y,
      trackW: w + m
    }))

    this.state = GameStates.over

    // init game vars
    this.activeStar = null

    this.blur = Effects.blur(this, 0)
    //this.glow = Effects.glow(this, 10, 2, 2, 0xFFFFFF, 1)
  }

  // keyDown() {
  //   if (this.state === GameStates.over) {
  //     pubsub.publish('gamestart', {})
  //   }
  // }
  //
  // touchStart(e, params) {
  //   console.log(this.state)
  //   if (this.state === GameStates.over) {
  //     pubsub.publish('gamestart', {})
  //   }
  // }

  onExplosion(e, params) {
    // create explosion
    this.explosion = this.addChild(new Explosion({
      x: params.x,
      y: params.y,
      max: 32,
    }))
  }

  gameStart() {
    if (this.explosion) {
      this.removeChild(this.explosion)
    }
    this.state = GameStates.play
    //this.bg.setRandomColor()
  }

  gameOver() {
    this.state = GameStates.over
    //this.bg.setRandomColor()

    //this.removeChild(this.player)
    //this.player.visible = false

    // close all traps
    for (let i = 0; i < this.tiles.length; i++) {
      const tile = this.tiles[i]
      tile.trap.close()
    }

    // remove star
    if (this.activeStar !== null) {
      this.activeStar.unspawnStar()
      this.activeStar = null
    }

  }

  onCollision(e, params) {
    if (this.state === GameStates.over) { return }

    const tile = this.tiles[params.trackNum]
    //params.player.x = tile.x;

    // pick stars
    if (tile.star !== null && tile.star.isPickable()) {
      params.player.pickStar(tile)
      this.activeStar = null
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
        if (r <= 50) { tile.trap.toggle() }
        if (!tile.trap.active) {
          closedTiles.push(tile)
        }
      }
    }

    // but we want to make sure that there is always a closed trap
    if (closedTiles.length === 0) {
      const tile = this.tiles[randomInt(0, this.tiles.length - 1)]
      tile.trap.close()
      closedTiles.push(tile)
    }

    //but we want to make sure that there is always an open trap
    if (closedTiles.length === 3) {
      const r = randomInt(0, this.tiles.length - 1)
      const tile = this.tiles[r]
      tile.trap.open()
      closedTiles.slice(r, 1)
    }

    //there is a possibility that only one star appears on a closed tile
    if (closedTiles.length > 0 && this.activeStar === null) {
      const r = randomInt(1, 100)
      if (r <= 25) {
        const tile = closedTiles[randomInt(0, closedTiles.length - 1)]
        if (tile.star === null) {
          tile.spawnStar()
          this.activeStar = tile
        }
      }
    }

    // if there is a star, update turns and unspawn it
    if (this.activeStar !== null) {
      this.activeStar.starTurns += 1
      if (this.activeStar.starTurns === 3) {
        this.activeStar.unspawnStar()
        this.activeStar = null
      }
    }
  }

  render() {
    if (this.state === GameStates.play) {}
    if (this.state === GameStates.over) {}
  }
}

export default Game
