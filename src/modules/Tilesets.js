export const Tilesets = (cb = null) => {

  const sprites = {}

  // pixi exposes a premade instance for you to use.
  const loader = PIXI.loader;

  // Chainable `add` to enqueue a resource
  //loader.add('scoreFont', 'assets/score.fnt');
  loader.add('playerBlue',   '/assets/img/simulation/player/player_blue/player_blue_data.json')
        .add('playerRed',    '/assets/img/simulation/player/player_red/player_red_data.json')
        .add('playerShadow', '/assets/img/simulation/player/player_shadow/player_shadow_data.json')

  // throughout the process multiple signals can be dispatched.
  loader.onProgress.add((loader, res) => { // called once per loaded/errored file
    console.log('Progress:', loader.progress + '%') //loader.progress + '%');
  })
  loader.onError.add((error) => { // called once per errored file
    console.log('Error:', error)
  })
  loader.onLoad.add((loader, res) => { // called once per loaded file
    //console.log('Loaded file:', res)
  })
  loader.onComplete.add((loader, res) => { // called once when the queued resources all load.
    //console.log('All files loaded', loader.progress + '%', res)
  })


  loader.load((loader, res) => {
    console.log(res)
      // resources is an object where the key is the name of the resource loaded and the value is the resource object.
      // They have a couple default properties:
      // - `url`: The URL that the resource was loaded from
      // - `error`: The error that happened when trying to load (if any)
      // - `data`: The raw data that was loaded
      // also may contain other properties based on the middleware that runs.

      //sprites.bunny = new PIXI.TilingSprite(resources.bunny.texture);
      //sprites.spaceship = new PIXI.TilingSprite(resources.spaceship.texture);
      //sprites.scoreFont = new PIXI.TilingSprite(resources.scoreFont.texture);

      // sprites.playerBlue = generatePlayerSprite('blue')
      // sprites.playerRed = generatePlayerSprite('red')
      // sprites.playerShadow = generatePlayerSprite('shadow')
      cb(sprites)
  });






}

export default Tilesets
