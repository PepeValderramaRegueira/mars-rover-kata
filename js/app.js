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
  },

  rotate: {
    N: 0,
    E: 90,
    S: 180,
    W: 270
  }
}

// Object for the map. Contains all the obstacles
// If an element is different to 0, it's an obstacle
const map = [
  [0, 0, 0, 0, 0, 'Crater', 0, 0, 0, 0],
  [0, 0, 0, 'Martian rock', 0, 0, 0, 'Crater', 0, 0],
  [0, 'Remains of the Pathfinder probe', 0, 0, 0, 0, 0, 'Schiaparelli crater', 0, 0],
  [0, 0, 0, 0, 'Martian rock', 0, 0, 0, 0, 0],
  [0, 'Martian rock', 0, 0, 0, 0, 0, 0, 'Martian rock', 0],
  
  [0, 'Crater', 0, 0, 0, 0, 'Martian rock', 0, 0, 0],
  [0, 0, 'Cassini crater', 0, 0, 0, 0, 'Olympus Mons', 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 'Crater', 0, 0],
  [0, 0, 0, 0, 'Crater', 0, 0, 'Martian rock', 0, 0],
  [0, 0, 'Martian rock', 0, 0, 0, 0, 0, 0, 0],
]


// Rovers
const rovers = {
  ironmars: {
    name: "IronMars rover",
    direction: 'N',
    x: 0,
    y: 0,
    travelLog: [],
    id: 'ironmars-rover'
  },
  opportunity: {
    name: 'Opportunity rover',
    direction: 'N',
    x: 1,
    y: 8,
    travelLog: [],
    id: 'opportunity-rover'
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
    console.log(`The ${rover.name} is heading to a ${nextPosition.found}`)
    rover.travelLog.push(['Move forward', 'Obstacle found', nextPosition.found])
    return
  }

  // The rover can move forward
  // Check where is heading and move
  switch (rover.direction) {

    case 'N':
    case 'S': rover.y += moves.forward[rover.direction]; break;
    default: rover.x += moves.forward[rover.direction]
  }

  rover.travelLog.push(['Move forward', `x: ${rover.x}`, `y: ${rover.y}`])
}


// Function to move backward
const moveBackward = (rover) => {

  let nextPosition = getRoverNextPosition(rover, "backwards")

  // Check if the rover is out of limits
  if (!nextPosition.roverCanMove) {
    console.log(`The ${rover.name} is heading to a ${nextPosition.found}`)
    rover.travelLog.push(['Move backward', 'Obstacle found', nextPosition.found])
    return
  }

  // The rover can move backwards
  switch (rover.direction) {

    case 'N':
    case 'S': rover.y += moves.backward[rover.direction]; break;
    default: rover.x += moves.backward[rover.direction]
  }

  rover.travelLog.push(['Move backward', `x: ${rover.x}`, `y: ${rover.y}`])

  // console.log(rover)
}


// Function to turn right
const turnRight = (rover) => {

  let previousDirection = rover.direction,
      newDirection

  // Check the current heading position of the rover
  switch (rover.direction) {

    case 'N': newDirection = 'E'; break;
    case 'E': newDirection = 'S'; break;
    case 'S': newDirection = 'W'; break;
    default: newDirection = 'N';
  }

  // Add the travel log
  rover.travelLog.push(['Turn right', `Previous direction: ${previousDirection}`, `New direction: ${newDirection}`])

  // Assign the new direction to the rover
  rover.direction = newDirection
}


// Function to turn left
const turnLeft = (rover) => {

  let previousDirection = rover.direction,
      newDirection

  // Check the current heading position of the rover
  switch (rover.direction) {

    case 'N': newDirection = 'W'; break;
    case 'W': newDirection = 'S'; break;
    case 'S': newDirection = 'E'; break;
    default: newDirection = 'N';
  }

  // Add the travel log
  rover.travelLog.push(['Turn left', `Previous direction: ${previousDirection}`, `New direction: ${newDirection}`])

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

    document.getElementById(`${rover.id}`).style.transform = `rotate(${moves.rotate[rover.direction]}deg)`

    // Check where the rover is heading at
    switch (roverg.direction) {

      case 'N':
      case 'S': document.getElementById(`${rover.id}`).style.top = (rover.y * 30) + 5 + 'px'; break;
      default: document.getElementById(`${rover.id}`).style.left = (rover.x * 30) + 7 + 'px'
    }
  })
}

// String to test the list of the commands
// let commandList = 'rfrfflflfffrfrflffrfrf'
let commandList = 'rfrflfflffrf'

// executeCommands(rovers.ironhack, commandList)


// Functionality

const ironmars          = document.getElementById('ironmars-rover'),
      opportunity       = document.getElementById('opportunity-rover'),
      roversInfo        = document.getElementById('rovers'),
      welcomeMessage    = document.getElementById('welcome-message'),
      testCommandForms  = [...document.forms]

// Add the listener to close the welcome message
welcomeMessage.addEventListener('click', e => {

  // Check if the '¡Adelante!' button was clicked
  if (e.target.tagName === 'A') {
    welcomeMessage.classList.add('lightbox--is-closed')
  }
})

// Add the listener to the rover's modules
roversInfo.addEventListener('click', e => {

  // Check where was clicked
  const target = e.target

  if (target.dataset.move) {
    
    // A control arrow was clicked

    // Save the movement
    const move = target.dataset.move

    // Save the rover
    const rover = target.parentElement.parentElement.id
    
    // Check what was clicked
    switch (move) {

      case 'move-forward':
        moveForward(rovers[rover]);
        break;

      case 'turn-left':
        turnLeft(rovers[rover]);
        break;

      case 'turn-right':
        turnRight(rovers[rover]);
        break;

      case 'move-backward':
        moveBackward(rovers[rover]);
        break;
    }

    document.getElementById(`${rover}-rover`).style.transform = `rotate(${moves.rotate[rovers[rover].direction]}deg)`

    // Check where the rover is heading at
    switch (rovers[rover].direction) {

      case 'N':
      case 'S': document.getElementById(`${rover}-rover`).style.top = (rovers[rover].y * 30) + 5 + 'px'; break;
      default: document.getElementById(`${rover}-rover`).style.left = (rovers[rover].x * 30) + 7 + 'px'
    }
  }
})

// Add the listeners to the test commands forms
testCommandForms.map( form => form.addEventListener('submit', e => {

  // Prevent the form from being sent
  e.preventDefault()

  console.log(form.querySelector('input').value)

  // Execute the command list
  executeCommands(
    rovers[form.parentElement.id],
    form.querySelector('input').value
  )
}))