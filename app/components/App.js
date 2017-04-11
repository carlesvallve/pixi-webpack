import Game from './Game'
import pubsub from 'pubsub-js'


export class App extends PIXI.Container {
  constructor(props) {
    super()

    //pubsub.subscribe('gameover', this.onGameover.bind(this))

    this.props = props
    this.game = this.addChild(new Game({ renderer: this.props.renderer }))
  }


}


export default App
