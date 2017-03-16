//import pubsub from 'pubsub-js'
import Player from './Player'
import { Sides } from './enums'
import { getFormation, getRandomFormation } from './formations'

export class Team {

  constructor(props) {
    //pubsub.subscribe('render', this.render.bind(this));

    this.app = props.app
    this.side = props.side
    this.color = props.color

    this.setFormation()
    this.createPlayers()
    this.selectPlayer(this.players.length - 1)

    console.log('Team', this.color, this.formation.id)
  }


  setFormation(id = null) {
    this.direction = this.side === Sides.N ? 1 : -1
    this.baseY = 318 * this.direction
    this.separationY = 1.1
    if (id === null) {
      this.formation = getRandomFormation(this.direction)
    } else {
      this.formation = getFormation(id, this.direction)
    }
  }


  createPlayers() {
    this.players = []

    for (let i = 0; i < this.formation.positions.length; i++) {
      this.players.push(
        this.app.world.foreground.addChild(new Player({
          app: this.app,
          team: this,
          x: this.formation.positions[i].x,
          y: this.baseY + this.formation.positions[i].y * this.separationY
        }))
      )
    }
  }

  selectPlayer(num) {
     this.app.player = this.players[num]

     if (this.app.camera) {
       this.app.camera.setTarget(this.app.player)
     }
  }

  selectNextPlayer() {
    let num = this.app.player.num + 1
    if (num > players.length) { num = 0 }
    selectPlayer(num)
  }

}

export default Team
