import pubsub    from 'pubsub-js'
import { randomInt } from './lib/random'
import Tile from './Tile'
import Player from './Player'
import Keyboard from './Keyboard'
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

    this.keyboard = new Keyboard()
    this.init()

  }

  // =================================
  // Game Initialization
  // =================================

  init() {
    //console.log('creating game elements', res)
    //this.addChild(drawShapes());

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
      x: x,
      y: this.props.renderer.height * 0.5, //0.75 - h / 2 - 16,
      w: 32,
      h: 32,
      floorY: y, // - h / 2,
      trackW: w + m
    }))

  }


  onCollision(e, params) {
    for (let i = 0; i < this.tiles.length; i++) {
      this.tiles[i].sprite.tint = 0x000000
      this.tiles[i].triangle.visible = false
    }

    let tiles = this.tiles.slice()

    const r = randomInt(0,2)
    for (let i = 0; i <= r; i++) {
      const tile = tiles[randomInt(0, tiles.length -1)]
      tile.setSpikes()
      tiles = tiles.slice(r, r + 1)
      if (tiles.length === 0) { break }
    }
  }

  // =================================
  // Game Render
  // =================================



  render() {
    //console.log('rendering game', this.keyboard.keys)

  }



}

export default Game
