import pubsub    from 'pubsub-js'
import Audio     from './Audio'

import Game      from './Game'
import Camera    from './Camera'
import Keyboard  from './Keyboard.js'


export class World extends PIXI.Container {

  constructor(props) {
    super()
    pubsub.subscribe('render', this.render.bind(this))

    this.center = { x: props.x, y: props.y }
    this.position.set(props.x, props.y)
    this.scale.set(1.0)

    // create game
    this.game = this.addChild(new Game({ world: this.world }))

    // create camera
    this.camera = this.addChild(new Camera({
      world: this, target: this.game.ball || null, offset: { x: 0, y: 83 }
    }))

    // create keyboard
    this.keyboard = new Keyboard()
  }


  render() {
    // update user interaction
    this.keyboard.updateUserControls(this.game)

    // sort layers
    this.sortLayers(this.game.background)
    this.sortLayers(this.game.foreground)
  }


  sortLayers(layer) {
    layer.children.sort(function(a, b) {
        a.y = a.y || 0;
        b.y = b.y || 0;
        return a.y - b.y
    })
  }

}

export default World
