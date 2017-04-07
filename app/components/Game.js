import pubsub    from 'pubsub-js'
import { drawShapes, roundRect } from './lib/geometry'
//import Audio     from './Audio'

//import StepSequencer from 'step-sequencer'


export class Game extends PIXI.Container {
  constructor(props) {
    super()

    // subscribe to game events
    pubsub.subscribe('render',    this.render.bind(this))

    // load assets
    const loader = PIXI.loader

    loader.add('air',         '/assets/img/game/svg/air.svg')
          .add('macys',       '/assets/img/game/svg/macys.svg')
          .add('matternet',   '/assets/img/game/svg/matternet.svg')
          .add('android',     '/assets/img/game/svg/android.svg')
          .add('apple',       '/assets/img/game/svg/apple.svg')
          .add('asana',       '/assets/img/game/svg/asana.svg')
          .add('baidu',       '/assets/img/game/svg/baidu.svg')
          .add('bigcartel',   '/assets/img/game/svg/bigcartel.svg')
          .add('bitbucket',   '/assets/img/game/svg/bitbucket.svg')
          .add('codio',         '/assets/img/game/svg/codio.svg')
          .add('diaspora',         '/assets/img/game/svg/diaspora.svg')
          .add('drupal',         '/assets/img/game/svg/drupal.svg')
          .add('ethereum',         '/assets/img/game/svg/ethereum.svg')
          .add('gitlab',         '/assets/img/game/svg/gitlab.svg')
          .add('googledrive',         '/assets/img/game/svg/googledrive.svg')
          .add('gratipay',         '/assets/img/game/svg/gratipay.svg')
          .add('hipchat',         '/assets/img/game/svg/hipchat.svg')
          .add('json',         '/assets/img/game/svg/json.svg')
          .add('launchpad',         '/assets/img/game/svg/launchpad.svg')
          .add('moo',         '/assets/img/game/svg/moo.svg')
          .add('protoio',         '/assets/img/game/svg/protoio.svg')
          .add('react',         '/assets/img/game/svg/react.svg')
          .add('sentiayoga',         '/assets/img/game/svg/sentiayoga.svg')
          .add('tinder',         '/assets/img/game/svg/tinder.svg')
          .add('twitch',         '/assets/img/game/svg/twitch.svg')
          .add('twoo',         '/assets/img/game/svg/twoo.svg')
          .add('ubuntu',         '/assets/img/game/svg/ubuntu.svg')

      loader.load((loader, res) => { this.init(res) })
  }

  // =================================
  // Game Initialization
  // =================================

  init(res) {
    console.log('creating game elements', res)

    const air = this.addChild(this.createSprite('launchpad', 100, 100, 0.25))
    console.log(air)

    this.addChild(drawShapes());
  }



  createSprite(id, x, y, sc) {
    const texture = PIXI.Texture.fromImage(id);
    const sprite = new PIXI.Sprite(texture);

    sprite.position.set(x, y)
    sprite.anchor.set(0.5, 0.5)
    sprite.width = 32
    sprite.height = 32
    //sprite.scale.set(sc)
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
