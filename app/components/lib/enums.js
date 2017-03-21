export const Options = {
  display: {
    areas: false,
    labels: {
      player: true
    }
  }
}

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

export const Actions = {
  idle: 'idle', // 1 frame
  run: 'run', // 8 frames
  kick: 'kick',
  fall: 'fall', // 3 frames
  tackle: 'tackle', // 1 frame
  throw: 'throw' // 3 frames
}

export const States = {
  idle: 'idle',

  kickoff: 'kickoff',
  out: 'out',
  scoring: 'scoring'
  corner: 'corner',
  goalKick: 'goalKick',

  control: 'control',
  kick: 'kick',
}
