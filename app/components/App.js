//import pubsub    from 'pubsub-js'
//import Tilesets  from './Tilesets'
import { randomInt } from './lib/random'
import Game      from './Game'


export class App extends PIXI.Container {
  constructor(props) {
    super()
    //pubsub.subscribe('render', this.render.bind(this))

    this.props = props

    // load application assets
    this.loadAssets()
    //this.init()
  }

  loadAssets() {
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

      loader.add('drop',         '/assets/audio/game/drop.wav')
            .add('windy',         '/assets/audio/game/windy.wav')

      loader.load((loader, res) => { this.init(res) })
  }


  init(res) {
    const ids = Object.keys(res)
    this.game = this.addChild(new Game({
      playerId: ids[randomInt(0, ids.length - 1)],
      renderer: this.props.renderer,
      center: {
        x: parseInt(this.props.renderer.width / 2),
        y: parseInt(this.props.renderer.height / 2)
      }
    }))
  }
}



export default App
