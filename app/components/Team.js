//import pubsub from 'pubsub-js'
import Audio from './Audio'
import Player from './Player'
import { Sides } from './lib/enums'
import { getFormation, getRandomFormation } from './lib/formations'


export class Team {

  constructor(props) {
    //pubsub.subscribe('render', this.render.bind(this));

    this.game = props.game
    this.side = props.side
    this.color = props.color

    this.score = 0

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
      const player = this.game.foreground.addChild(new Player({
        game: this.game,
        team: this,
        num: i,
        x: this.formation.positions[i].x,
        y: this.baseY + this.formation.positions[i].y * this.separationY
      }))

      this.players.push(player)
      this.game.players.push(player)
    }
  }

  setAttacking() {
    if (this.game.teams) {
      this.game.teams[0].attacking = false
      this.game.teams[1].attacking = false
    }
    this.attacking = true
  }


  selectPlayer(num) {
     this.players[num].select()
     this.setAttacking()
  }


  selectNextPlayer() {
    let num = this.game.player.num + 1
    if (num > players.length) { num = 0 }
    selectPlayer(num)
  }


  scoreGoal(player) {
    //this.score += 1
    //Audio.play(Audio.sfx.whistle[1], 0.2 + Math.random() * 0.2, 1.0 + Math.random() * 0.2)
    //this.game.ball.reset()
  }

}

export default Team
