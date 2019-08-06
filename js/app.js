// Function to check if the rover is goinf out of limits
const roverOutOfLimits = (rover, movement) => {

  if (rover.direction === 'N') {

    if (rover.y === 0 && movement === 'forward') return false
    if (rover.y === 9 && movement === 'backward') return false

  } else if (rover.direction === 'S') {

    if (rover.y === 9 && movement === 'forward') return false
    if (rover.y === 0 && movement === 'backward') return false

  } else if (rover.direction === 'W') {

    if (rover.x === 0 && movement === 'forward') return false
    if (rover.x === 9 && movement === 'backward') return false
    
  } else {

    if (rover.x === 9 && movement === 'forward') return false
    if (rover.x === 0 && movement === 'backward') return false
  }

  return true
}


// Function to move forward
const moveForward = (rover) => {

  // Check if the rover can move
  if (!roverOutOfLimits(rover, "forward")) {
    console.log('The rover is going to roam off the map!')
    return
  }

  // The rover can move forward
  // Check where is heading and move
  switch (rover.direction) {

    case 'N':
    case 'S': rover.y += moves.forward[rover.direction]; break;
    default: rover.x += moves.forward[rover.direction]
  }

  console.log(rover)
}


// Function to move backward
const moveBackward = (rover) => {

  // Check if the rover is out of limits
  if (!roverOutOfLimits(rover, "backward")) {
    console.log(`The ${rover.name} is going to roam off the map!`)
    return
  }

  // The rover can move backwards
  switch (rover.direction) {

    case 'N':
    case 'S': rover.y += moves.backward[rover.direction]; break;
    default: rover.x += moves.backward[rover.direction]
  }
}


// Function to turn right
const turnRight = (rover) => {

  let newDirection

  // Check the current heading position of the rover
  switch (rover.direction) {

    case 'N': newDirection = 'E'; break;
    case 'E': newDirection = 'S'; break;
    case 'S': newDirection = 'W'; break;
    default: newDirection = 'N';
  }

  // Assign the new direction to the rover
  rover.direction = newDirection
}


// Function to turn left
const turnLeft = (rover) => {

  let newDirection

  // Check the current heading position of the rover
  switch (rover.direction) {

    case 'N': newDirection = 'W'; break;
    case 'W': newDirection = 'S'; break;
    case 'S': newDirection = 'E'; break;
    default: newDirection = 'N';
  }

  // Assign the new direction to the rover
  rover.direction = newDirection
}


// Function that revieve a list of the commands to execute them in order
const executeCommands = (rover, list) => {

  list.split('').map( command => {

    console.log(`Execute ${command}`)

    // Check the command to execute
    switch (command) {

      case 'r': turnRight(rover); break;
      case 'l': turnLeft(rover); break;
      case 'f': moveForward(rover); break;
      case 'b': moveBackward(rover); break;
      default: console.log('Invalid command')
    }
  })
}


// Object to store the movements that the rovers can do
const moves = {
  forward: {
    N: -1,
    E: 1,
    S: 1,
    W: -1
  },

  backward: {
    N: 1,
    E: -1,
    S: -1,
    W: 1
  }
}


// Rovers
const rovers = {
  ironhack: {
    name: "Ironhack's Mars rover",
    direction: 'N',
    x: 0,
    y: 0,
    travelLog: []
  }
}

// String to test the list of the commands
let commandList = 'rfrfflflfffrfrflffrfrf'

executeCommands(rovers.ironhack, commandList)
