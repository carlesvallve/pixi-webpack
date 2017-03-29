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
    pubsub.subscribe('reset',   this.reset.bind(this))
    pubsub.subscribe('out',       this.out.bind(this))
    pubsub.subscribe('corner',    this.corner.bind(this))
    pubsub.subscribe('goalKick',  this.goalKick.bind(this))
    pubsub.subscribe('goal',      this.goal.bind(this))
    pubsub.subscribe('fault',     this.fault.bind(this))
    pubsub.subscribe('penalty',   this.penalty.bind(this))

    //pubsub.subscribe('arrivedToFormation', this.arrivedToFormation.bind(this))

    // create game elements
    this.initElements()

    // start game
    this.reset(Sides.N)
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
    // TODO; probably we should organize this by side or color.
    //we also need a way to determine in which direction the team is attacking
    this.players = [] // array that holds all players from both teams
    this.playersOutOfFormation = []

    this.teams = [
      new Team({ game: this, side: Sides.N, num: 0, color: 'red' }),
      new Team({ game: this, side: Sides.S, num: 1, color: 'blue' })
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
    this.state === GameStates.reset ||
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
  // Kickoff
  // =================================

  reset(side) {
    // reset game and make players go back to formations
    this.state = GameStates.reset

    const team = this.getTeamBySide(side)
    console.log('reset ->', 'side', side, 'team', team.num)

    this.ball.reset()
    this.teams[0].reset(team === this.teams[0])
    this.teams[1].reset(team === this.teams[1])
    this.playersOutOfFormation = this.players.slice(0) // clone the array
    this.player = null
  }

  updateResetPhase() {
    if (this.state !== GameStates.reset) {
      return
    }

    // wait for all players to return to their original formation position
    for (let i = 0; i < this.playersOutOfFormation.length; i++) {
      const player = this.playersOutOfFormation[i]
      if (player.targetPoint === undefined) { continue }

      const dist = getDistance(player.position, player.targetPoint)
      if (dist === 0) {
        this.playersOutOfFormation.splice(i, 1);
      }
    }

    //console.log(this.playersOutOfFormation.length)
    if (this.playersOutOfFormation.length === 0) {
      this.kickoff()
    }
  }

  kickoff() {
    // select player and wait for user to start playing
    this.state = GameStates.kickoff
    console.log('kickoff')
  }

  play() {
    // start active game, enable controls and players ai, etc
    this.state = GameStates.play
    Audio.play(Audio.sfx.whistle[1], 0.2 + Math.random() * 0.2, 1.0 + Math.random() * 0.2)

    this.teams[0].play()
    this.teams[1].play()

    console.log('play!')
  }


  // =================================
  // Game Events
  // =================================

  out(e, props) {
    console.log(e, props)
    this.state = GameStates.out
    Audio.play(Audio.sfx.whistle[1], 0.2 + Math.random() * 0.2, 1.0 + Math.random() * 0.2)
    this.wait(0.2, () => {
      this.reset(this.getOppositeSide(props.player.team.side))
    })

  }

  corner(e, props) {
    console.log(e, props)
    this.state = GameStates.corner
    Audio.play(Audio.sfx.whistle[1], 0.2 + Math.random() * 0.2, 1.0 + Math.random() * 0.2)
    this.wait(0.2, () => {
      this.reset(this.getOppositeSide(props.side))
    })
  }

  goalKick(e, props) {
    console.log(e, props)
    this.state = GameStates.goalKick
    Audio.play(Audio.sfx.whistle[1], 0.2 + Math.random() * 0.2, 1.0 + Math.random() * 0.2)
    this.wait(0.2, () => {
      this.reset(props.side)
    })
  }

  goal(e, props) {
    console.log(e, props)
    this.state = GameStates.goal
    Audio.play(Audio.sfx.whistle[1], 0.2 + Math.random() * 0.2, 1.0 + Math.random() * 0.2)
    this.wait(0.2, () => {
      this.reset(props.side)
    })
  }

  fault(e, props) {
    console.log(e, props)
    this.state = GameStates.fault
    Audio.play(Audio.sfx.whistle[1], 0.2 + Math.random() * 0.2, 1.0 + Math.random() * 0.2)
    this.wait(0.2, () => {
      this.reset(this.getOppositeSide(props.player.team.side))
    })
  }

  penalty(e, props) {
    console.log(e, props)
    this.state = GameStates.penalty
    Audio.play(Audio.sfx.whistle[1], 0.2 + Math.random() * 0.2, 1.0 + Math.random() * 0.2)
    this.wait(0.2, () => {
      this.reset(this.getOppositeSide(props.player.team.side))
    })
  }


  // =================================
  // Game Render
  // =================================

  render() {
    this.updateResetPhase()
    this.setActivePlayer()
  }

  wait(time, cb) {
    window.setTimeout(cb, time * 1000)
  }


  // =================================
  // Game functions
  // =================================

  setActivePlayer() {
    if (this.isIdle() && this.state !== GameStates.kickoff) { return }

    // escape if we are actively controlling the selected player
    if (this.player && this.player.increments.length() > 0 && this.ball.targetPoint === null) {
      return
    }

    // get nearest player to the ball
    const player = this.getNearestPlayerToPoint(this.players, this.ball.position)

    if (player !== null && player !== this.player) {
      // reset old active player
      if (this.player !== null) {
        this.player.stop()
        this.ball.setBallControl(null)
      }

      // select new active player
      player.team.selectPlayer(player.num)
    }
  }


  getNearestPlayerToPoint(players, point) {
    let nearestPlayer = null
    let d = 1000

    for (let i = 0; i < players.length; i++) {
      const dist = getDistance(players[i].position, point)
      if (dist < d) {
        d = dist
        nearestPlayer = players[i]
      }
    }

    return nearestPlayer
  }

  getOppositeTeam(player) {
    return player.team.num === 0 ? this.teams[1] : this.teams[0]
  }

  getOppositeSide(side) {
    return side === Sides.N ? Sides.S : Sides.N
  }

  getTeamBySide(side) {
    if (this.teams[0].side === side) { return this.teams[0] }
    return this.teams[1]
  }

}

export default Game
