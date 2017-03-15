import pubsub             from 'pubsub-js'
import Keyboard           from './Keyboard.js'
import Tilesets           from './Tilesets'
import World              from './World'
import Stadium            from './Stadium'
import Ball               from './Ball'
import Player             from './Player'
import Camera             from './Camera'
import Audio              from './Audio'


export class App extends PIXI.Container {

  constructor(props) {
    super()
    pubsub.subscribe('render', this.render.bind(this))

    this.props = props

    this.keyboard = new Keyboard()
    const tilesets = new Tilesets(this.init.bind(this))
  }


  init(sprites) {
    // get center of screen
    const x = parseInt(this.props.renderer.width / 2)
    const y = parseInt(this.props.renderer.height / 2)

    // create world
    this.world = this.addChild(new World({ x, y }))

    // create stadium
    this.stadium = this.world.addChild(new Stadium({ x: 0, y: 0 }))

    // create ball
    this.ball = this.world.addChild(new Ball({ x: 0, y: 0 }))

    // create player
    this.player = this.world.addChild(new Player({
      color: 'red', x: 0, y: -12
    }))

    // create camera
    this.camera = this.world.addChild(new Camera({
      world: this.world, target: this.player, offset: { x: 0, y: 83 }
    }))
  }


  render() {
    if (this.player) {
      const dir = this.keyboard.getDirection()

      if (dir === null) {
        this.player.stop()
      } else {
        this.player.move(dir)
      }
    }
  }
}

export default App
