import { randomInt, randomNumber } from './lib/random'

// Settings
//const { enabled, masterVolume } = Options.audio

const enabled = false;
const masterVolume = 1;

const Audio = {

  sfx: {
    wind: PIXI.sound.Sound.from('/assets/audio/game/windy.wav'),
    drop: PIXI.sound.Sound.from('/assets/audio/game/drop.wav'),
    ding: PIXI.sound.Sound.from('/assets/audio/game/ding.wav'),
    huh: PIXI.sound.Sound.from('/assets/audio/game/huh.wav'),
    kick: PIXI.sound.Sound.from('/assets/audio/game/kick.wav'),
    alien: PIXI.sound.Sound.from('/assets/audio/game/kickalien.wav'),
    tennis: PIXI.sound.Sound.from('/assets/audio/game/tennis.wav'),
    bass: PIXI.sound.Sound.from('/assets/audio/game/bass.wav'),
  },

  // Methods

  play: (sound, volume = 1, speed = 1, loop = false) => {
    if (!enabled) { return }

    if (volume.constructor === Array) {
      volume = volume[randomNumber(volume[0], volume[1])]
    }

    if (speed.constructor === Array) {

      speed = randomNumber(speed[0], speed[1]) //speed[0] //[randomNumber(speed[0], speed[1])]
    }

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
