import pubsub    from 'pubsub-js'
import Audio     from './Audio'

import Stadium   from './Stadium'
import Goal      from './Goal'
import Ball      from './Ball'
import Team      from './Team'
import Player    from './Player'

import { Options, GameStates, Actions, Sides } from './lib/enums'
import { rectangle, getBounds, getDistance } from './lib/geometry'


export class Game extends PIXI.Container {
  constructor(props) {
    super()

    // subscribe to game events
    pubsub.subscribe('render',    this.render.bind(this))
    pubsub.subscribe('kickoff',   this.kickoff.bind(this))
    pubsub.subscribe('out',       this.out.bind(this))
    pubsub.subscribe('corner',    this.corner.bind(this))
    pubsub.subscribe('goalKick',  this.goalKick.bind(this))
    pubsub.subscribe('goal',      this.goal.bind(this))
    pubsub.subscribe('fault',     this.fault.bind(this))
    pubsub.subscribe('penalty',   this.penalty.bind(this))

    // create game elements
    this.initElements()

    // start game
    this.kickoff()
  }

  // =================================
  // Game Initialization
  // =================================

  initElements() {
    // create stadium
    this.stadium = this.addChild(new Stadium({ x: 0, y: -83 }))

    // define reactangular areas in the game (pitch, goals, areas, etc)
    this.areas = {
      pitch: this.addChild(rectangle(-228, -342, 456, 684, 0x333333, 0x000000, 1, PIXI.blendModes.ADD)),
      areaN: this.addChild(rectangle(-148, -342, 296, 100, 0xff0000, 0x000000, 1, PIXI.blendModes.ADD)),
      areaS: this.addChild(rectangle(-148, 342-100, 296, 100, 0xff0000, 0x000000, 1, PIXI.blendModes.ADD)),
      goalN: this.addChild(rectangle(-34, -342-34, 68, 34, 0x0000ff, 0x000000, 1, PIXI.blendModes.ADD)),
      goalS: this.addChild(rectangle(-34, 342, 68, 34, 0x0000ff, 0x000000, 1, PIXI.blendModes.ADD))
    }

    for (let id in this.areas) {
      this.areas[id].visible = Options.display.areas
    }


    // create layer containers to hold sortable elements
    this.background = this.addChild(new PIXI.Container())
    this.foreground = this.addChild(new PIXI.Container())

    // create ball
    this.ball = this.foreground.addChild(new Ball({ game: this }))

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


  // =================================
  // Game state checks
  // =================================

  isIdle() {
    return this.isOut() ||
    this.state === GameStates.goal ||
    this.state === GameStates.fault ||
    this.state === GameStates.penalty
  }

  isOut() {
    const out =
      this.state === GameStates.out ||
      this.state === GameStates.corner ||
      this.state === GameStates.goalKick
    return out
  }

  // =================================
  // Game Events
  // =================================

  kickoff() {
    console.log('kickoff')
    this.ball.reset()
    this.wait(0.2, () => {
      this.state = GameStates.kickoff
      Audio.play(Audio.sfx.whistle[1], 0.2 + Math.random() * 0.2, 1.0 + Math.random() * 0.2)
    })
  }

  out(e) {
    console.log(e)
    this.state = GameStates.out
    Audio.play(Audio.sfx.whistle[1], 0.2 + Math.random() * 0.2, 1.0 + Math.random() * 0.2)
    this.wait(0.2, () => {
      this.kickoff()
    })

  }

  corner(e, side) {
    console.log(e, side)
    this.state = GameStates.corner
    Audio.play(Audio.sfx.whistle[1], 0.2 + Math.random() * 0.2, 1.0 + Math.random() * 0.2)
    this.wait(0.2, () => {
      this.kickoff()
    })
  }

  goalKick(e, side) {
    console.log(e, side)
    this.state = GameStates.goalKick
    Audio.play(Audio.sfx.whistle[1], 0.2 + Math.random() * 0.2, 1.0 + Math.random() * 0.2)
    this.wait(0.2, () => {
      this.kickoff()
    })
  }

  goal(e, player) {
    console.log(e, player)
    this.state = GameStates.goal
    Audio.play(Audio.sfx.whistle[1], 0.2 + Math.random() * 0.2, 1.0 + Math.random() * 0.2)
    this.wait(0.2, () => {
      this.kickoff()
    })
  }

  fault(e) {
    console.log(e)
    this.state = GameStates.fault
    Audio.play(Audio.sfx.whistle[1], 0.2 + Math.random() * 0.2, 1.0 + Math.random() * 0.2)
    this.wait(0.2, () => {
      this.kickoff()
    })
  }

  penalty(e) {
    console.log(e)
    this.state = GameStates.penalty
    Audio.play(Audio.sfx.whistle[1], 0.2 + Math.random() * 0.2, 1.0 + Math.random() * 0.2)
    this.wait(0.2, () => {
      this.kickoff()
    })
  }


  // =================================
  // Game Render
  // =================================

  render() {
    this.setActivePlayer()
  }

  wait(time, cb) {
    window.setTimeout(cb, time * 1000)
  }


  // =================================
  // Game functions
  // =================================

  setActivePlayer() {
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

}

export default Game
