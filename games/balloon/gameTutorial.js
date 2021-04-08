const arrowRight = document.getElementById("arrow-right")
const arrowLeft = document.getElementById("arrow-left")
const arrowUp = document.getElementById("arrow-up")
const arrowDown = document.getElementById("arrow-down")
const arrowKeys = document.getElementById("arrow-keys")
const arrowKeyHolder = document.getElementById("arrowKeyHolder")
const player = document.getElementById("player");
const playerImg = document.getElementById("playerImg");
const greenBalloon = document.getElementById("greenBalloon");
const redBalloon = document.getElementById("redBalloon");
const yellowBalloon = document.getElementById("yellowBalloon");

arrowKeyHolder.appendChild(arrowKeys)

const character_face_up = "https://res.cloudinary.com/dfulxq7so/image/upload/v1611950505/Yang_Back_2x_wfa5l1.png"
const character_face_down = "https://res.cloudinary.com/dfulxq7so/image/upload/v1611950509/Yang_Front_2x_j9ad21.png"
const character_face_left = "https://res.cloudinary.com/dfulxq7so/image/upload/v1611950538/Yang_RightSide_2x_i223zj.png"
const character_face_right = "https://res.cloudinary.com/dfulxq7so/image/upload/v1611950517/Yang_LeftSide_2x_qc1sg5.png"

let characterMovingSpeed = 2

let characterPos = {
    x: 65,
    y: 80
  }

let characterSize = {
    w: 7,
    h: 14
  }

let greenBalloonPos = {
    x: 38,
    y: 40
}

let redBalloonPos = {
    x: 63,
    y: 15 
}

let yellowBalloonPos = {
    x: 88,
    y: 40
}

const balloonSize = {
    w: 10,
    h: 20
}

player.style.left = `${characterPos.x}%`
player.style.top = `${characterPos.y}%`
player.style.width = `${characterSize.w}%`
player.style.height = `${characterSize.h}%`


greenBalloon.style.position = redBalloon.style.position = yellowBalloon.style.position = 'absolute'
greenBalloon.style.zIndex = redBalloon.style.zIndex = yellowBalloon.style.zIndex = 5
greenBalloon.style.width = redBalloon.style.width = yellowBalloon.style.width = `${balloonSize.w}%`
greenBalloon.style.height = redBalloon.style.height = yellowBalloon.style.height = `${balloonSize.h}%`
greenBalloon.style.left = `${greenBalloonPos.x}%`
greenBalloon.style.top = `${greenBalloonPos.y}%`
redBalloon.style.left = `${redBalloonPos.x}%`
redBalloon.style.top = `${redBalloonPos.y}%`
yellowBalloon.style.left = `${yellowBalloonPos.x}%`
yellowBalloon.style.top = `${yellowBalloonPos.y}%`

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
  

function handleKeyDown(e){
    if (e.key === "ArrowRight" ){
        arrowRight.style.backgroundColor = "#111F47"
        arrowLeft.style.backgroundColor = arrowUp.style.backgroundColor = arrowDown.style.backgroundColor = "#EFF5F5"
        characterPos.x = characterPos.x + characterMovingSpeed
        getCharacterMove("RIGHT")
        playerImg.src = character_image["RIGHT"]
        playerImg.style.transform = 'rotateY(360deg)'
    } else if (e.key === "ArrowLeft" ){
        arrowLeft.style.backgroundColor = "#111F47"
        arrowRight.style.backgroundColor = arrowUp.style.backgroundColor = arrowDown.style.backgroundColor = "#EFF5F5"
        characterPos.x = characterPos.x - characterMovingSpeed
        getCharacterMove("LEFT")
        playerImg.src = character_image["LEFT"]
        playerImg.style.transform = 'rotateY(180deg)'
    } else if (e.key === "ArrowDown" ){
        arrowDown.style.backgroundColor = "#111F47"
        arrowLeft.style.backgroundColor = arrowRight.style.backgroundColor = arrowUp.style.backgroundColor = "#EFF5F5"
        characterPos.y =  characterPos.y + characterMovingSpeed
        getCharacterMove("DOWN")
        playerImg.src = character_image["DOWN"]
    } else if (e.key === "ArrowUp" ){
        arrowUp.style.backgroundColor = "#111F47"
        arrowLeft.style.backgroundColor = arrowRight.style.backgroundColor = arrowDown.style.backgroundColor = "#EFF5F5"
        characterPos.y =  characterPos.y - characterMovingSpeed
        getCharacterMove("UP")
        playerImg.src = character_image["UP"]
    }

    player.style.left = `${characterPos.x}%`
    player.style.top = `${characterPos.y}%`
    player.style.width = `7%`
    player.style.height = `8%`

}

document.addEventListener("keydown", handleKeyDown)