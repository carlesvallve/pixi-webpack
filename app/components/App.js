import pubsub    from 'pubsub-js'
import Keyboard  from './Keyboard.js'
import Tilesets  from './Tilesets'
import World     from './World'
import Stadium   from './Stadium'
import Goal      from './Goal'
import Ball      from './Ball'
import Team      from './Team'
import Player    from './Player'
import Camera    from './Camera'
import Audio     from './Audio'
import { Actions, Sides } from './enums'


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
    this.stadium = this.world.addChild(new Stadium({ x: 0, y: -83 }))

    // create container to hold sortable elements
    this.world.background = this.world.addChild(new PIXI.Container())

    // create container to hold sortable elements
    this.world.foreground = this.world.addChild(new PIXI.Container())

    // create ball
    this.ball = this.world.foreground.addChild(new Ball({ app: this, x: 0, y: 0 }))

    // create teams
    this.teams = [
      new Team({ app: this, side: Sides.N, color: 'red' }),
      new Team({ app: this, side: Sides.S, color: 'blue' })
    ]

    //this.player = this.world.foreground.addChild(new Player({ app: this, team: null, x: 0, y: -12 }))

    // create goals
    this.goalN = this.world.foreground.addChild(new Goal({ side: Sides.N, x: 0, y: -342 }))
    this.goalS = this.world.foreground.addChild(new Goal({ side: Sides.S, x: 0, y: 342 }))

    // create camera
    this.camera = this.world.addChild(new Camera({
      world: this.world, target: this.player || null, offset: { x: 0, y: 83 }
    }))
  }


  render() {
    if (!this.world) {
      return
    }

    if (this.player) {
      const dir = this.keyboard.getDirection()
      const action = this.keyboard.getAction()

      if (dir === null) {
        this.player.stop()
      } else {
        this.player.move(dir)
      }

      if (action === Actions.kick) {
        this.player.shoot()
      }
    }

    this.updateLayersOrder(this.world.background)
    this.updateLayersOrder(this.world.foreground)
  }

  updateLayersOrder(layer) {
    layer.children.sort(function(a, b) {
        a.y = a.y || 0;
        b.y = b.y || 0;
        return a.y - b.y
    })
  }
}



export default App
