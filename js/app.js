// Function to check if the rover is goinf out of limits
const roverOutOfLimits = (rover) => {

  if (rover.direction === 'N') {

    if (rover.y === 0) return false

  } else if (rover.direction === 'S') {

    if (rover.y === 9) return false

  } else if (rover.direction === 'W') {

    if (rover.x === 0) return false
    
  } else {

    if (rover.x === 9) return false
  }

  return true
}


// Function to move forward
const moveForward = (rover) => {

  // Check if the rover can move
  if (!roverOutOfLimits(rover)) {
    console.log('The rover is going to roam off the map!')
    return
  }

  // The rover can move forward
  // Check where is heading and move
  switch (rover.direction) {

    case 'N': rover.y--; break;
    case 'S': rover.y++; break;
    case 'E': rover.x++; break;
    case 'W': rover.x--; break;
  }

  console.log(rover)
}


// Function to move backward
const moveBackward = (rover) => {

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

}


// Rovers
const rovers = {
  ironhack: {
    name: "Ironhack's Mars rover",
    direction: 'N',
    x: 0,
    y: 0
  }
}
