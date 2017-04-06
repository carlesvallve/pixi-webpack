import pubsub    from 'pubsub-js'
//import Audio     from './Audio'

//import StepSequencer from 'step-sequencer'


export class Game extends PIXI.Container {
  constructor(props) {
    super()

    // subscribe to game events
    pubsub.subscribe('render',    this.render.bind(this))

    // load assets
    const loader = PIXI.loader
    loader.add('air',         '/assets/img/game/icons/air.svg')
          .add('macys',       '/assets/img/game/icons/macys.svg')
          .add('matternet',   '/assets/img/game/icons/matternet.svg')
          .load((loader, res) => { this.init() })
  }

  // =================================
  // Game Initialization
  // =================================

  init() {
    console.log('creating game elements')

    const air = this.addChild(this.createSprite('air', 100, 100))
    console.log(air)
  }

  createSprite(id, x, y) {
    const texture = PIXI.Texture.fromImage(id);
    const sprite = new PIXI.Sprite(texture);

    sprite.position.set(x, y)
    sprite.anchor.set(0.5, 0.5)
    sprite.scale.set(0.5, 0.5)

    return sprite
  }

  // =================================
  // Game Render
  // =================================

  render() {
    //console.log('rendering game')
  }



}

export default Game
