import pubsub             from 'pubsub-js'
import { rectangle }      from './utils'
import { keyboard }       from './Keyboard.js'
import { Directions }     from './enums'
import Tilesets           from './Tilesets'
import Player             from './Player'



export class App extends PIXI.Container {

  constructor(props) {
    super()
    pubsub.subscribe('render', this.render.bind(this))

    this.props = props

    this.keys = {
      up: false, down: false, left: false, right: false
    }

    // create a 100x100 white rectangle with a 10px black border at position 10,10
    //this.addChild(rectangle(10, 10, 100, 100, 0xFFFFFF, 0x000000, 1));

    const tilesets = new Tilesets(this.init.bind(this))
  }


  init(sprites) {
      console.log('received callback in main after all tilesets loaded', this)
      const x = parseInt(this.props.renderer.width / 2)
      const y = parseInt(this.props.renderer.height / 2)
      this.player = this.addChild(new Player({ color: 'red', x, y }))
  }


  render() {
    if (this.player) {
      this.setKeyboardInteraction()
    }
  }


  setKeyboardInteraction() {
    // 37: left 38: up 39: right 40: down

    keyboard(37).press = () => { this.keys.left = true }
    keyboard(38).press = () => { this.keys.up = true }
    keyboard(39).press = () => { this.keys.right = true }
    keyboard(40).press = () => { this.keys.down = true }

    keyboard(37).release = () => { this.keys.left = false }
    keyboard(38).release = () => { this.keys.up = false }
    keyboard(39).release = () => { this.keys.right = false }
    keyboard(40).release = () => { this.keys.down = false }

    let dir = null

    if (this.keys.up === true && this.keys.left === false && this.keys.right === false) { dir = Directions.N }
    if (this.keys.down === true && this.keys.left === false && this.keys.right === false) { dir = Directions.S }
    if (this.keys.left === true && this.keys.up === false && this.keys.down === false) { dir = Directions.W }
    if (this.keys.right === true && this.keys.up === false && this.keys.down === false) { dir = Directions.E }

    if (this.keys.up === true && this.keys.left === true) { dir = Directions.NW }
    if (this.keys.up === true && this.keys.right === true) { dir = Directions.NE }
    if (this.keys.down === true && this.keys.left === true) { dir = Directions.SW }
    if (this.keys.down === true && this.keys.right === true) { dir = Directions.SE }

    if (dir === null) {
      this.player.stop()
    } else {
      this.player.move(dir)
    }
  }
}

export default App
