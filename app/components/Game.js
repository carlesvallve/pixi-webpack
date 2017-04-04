import pubsub    from 'pubsub-js'
//import Audio     from './Audio'


export class Game extends PIXI.Container {
  constructor(props) {
    super()

    // subscribe to game events
    pubsub.subscribe('render',    this.render.bind(this))

    // create game elements
    this.init()
  }

  // =================================
  // Game Initialization
  // =================================

  init() {
    console.log('creating game elements')
  }

  // =================================
  // Game Render
  // =================================

  render() {
    //console.log('rendering game')
  }



}

export default Game
