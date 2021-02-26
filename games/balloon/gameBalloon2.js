const arrowKeyHolder = document.getElementById("arrowKeyHolder")
const arrowKeys = document.getElementById("arrow-keys")
const player = document.getElementById("player")
const redBalloon = document.getElementsByClassName("each-balloon red")[0]
const greenBalloon = document.getElementsByClassName("each-balloon green")[0]
const yellowBalloon = document.getElementsByClassName("each-balloon yellow")[0]

const characterPos = {
    x: 60,
    y: 40
}

const characterSize = {
    w: 10,
    h: 15
}

arrowKeyHolder.appendChild(arrowKeys)

player.style.position = 'absolute'
player.style.left = `${characterPos.x}%`
player.style.top = `${characterPos.y}%`
player.style.width = `${characterSize.w}%`
player.style.height = `${characterSize.h}%`

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
let characterMovingSpeed = 2

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

    player.style.left = `${characterPos.x}%`
    player.style.top = `${characterPos.y}%`

}

document.addEventListener('resize', updatePositions);
document.addEventListener("keydown", handleKeyDown)