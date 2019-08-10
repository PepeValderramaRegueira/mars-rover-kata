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

// Object for the map. Contains all the obstacles
// If an element is different to 0, it's an obstacle
const map = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 'Martian rock', 0, 0, 0, 0, 0, 0],
  [0, 'Remains of the Pathfinder probe', 0, 0, 0, 0, 0, 'Schiaparelli crater', 0, 0],
  [0, 0, 0, 0, 'Martian rock', 0, 0, 0, 0, 0],
  [0, 'Martian rock', 0, 0, 0, 0, 0, 0, 'Martian rock', 0],
  
  [0, 0, 0, 0, 0, 0, 'Martian rock', 0, 0, 0],
  [0, 0, 'Cassini crater', 0, 0, 0, 0, 'Olympus Mons', 0, 0],
  [0, 0, 0, 'Martian rock', 0, 0, 0, 0, 0, 0],
  [0, 'Remains of the Opportunity rover', 0, 0, 0, 0, 0, 'Martian rock', 0, 0],
  [0, 0, 'Martian rock', 0, 0, 0, 0, 0, 0, 0],
]


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


// Get the rover's next possible positions (forwards
// and backwards)
const getRoverNextPosition = (rover, movement) => {

  /**
   * NOTE: how it is represented the coordinates of a rover in the map array?
   * The first idea that comes to mind may be the following:
   * 
   *    map[rovers[rover].x][rovers[rover].y], but this is wrong!
   * 
   * Let's suppose that the ironhack rover has the following coordinates:
   * 
   *    rovers.ironhack = {
   *      ...
   *      x: 4,
   *      y: 1
   *    }
   * 
   * To represent it in the map array, it would be as follows:
   * 
   *    map[rovers.ironhack.y][rovers.ironhack.x]
   */

  let nextPosition
  let nextPositionInfo

  // Variables that will containt what's around the rover
  let topPosition, bottomPosition, rightPosition, leftPosition
    
  // The assignments must be enclosed in a try catch block because if the next position
  // is off the map, itwill produce an exception ("Uncaught TypeError: Cannot read property
  // '[x]' of undefined")
  try {topPosition    = map[rover.y - 1][rover.x] } catch {topPosition = undefined}
  try {bottomPosition = map[rover.y + 1][rover.x] } catch {bottomPosition = undefined}
  try {rightPosition  = map[rover.y][rover.x +1]  } catch {rightPosition = undefined}
  try {leftPosition   = map[rover.y][rover.x - 1] } catch {leftPosition = undefined}

  // Check where the rover is heading and what movement wants to do
  // There are movements (like going forward heading North and going backwards heading South)
  // that are the same, so it is possible to optimize the movement check
  if ( (rover.direction === 'N' && movement === 'forwards') ||
    (rover.direction === 'S' && movement === 'backwards') ) nextPositionInfo = topPosition

  else if ( (rover.direction === 'N' && movement === 'backwards') ||
    (rover.direction === 'S' && movement === 'forwards') ) nextPositionInfo = bottomPosition

  else if ( (rover.direction === 'E' && movement === 'forwards') ||
    (rover.direction === 'W') && (movement === 'backwards') ) nextPositionInfo = rightPosition

  else if ( (rover.direction === 'E' && movement === 'backwards') ||
    (rover.direction === 'W' && movement === 'forwards') ) nextPositionInfo = leftPosition

  // Check the type of the next position
  // string = obstacle
  // int = free position
  if (typeof nextPositionInfo !== 'undefined') {
    switch (typeof nextPositionInfo) {

      case 'string': nextPosition = {roverCanMove: false, found: nextPositionInfo}; break;
      case 'number': nextPosition = {roverCanMove: true}; break;
    }
  } else {
    nextPosition = {roverCanMove: false, found: 'precipice off the map'}
  }
  
  return nextPosition
}


// Function to move forward
const moveForward = (rover) => {

  // Check if the rover can move
  // if (!roverOutOfLimits(rover, "forward")) {
  //   console.log('The rover is going to roam off the map!')
  //   return
  // }

  let nextPosition = getRoverNextPosition(rover, "forwards")

  if (!nextPosition.roverCanMove) {
    console.log(`The ${rover.name} is heading to a ${nextPosition.found}`); return
  }

  // The rover can move forward
  // Check where is heading and move
  switch (rover.direction) {

    case 'N':
    case 'S': rover.y += moves.forward[rover.direction]; break;
    default: rover.x += moves.forward[rover.direction]
  }

  rover.travelLog.push([rover.x, rover.y])

  // console.log(rover)
}


// Function to move backward
const moveBackward = (rover) => {

  let nextPosition = getRoverNextPosition(rover, "backwards")

  // Check if the rover is out of limits
  if (!nextPosition.roverCanMove) {
    console.log(`The ${rover.name} is heading to a ${nextPosition.found}`)
    return
  }

  // The rover can move backwards
  switch (rover.direction) {

    case 'N':
    case 'S': rover.y += moves.backward[rover.direction]; break;
    default: rover.x += moves.backward[rover.direction]
  }

  rover.travelLog.push([rover.x, rover.y])

  // console.log(rover)
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

    // console.log(`Execute ${command}`)

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

// String to test the list of the commands
// let commandList = 'rfrfflflfffrfrflffrfrf'
let commandList = 'rfrflfflffrf'

// executeCommands(rovers.ironhack, commandList)
