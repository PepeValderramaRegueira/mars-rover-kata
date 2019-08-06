// Function to move forward
const moveForward = (rover) => {

  // Check if the rover can move
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
    direction: 'N'
  }
}
