//import pubsub    from 'pubsub-js'
import Tilesets  from './Tilesets'
import World     from './World'


export class App extends PIXI.Container {
  constructor(props) {
    super()
    //pubsub.subscribe('render', this.render.bind(this))

    this.props = props

    const tilesets = new Tilesets(this.init.bind(this))
  }


  init(sprites) {
    // create world
    this.world = this.addChild(new World({
      app: this,
      x: parseInt(this.props.renderer.width / 2),
      y: parseInt(this.props.renderer.height / 2)
    }))



    //this.game = this.world.addChild(new Game({ x: 0, y: 0 }))

    // create container to hold sortable elements
    // this.world.background = this.world.addChild(new PIXI.Container())
    //
    // // create container to hold sortable elements
    // this.world.foreground = this.world.addChild(new PIXI.Container())
    //
    // // create ball
    // this.ball = this.world.foreground.addChild(new Ball({ app: this, x: 0, y: 0 }))
    //
    // // create teams
    // this.players = [] // -> array that holds all players from both teams
    // this.teams = [
    //   new Team({ app: this, side: Sides.N, color: 'red' }),
    //   new Team({ app: this, side: Sides.S, color: 'blue' })
    // ]
    //
    // //this.player = this.world.foreground.addChild(new Player({ app: this, team: null, x: 0, y: -12 }))
    //
    // // create goals
    // this.goalN = this.world.foreground.addChild(new Goal({ side: Sides.N, x: 0, y: -342 }))
    // this.goalS = this.world.foreground.addChild(new Goal({ side: Sides.S, x: 0, y: 342 }))

    // // create camera
    // this.camera = this.world.addChild(new Camera({
    //   world: this.world, target: this.ball || null, offset: { x: 0, y: 83 }
    // }))
  }

  // getActivePlayer() {
  //   // get nearest player to the ball
  //   const player = this.getNearestPlayerTo(this.players, this.ball)
  //
  //   if (player !== null && player !== this.player) {
  //     // reset old active player
  //     this.player.stop()
  //     this.ball.setBallControl(null)
  //
  //     // select new active player
  //     player.team.selectPlayer(player.num)
  //   }
  // }
  //
  //
  // getNearestPlayerTo(players, element) {
  //   let nearestPlayer = null
  //   let d = 1000
  //
  //   for (let i = 0; i < players.length; i++) {
  //     const dist = getDistance(players[i].position, element.position)
  //     if (dist < d) {
  //       d = dist
  //       nearestPlayer = players[i]
  //     }
  //   }
  //
  //   return nearestPlayer
  // }


  render() {
    // if (!this.world) { return }
    //
    // // update user interaction
    // this.keyboard.updateUserControls(this)
    //
    // // get nearest player to the ball
    // this.getActivePlayer()
    //
    // // sort layers
    // this.sortLayers(this.world.background)
    // this.sortLayers(this.world.foreground)
  }



}



export default App
