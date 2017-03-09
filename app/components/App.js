import pubsub             from 'pubsub-js'

import { rectangle }      from './utils'
import { keyboard }       from './Keyboard.js'

import Tilesets           from './Tilesets'
import Player             from './Player'
import { Directions }     from './enums'


export class App extends PIXI.Container {

  constructor(props) {
    super()
    pubsub.subscribe('render', this.render.bind(this))

    this.props = props

    // create a 100x100 white rectangle with a 10px black border at position 10,10
    //this.addChild(rectangle(10, 10, 100, 100, 0xFFFFFF, 0x000000, 1));

    const tilesets = new Tilesets(this.init.bind(this))
  }


  init(sprites) {
      //console.log('received callback in main after all tilesets loaded', this)
      const x = this.props.renderer.width / 2
      const y = this.props.renderer.height / 2
      this.player = this.addChild(new Player({ color: 'red', x, y }))
      //setPlayerAnim(sprites.playerShadow.N)
      //setPlayerAnim(sprites.playerRed.N)

      //setPlayer(sprites.playerRed)
      // player = new Player('red')
      // player.x = app.renderer.width / 2
      // player.y = app.renderer.height / 2
      // app.stage.addChild(player)
      //
      // console.log('Player:', player)
  }


  render() {
    //console.log('rendering', this)
    this.setKeyboardInteraction()
  }


  setKeyboardInteraction() {
    // 37: left 38: up 39: right 40: down
    //var keyObject = keyboard(37);
    keyboard(37).press = () => { this.player.move(Directions.W) }
    keyboard(38).press = () => { this.player.move(Directions.N) }
    keyboard(39).press = () => { this.player.move(Directions.E) }
    keyboard(40).press = () => { this.player.move(Directions.S) }

    // keyboard(37).release = () => { this.player.stop(Directions.W) }
    // keyboard(38).release = () => { this.player.stop(Directions.N) }
    // keyboard(39).release = () => { this.player.stop(Directions.E) }
    // keyboard(40).release = () => { this.player.stop(Directions.S) }

    // keyObject.release = () => {
    //   //key object released
    // }
  }
}

export default App
