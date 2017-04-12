import Game from './Game'

export class App extends PIXI.Container {
  constructor(props) {
    super()

    this.props = props
    this.game = this.addChild(new Game({ renderer: this.props.renderer }))
  }

  updateLayersOrder() {
    this.children.sort(function(a,b) {
        a.zIndex = a.zIndex || 0;
        b.zIndex = b.zIndex || 0;
        return b.zIndex - a.zIndex
    })
  }
}

export default App
