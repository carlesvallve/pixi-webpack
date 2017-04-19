const audioPath = './assets/audio/game/'
const imgPath = './assets/img/game/'

export const sfx =  {
  wind: PIXI.sound.Sound.from(audioPath + 'windy.wav'),
  drop: PIXI.sound.Sound.from(audioPath + 'drop.wav'),
  ding: PIXI.sound.Sound.from(audioPath + 'ding.wav'),
  huh: PIXI.sound.Sound.from(audioPath + 'huh.wav'),
  kick: PIXI.sound.Sound.from(audioPath + 'kick.wav'),
  alien: PIXI.sound.Sound.from(audioPath + 'kickalien.wav'),
  tennis: PIXI.sound.Sound.from(audioPath + 'tennis.wav'),
  bass: PIXI.sound.Sound.from(audioPath + 'bass.wav'),
  woosh: PIXI.sound.Sound.from(audioPath + 'woosh.wav'),
  squish: PIXI.sound.Sound.from(audioPath + 'squish.wav'),
  squish2: PIXI.sound.Sound.from(audioPath + 'squish2.wav'),
  flesh: PIXI.sound.Sound.from(audioPath + 'flesh.wav'),
  dingEcho: PIXI.sound.Sound.from(audioPath + 'ding-echo.wav'),
}

export const loadPlayerAssets = (cb) => {
  const loader = PIXI.loader
  loader.add('bitbucket', imgPath + 'png/bitbucket.png')
        .add('star',      imgPath + 'png/star.png')
  loader.load((loader, res) => { cb(res) })
}

export const loadPlayerAssets2 = (cb) => {
  const loader = PIXI.loader

  loader.add('air',         imgPath + 'svg/air.svg')
        .add('macys',       imgPath + 'svg/macys.svg')
        .add('matternet',   imgPath + 'svg/matternet.svg')
        .add('android',     imgPath + 'svg/android.svg')
        .add('apple',       imgPath + 'svg/apple.svg')
        .add('asana',       imgPath + 'svg/asana.svg')
        .add('baidu',       imgPath + 'svg/baidu.svg')
        .add('bigcartel',   imgPath + 'svg/bigcartel.svg')
        .add('bitbucket',   imgPath + 'svg/bitbucket.svg')
        .add('codio',       imgPath + 'svg/codio.svg')
        .add('diaspora',    imgPath + 'svg/diaspora.svg')
        .add('drupal',      imgPath + 'svg/drupal.svg')
        .add('ethereum',    imgPath + 'svg/ethereum.svg')
        .add('gitlab',      imgPath + 'svg/gitlab.svg')
        .add('googledrive', imgPath + 'svg/googledrive.svg')
        .add('gratipay',    imgPath + 'svg/gratipay.svg')
        .add('hipchat',     imgPath + 'svg/hipchat.svg')
        .add('json',        imgPath + 'svg/json.svg')
        .add('launchpad',   imgPath + 'svg/launchpad.svg')
        .add('moo',         imgPath + 'svg/moo.svg')
        .add('protoio',     imgPath + 'svg/protoio.svg')
        .add('react',       imgPath + 'svg/react.svg')
        .add('sentiayoga',  imgPath + 'svg/sentiayoga.svg')
        .add('tinder',      imgPath + 'svg/tinder.svg')
        .add('twitch',      imgPath + 'svg/twitch.svg')
        .add('twoo',        imgPath + 'svg/twoo.svg')
        .add('ubuntu',      imgPath + 'svg/ubuntu.svg')

    loader.load((loader, res) => {
      cb(res)
    })
}
