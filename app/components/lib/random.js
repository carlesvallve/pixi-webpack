/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
export const randomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
export const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Returns a random item in given array
 */
export const randomArr = (arr) => {
    return arr[randomInt(0, arr.length -1)]
}
