const Colors = {

  generateRandomColor: (oldColor = null) => {

    const red = Math.random() * 256
    const green = Math.random() * 256
    const blue = Math.random() * 256

    // mix the color
    if (oldColor !== null) {
        red = (red + oldColor.r) / 2;
        green = (green + oldColor.g) / 2;
        blue = (blue + oldColor.b) / 2;
    }

    const color = new rgb(red, green, blue);
    return color;
  }
}

export default Colors
