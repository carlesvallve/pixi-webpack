export const sfx =  {
  wind: PIXI.sound.Sound.from('/assets/audio/game/windy.wav'),
  drop: PIXI.sound.Sound.from('/assets/audio/game/drop.wav'),
  ding: PIXI.sound.Sound.from('/assets/audio/game/ding.wav'),
  huh: PIXI.sound.Sound.from('/assets/audio/game/huh.wav'),
  kick: PIXI.sound.Sound.from('/assets/audio/game/kick.wav'),
  alien: PIXI.sound.Sound.from('/assets/audio/game/kickalien.wav'),
  tennis: PIXI.sound.Sound.from('/assets/audio/game/tennis.wav'),
  bass: PIXI.sound.Sound.from('/assets/audio/game/bass.wav'),
  woosh: PIXI.sound.Sound.from('/assets/audio/game/woosh.wav'),
  squish: PIXI.sound.Sound.from('/assets/audio/game/squish.wav'),
  squish2: PIXI.sound.Sound.from('/assets/audio/game/squish2.wav'),
  flesh: PIXI.sound.Sound.from('/assets/audio/game/flesh.wav'),
  dingEcho: PIXI.sound.Sound.from('/assets/audio/game/ding-echo.wav'),
}

export const loadPlayerAssets = (cb) => {
  const loader = PIXI.loader

  loader.add('air',         '/assets/img/game/svg/air.svg')
        .add('macys',       '/assets/img/game/svg/macys.svg')
        .add('matternet',   '/assets/img/game/svg/matternet.svg')
        .add('android',     '/assets/img/game/svg/android.svg')
        .add('apple',       '/assets/img/game/svg/apple.svg')
        .add('asana',       '/assets/img/game/svg/asana.svg')
        .add('baidu',       '/assets/img/game/svg/baidu.svg')
        .add('bigcartel',   '/assets/img/game/svg/bigcartel.svg')
        .add('bitbucket',   '/assets/img/game/svg/bitbucket.svg')
        .add('codio',         '/assets/img/game/svg/codio.svg')
        .add('diaspora',         '/assets/img/game/svg/diaspora.svg')
        .add('drupal',         '/assets/img/game/svg/drupal.svg')
        .add('ethereum',         '/assets/img/game/svg/ethereum.svg')
        .add('gitlab',         '/assets/img/game/svg/gitlab.svg')
        .add('googledrive',         '/assets/img/game/svg/googledrive.svg')
        .add('gratipay',         '/assets/img/game/svg/gratipay.svg')
        .add('hipchat',         '/assets/img/game/svg/hipchat.svg')
        .add('json',         '/assets/img/game/svg/json.svg')
        .add('launchpad',         '/assets/img/game/svg/launchpad.svg')
        .add('moo',         '/assets/img/game/svg/moo.svg')
        .add('protoio',         '/assets/img/game/svg/protoio.svg')
        .add('react',         '/assets/img/game/svg/react.svg')
        .add('sentiayoga',         '/assets/img/game/svg/sentiayoga.svg')
        .add('tinder',         '/assets/img/game/svg/tinder.svg')
        .add('twitch',         '/assets/img/game/svg/twitch.svg')
        .add('twoo',         '/assets/img/game/svg/twoo.svg')
        .add('ubuntu',         '/assets/img/game/svg/ubuntu.svg')

    loader.load((loader, res) => {
      cb(res)
    })
}
