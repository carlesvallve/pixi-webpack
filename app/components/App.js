//import pubsub    from 'pubsub-js'
//import Tilesets  from './Tilesets'
import Game      from './Game'


export class App extends PIXI.Container {
  constructor(props) {
    super()
    //pubsub.subscribe('render', this.render.bind(this))

    this.props = props

    // load sprites and load game
    this.init()
  }


  init(sprites) {
    this.game = new Game()
  }
}



export default App
