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
  }
}



export default App
