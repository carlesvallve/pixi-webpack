import pubsub    from 'pubsub-js'
import Audio     from './Audio'

import Stadium   from './Stadium'
import Goal      from './Goal'
import Ball      from './Ball'
import Team      from './Team'
import Player    from './Player'

import { Options, Actions, Sides } from './lib/enums'
import { rectangle, getBounds, getDistance } from './lib/geometry'


export class Game extends PIXI.Container {
  constructor(props) {
    super()
    pubsub.subscribe('render', this.render.bind(this))

    //this.options = getOptions()

    // create stadium
    this.stadium = this.addChild(new Stadium({ x: 0, y: -83 }))

    // define reactangular areas in the game (pitch, goals, areas, etc)
    this.setAreas()

    // create layer containers to hold sortable elements
    this.background = this.addChild(new PIXI.Container())
    this.foreground = this.addChild(new PIXI.Container())

    // create ball
    this.ball = this.foreground.addChild(new Ball({ game: this, x: 0, y: 0 }))

    // create teams
    this.players = [] // array that holds all players from both teams
    this.teams = [
      new Team({ game: this, side: Sides.N, color: 'red' }),
      new Team({ game: this, side: Sides.S, color: 'blue' })
    ]

    //this.player = this.foreground.addChild(new Player({ game: this, team: null, x: 0, y: -12 }))

    // create goals
    this.goalNSprite = this.foreground.addChild(new Goal({ side: Sides.N, x: 0, y: -342 }))
    this.goalSSprite = this.foreground.addChild(new Goal({ side: Sides.S, x: 0, y: 342 }))
  }


  setAreas() {
    this.areas = {
      pitch: this.addChild(rectangle(-228, -342, 456, 684, 0x333333, 0x000000, 1, PIXI.blendModes.ADD)),
      areaN: this.addChild(rectangle(-148, -342, 296, 100, 0xff0000, 0x000000, 1, PIXI.blendModes.ADD)),
      areaS: this.addChild(rectangle(-148, 342-100, 296, 100, 0xff0000, 0x000000, 1, PIXI.blendModes.ADD)),
      goalN: this.addChild(rectangle(-34, -342-34, 68, 34, 0x0000ff, 0x000000, 1, PIXI.blendModes.ADD)),
      goalS: this.addChild(rectangle(-34, 342, 68, 34, 0x0000ff, 0x000000, 1, PIXI.blendModes.ADD))
    }

    for (let id in this.areas) {
      this.areas[id].visible = Options.displayAreas
    }
  }


  setActivePlayer() {
    if (this.ball.isInactive()) {
      return
    }

    // get nearest player to the ball
    const player = this.getNearestPlayerTo(this.players, this.ball)

    if (player !== null && player !== this.player) {
      // reset old active player
      this.player.stop()
      this.ball.setBallControl(null)

      // select new active player
      player.team.selectPlayer(player.num)
    }
  }


  getNearestPlayerTo(players, element) {
    let nearestPlayer = null
    let d = 1000

    for (let i = 0; i < players.length; i++) {
      const dist = getDistance(players[i].position, element.position)
      if (dist < d) {
        d = dist
        nearestPlayer = players[i]
      }
    }

    return nearestPlayer
  }

  render() {
    this.setActivePlayer()
  }


  wait(time, cb) {
    window.setTimeout(cb, time * 1000)
  }

}

export default Game
