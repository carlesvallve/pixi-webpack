import pubsub from 'pubsub-js'
import Bg from './Bg'
import Game from './Game'


export class App extends PIXI.Container {
  constructor(props) {
    super()
    pubsub.subscribe('gamestart', this.gameStart.bind(this))
    pubsub.subscribe('gameover', this.gameOver.bind(this))

    this.props = props

    this.bg = this.addChild(new Bg({ renderer: this.props.renderer }))
    this.game = this.addChild(new Game({ renderer: this.props.renderer }))

    this.label = this.addChild(new PIXI.Text(
      'TAP TO START', {
        align: 'center',
        dropShadow: true,
        dropShadowDistance: 2,
        dropShadowAlpha: 0.6,
        dropShadowBlur: 0,
        dropShadowColor: 0x000000,
        fill: 0xFFFFFF,
        fontFamily: 'Helvetica',
        fontSize: 14,
        //stroke: 0x000000,
        //strokeThickness: 2
      })
    )
    this.label.anchor.set(0.5, 0.5)
    this.label.position.set(this.props.renderer.width / 2, this.props.renderer.height / 2)
  }

  gameStart() {
    this.label.visible = false
  }

  gameOver() {
    this.bg.setRandomColor()
    this.label.visible = true
  }
}

export default App
