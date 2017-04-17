import pubsub from 'pubsub-js'
import Bg from './Bg'
import Game from './Game'

import LabelStart from './ui/LabelStart'
import LabelScore from './ui/LabelScore'


export class App extends PIXI.Container {
  constructor(props) {
    super()
    pubsub.subscribe('gamestart', this.gameStart.bind(this))
    pubsub.subscribe('gameover', this.gameOver.bind(this))
    pubsub.subscribe('collision', this.onCollision.bind(this))

    this.props = props

    this.score = 0

    // BG
    this.bg = this.addChild(new Bg({ renderer: this.props.renderer }))

    // GAME
    this.game = this.addChild(new Game({ renderer: this.props.renderer }))

    // UI
    this.labelStart = this.addChild(new LabelStart({
        caption: 'TAP TO START',
        x: this.props.renderer.width / 2,
        y: this.props.renderer.height / 2
      })
    )
    this.labelScore= this.addChild(new LabelScore({
        caption: this.score.toString(),
        x: this.props.renderer.width / 2,
        y: 60
      })
    )
  }

  gameStart() {
    this.labelStart.hide()
    this.score = 0
    //this.labelScore.set(this.score.toString())
  }

  gameOver() {
    this.bg.setRandomColor()
    this.labelStart.show()
  }

  onCollision(e, params) {
    this.score += 1
    this.labelScore.set(this.score.toString())
  }
}

export default App
