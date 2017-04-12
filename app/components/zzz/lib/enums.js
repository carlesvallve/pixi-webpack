
// GAME OPTIONS

export const Options = {
  display: {
    areas: false,
    labels: {
      player: true
    }
  },
  audio: {
    enabled: true,
    masterVolume: 1
  }
}


// DIRECTIONS

export const Sides = {
  N:  'N',
  S: 'S'
}


export const Directions = {
  N:  'N',
  NE: 'NE',
  E:  'E',
  SE: 'SE',
  S:  'S',
  SW: 'SW',
  W:  'W',
  NW: 'NW'
}


export const DirectionVectors = {
  N:  { x: 0,  y: -1 },
  E:  { x: 1,  y: 0 },
  S:  { x: 0,  y: 1 },
  W:  { x: -1, y: 0 },

  NE: { x: 0.8,  y: -.8 },
  SE: { x: 0.8,  y: 0.8 },
  SW: { x: -0.8, y: 0.8 },
  NW: { x: -0.8, y: -0.8 }
}


export const VectorDirections = (v) => {
  let ang = v.deg()
  if (ang < 0) { ang += 360 }
  let dir = null
  if (ang >= 330 || ang <= 30)  { dir = Directions.E  }
  if (ang >= 30 && ang <= 60)   { dir = Directions.SE }
  if (ang >= 60 && ang <= 120)  { dir = Directions.S  }
  if (ang >= 120 && ang <= 150) { dir = Directions.SW }
  if (ang >= 150 && ang <= 210) { dir = Directions.W  }
  if (ang >= 210 && ang <= 240) { dir = Directions.NW }
  if (ang >= 240 && ang <= 300) { dir = Directions.N  }
  if (ang >= 300 && ang <= 330) { dir = Directions.NE }

  return dir
}


// STATES AND ACTIONS

export const Actions = {
  idle: 'idle',     // 1 frames
  run: 'run',       // 8 frames
  kick: 'kick',     // ? frames
  fall: 'fall',     // 3 frames
  tackle: 'tackle', // 1 frames
  throw: 'throw'    // 3 frames
}


export const GameStates = {
  idle: 'idle',
  reset: 'reset',
  kickoff: 'kickoff',
  play: 'play',

  out: 'out',
  corner: 'corner',
  goalKick: 'goalKick',
  fault: 'fault',
  penalty: 'penalty',
  goal: 'goal',

  control: 'control',
  kick: 'kick',
}
