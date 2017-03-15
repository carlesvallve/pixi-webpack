//import pubsub from 'pubsub-js'
import Player from './Player'
import { Sides } from './enums'

export class Team {

  constructor(props) {
    //pubsub.subscribe('render', this.render.bind(this));

    this.app = props.app
    this.side = props.side
    this.color = props.color

    this.setFormation()
    this.createPlayers()
    this.selectPlayer(0)
  }

  setFormation() {
    this.direction = this.side === Sides.N ? 1 : -1
    this.baseY = 318 * this.direction
    this.separationY = 1.1
    const dy = 30 * -this.direction



    // 4-3-3
    this.formation = [
      { x: 0,    y: 0 },       // GK

      { x: -180, y: dy * 3 },  // RD
      { x: -70,  y: dy * 2 },  // CDR
      { x: 70,   y: dy * 2 },  // CDL
      { x: 180,  y: dy * 3 },  // LD

      { x: -80,  y: dy * 6 },  // MCR
      { x: 0,    y: dy * 4 },  // MCD
      { x: 80,   y: dy * 6 },  // MCL

      { x: -150, y: dy * 8  }, // FWR
      { x: 0,    y: dy * 9  }, // FWC
      { x: 150,  y: dy * 8  }, // FWL
    ]
  }

  createPlayers() {
    this.players = []

    for (let i = 0; i < this.formation.length; i++) {
      this.players.push(
        this.app.world.addChildAt(new Player({
          app: this.app,
          team: this,
          x: this.formation[i].x,
          y: this.baseY + this.formation[i].y * this.separationY
        }), 3)
      )
    }
  }

  selectPlayer(num) {
     this.app.player = this.players[num]
  }

  selectNextPlayer() {
    let num = this.app.player.num + 1
    if (num > players.length) { num = 0 }
    selectPlayer(num)
  }

}

export default Team
