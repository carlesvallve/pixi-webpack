import { randomInt } from './random'

export const getFormation = (id, direction) => {
  const dy = 30 * -direction

  const formations = {
    442: [
      { x: 0,    y: 0      }, // GK

      { x: -180, y: dy * 3 }, // RD
      { x: -70,  y: dy * 2 }, // CDR
      { x: 70,   y: dy * 2 }, // CDL
      { x: 180,  y: dy * 3 }, // LD

      { x: -140, y: dy * 6 }, // MCR
      { x: -50,  y: dy * 5 }, // MCDR
      { x: 50,   y: dy * 5 }, // MCDL
      { x: 140,  y: dy * 6 }, // MCL

      { x: -90,  y: dy * 9 }, // FWR
      { x: 90,   y: dy * 9 }, // FWL
    ],

    433: [
      { x: 0,    y: 0      }, // GK

      { x: -180, y: dy * 3 }, // RD
      { x: -70,  y: dy * 2 }, // CDR
      { x: 70,   y: dy * 2 }, // CDL
      { x: 180,  y: dy * 3 }, // LD

      { x: -80,  y: dy * 5 }, // MCR
      { x: 0,    y: dy * 4 }, // MCD
      { x: 80,   y: dy * 5 }, // MCL

      { x: -150, y: dy * 7 }, // FWR
      { x: 0,    y: dy * 8 }, // FWC
      { x: 150,  y: dy * 7 }, // FWL
    ],

    352: [
      { x: 0,    y: 0      }, // GK

      { x: -120, y: dy * 3 }, // RD
      { x: 0,    y: dy * 2 }, // CDR
      { x: 120,  y: dy * 3 }, // LD

      { x: -40,  y: dy * 4 }, // MCDR
      { x: 40,   y: dy * 4 }, // MCDL
      { x: -160, y: dy * 5 }, // MCR
      { x: 160,  y: dy * 5 }, // MCL
      { x: 0,    y: dy * 6 }, // MP

      { x: -60,  y: dy * 8 }, // FWR
      { x: 60,   y: dy * 8 }, // FWL
    ],

    532: [
      { x: 0,    y: 0      }, // GK

      { x: -180, y: dy * 4 }, // RD
      { x: -80,  y: dy * 3 }, // CDR
      { x: 0,    y: dy * 2 }, // CDR
      { x: 80,   y: dy * 3 }, // CDL
      { x: 180,  y: dy * 4 }, // LD

      { x: -120, y: dy * 6 }, // MCR
      { x: 0,    y: dy * 5 }, // MCD
      { x: 120,  y: dy * 6 }, // MCL

      { x: -70,  y: dy * 8 }, // FWR
      { x: 70,   y: dy * 8 }, // FWL
    ],
  }

  return {
    id: id,
    positions: formations[id]
  }
}


export const getRandomFormation = (direction) => {
  const formationArr = [442, 433, 352, 532]
  const id = formationArr[randomInt(0, formationArr.length - 1)]
  return getFormation(id, direction)
}
