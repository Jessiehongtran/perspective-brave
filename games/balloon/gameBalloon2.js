const container = document.getElementById("container")
const arrowKeyHolder = document.getElementById("arrowKeyHolder")
const arrowKeys = document.getElementById("arrow-keys")
const player = document.getElementById("player")
const redBalloon = document.getElementsByClassName("each-balloon red")[0]
const greenBalloon = document.getElementsByClassName("each-balloon green")[0]
const yellowBalloon = document.getElementsByClassName("each-balloon yellow")[0]

const characterPos = {
    x: 700,
    y: 400
}

let characterSize = {
    w: 140,
    h: 250
}

arrowKeyHolder.appendChild(arrowKeys)

player.style.position = 'absolute'
player.style.left = `${characterPos.x}px`
player.style.top = `${characterPos.y}px`
player.style.width = `${characterSize.w}px`
player.style.height = `${characterSize.h}px`

let adjustInd = 1

const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

// if (vw < 1792 && vw > 1400){
//   adjustInd = 0.99
// } else if (vw > 1000 && vw <= 1400){
//   adjustInd = 0.97
// }


const squareSize = 10*adjustInd
// const vw = 1792
// const vh = 1000
const cols = Math.floor(vw/squareSize)
const rows = Math.floor(vh/squareSize)


const squares = []
for (let r = 0; r < rows; r++){
  let squareRows = []
    for (let c = 0; c < cols; c++){
        eachSquare = document.createElement('div')
        eachSquare.setAttribute('id', 'eachSquare')
        eachSquare.style.width = `${squareSize}px`
        eachSquare.style.height = `${squareSize}px`
        eachSquare.style.position = 'absolute'
        eachSquare.style.left = `${c*squareSize}px`
        eachSquare.style.top = `${r*squareSize}px`
        eachSquare.style.border = '1px solid grey'
        eachSquare.style.zIndex = '5'

        //map out walkable path   
        // for (let k = 0; k < paths.length ; k++){
        //     if (r >= paths[k].r1 && r <= paths[k].r2 && c >= paths[k].c1 && c <= paths[k].c2){
        //         eachSquare.style.backgroundColor = "red"
        //     }
        // }

        squareRows.push(eachSquare)

        if (r === 35 && c === 108){
          eachSquare.style.backgroundColor = 'red'
        }
        if (r === 36 && c >= 107 && c <= 109){
          eachSquare.style.backgroundColor = 'red'
        }
        if (r === 37 && c >= 105 && c <= 111){
          eachSquare.style.backgroundColor = 'red'
        }
        if (r === 38 && c >= 103 && c <= 113){
          eachSquare.style.backgroundColor = 'red'
        }
        if (r === 39 && c >= 101 && c <= 115){
          eachSquare.style.backgroundColor = 'red'
        }
        if (r === 40 && c >= 99 && c <= 117){
          eachSquare.style.backgroundColor = 'red'
        }
        if (r === 41 && c >= 97 && c <= 119){
          eachSquare.style.backgroundColor = 'red'
        }
        if (r === 42 && c >= 95 && c <= 121){
          eachSquare.style.backgroundColor = 'red'
        }
        if (r === 43 && c >= 93 && c <= 123){
          eachSquare.style.backgroundColor = 'red'
        }
        if (r === 44 && c >= 92 && c <= 124){
          eachSquare.style.backgroundColor = 'red'
        }
        if (r === 45 && c >= 91 && c <= 125){
          eachSquare.style.backgroundColor = 'red'
        }
        if (r === 46 && c >= 90 && c <= 126){
          eachSquare.style.backgroundColor = 'red'
        }
        if (r === 47 && c >= 89 && c <= 127){
          eachSquare.style.backgroundColor = 'red'
        }
        if (r === 48 && c >= 90 && c <= 126){
          eachSquare.style.backgroundColor = 'red'
        }
        if (r === 49 && c >= 92 && c <= 124){
          eachSquare.style.backgroundColor = 'red'
        }

        container.appendChild(eachSquare)
    }
    squares.push(squareRows)
}



//Initiate character movement image variables
let character_image = {
    "UP": "",
    "DOWN": "",
    "LEFT": "",
    "RIGHT": ""
  }
  
  //Initiate variables to keep track image index
  let moveInd = {
    "UP": 0,
    "DOWN": 0,
    "LEFT": 0,
    "RIGHT": 0
  }


//Function to get character image file (that is stored locally)
function getCharacterImg(dir, id){
    if (id < 10){
      id = "0" + id.toString()
    } 
    if (dir === "UP"){
      return `../../asset/Yang_Walk_UP/Yang_Walk_UP_000${id}.png`
    } else if (dir === "DOWN"){
      return `../../asset/Yang_Walk_DN/Yang_Walk_DN_000${id}.png`
    } else if (dir === "LEFT" || dir === "RIGHT"){
      return `../../asset/Yang_Walk_LR/Yang_Walk_LR_000${id}.png`
    } 
  }
  
  const maxImageInd = 15
  
//Function to get a movement
function getCharacterMove(dir){
    character_image[dir] = getCharacterImg(dir, moveInd[dir])
    moveInd[dir] += 1
    if (moveInd[dir] >= maxImageInd){
      moveInd[dir] = 0
    } 
  }

let redInd = 1
let characterMovingSpeed = 30

function updatePositions(){
    redInd = 3
    redBalloon.style.left = `${59 + redInd*2}%`

}

function handleKeyDown(e){
    if (e.key === "ArrowRight"){
        characterPos.x = characterPos.x + characterMovingSpeed
        getCharacterMove("RIGHT")
        playerImg.src = character_image["RIGHT"]
        playerImg.style.transform = 'rotateY(360deg)'
    } else if (e.key === "ArrowLeft"){
        characterPos.x = characterPos.x - characterMovingSpeed
        getCharacterMove("LEFT")
        playerImg.src = character_image["LEFT"]
        playerImg.style.transform = 'rotateY(180deg)'
    } else if (e.key === "ArrowDown"){
        characterPos.y = characterPos.y + characterMovingSpeed
        getCharacterMove("DOWN")
        playerImg.src = character_image["DOWN"]
    } else if (e.key === "ArrowUp"){
        characterPos.y = characterPos.y - characterMovingSpeed
        getCharacterMove("UP")
        playerImg.src = character_image["UP"]
    } 

    characterSize = {
      w: 100,
      h: 100
    }

    player.style.left = `${characterPos.x}px`
    player.style.top = `${characterPos.y}px`
    player.style.width = `${characterSize.w}px`
    player.style.height = `${characterSize.h}px`
}

document.addEventListener('resize', updatePositions);
document.addEventListener("keydown", handleKeyDown)