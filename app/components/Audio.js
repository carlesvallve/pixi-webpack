import { randomInt } from './lib/random'
import { Options } from './lib/enums'

// Settings
const { enabled, masterVolume } = Options.audio

const Audio = {

  // Music

  bgm: {
    piano: [
      PIXI.sound.Sound.from('/assets/audio/bgm/music/piano-1.wav'),
      PIXI.sound.Sound.from('/assets/audio/bgm/music/piano-2.wav'),
      PIXI.sound.Sound.from('/assets/audio/bgm/music/piano-3.wav'),
      PIXI.sound.Sound.from('/assets/audio/bgm/music/piano-4.wav'),
      PIXI.sound.Sound.from('/assets/audio/bgm/music/piano-5.mp3')
    ],
    synth: [
      PIXI.sound.Sound.from('/assets/audio/bgm/music/synth-1.wav'),
      PIXI.sound.Sound.from('/assets/audio/bgm/music/synth-2.mp3'),
      PIXI.sound.Sound.from('/assets/audio/bgm/music/synth-3.mp3'),
    ]
  },

  // Sound Effects

  sfx: {

    step:
      PIXI.sound.Sound.from('/assets/audio/sfx/simulation/step.wav'),

    kick: [
      PIXI.sound.Sound.from('/assets/audio/sfx/simulation/ballkick_reverb1.mp3'),
      PIXI.sound.Sound.from('/assets/audio/sfx/simulation/ballkick_reverb2.mp3'),
      PIXI.sound.Sound.from('/assets/audio/sfx/simulation/ballkick_reverb3.mp3'),
      PIXI.sound.Sound.from('/assets/audio/sfx/simulation/ballkick_reverb4.mp3'),
      PIXI.sound.Sound.from('/assets/audio/sfx/simulation/ballkick_reverb5.mp3')
    ],

    ambience:
      PIXI.sound.Sound.from('/assets/audio/sfx/simulation/crowd_audience.mp3'),

    chant: [
      PIXI.sound.Sound.from('/assets/audio/sfx/simulation/crowd_chant1.mp3'),
      PIXI.sound.Sound.from('/assets/audio/sfx/simulation/crowd_chant2.mp3'),
      PIXI.sound.Sound.from('/assets/audio/sfx/simulation/crowd_chant3.mp3')
    ],

    miss: [
      PIXI.sound.Sound.from('/assets/audio/sfx/simulation/crowd_miss1.mp3'),
      PIXI.sound.Sound.from('/assets/audio/sfx/simulation/crowd_miss2.mp3'),
      PIXI.sound.Sound.from('/assets/audio/sfx/simulation/crowd_miss3.mp3')
    ],

    penalty: [
      PIXI.sound.Sound.from('/assets/audio/sfx/simulation/crowd_penalty1.mp3'),
      PIXI.sound.Sound.from('/assets/audio/sfx/simulation/crowd_penalty2.mp3'),
    ],

    shout: [
      PIXI.sound.Sound.from('/assets/audio/sfx/simulation/shout_reverb1.mp3'),
      PIXI.sound.Sound.from('/assets/audio/sfx/simulation/shout_reverb2.mp3'),
      PIXI.sound.Sound.from('/assets/audio/sfx/simulation/shout_reverb3.mp3'),
      PIXI.sound.Sound.from('/assets/audio/sfx/simulation/shout_reverb4.mp3'),
      PIXI.sound.Sound.from('/assets/audio/sfx/simulation/shout_reverb5.mp3'),
      PIXI.sound.Sound.from('/assets/audio/sfx/simulation/shout_reverb6.mp3'),
      PIXI.sound.Sound.from('/assets/audio/sfx/simulation/shout_reverb7.mp3')
    ],

    whistle: [
      PIXI.sound.Sound.from('/assets/audio/sfx/simulation/whistle_long.mp3'),
      PIXI.sound.Sound.from('/assets/audio/sfx/simulation/whistle_short.mp3'),
      PIXI.sound.Sound.from('/assets/audio/sfx/simulation/whistle_three.mp3')
    ]

  },

  // Methods

  play: (sound, volume = 1, speed = 1, loop = false) => {
    if (!enabled) { return }

    sound.volume = volume * masterVolume
    sound.speed = speed
    sound.loop = loop
    sound.play()
  },

  playRandom: (soundType, volume = 1, speed = 1, loop = false) => {
    if (!enabled) { return }

    const sound = soundType[randomInt(0, soundType.length - 1)]
    sound.volume = volume * masterVolume
    sound.speed = speed
    sound.loop = loop
    sound.play()
  }

}

export default Audio
