import pubsub             from 'pubsub-js'
import Keyboard           from './Keyboard.js'
import Tilesets           from './Tilesets'
import Stadium            from './Stadium'
import Player             from './Player'


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

    // create stadium
    this.stadium = this.addChild(new Stadium({ x, y }))

    // create player
    this.player = this.addChild(new Player({ color: 'red', x, y }))

    // sound test
    const sound = PIXI.sound.Sound.from('/assets/audio/bgm/music/synth-2.mp3')
    sound.volume = 0.25
    sound.loop = true
    sound.play()
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
