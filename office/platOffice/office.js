const characterPos = {
  x: 50,
  y: 60
}

console.log('characterPos.x', characterPos.x, 'characterPos.y', characterPos.y)
console.log(window.innerWidth, window.innerHeight)

const arrowLeft = document.getElementById("arrow-left")
const arrowDown = document.getElementById("arrow-down")
const arrowRight = document.getElementById("arrow-right")
const arrowUp = document.getElementById("arrow-up")
const instruction = document.getElementById("instruction")
const leftSlide1 = document.getElementById("leftSlide1")
const leftSlide2 = document.getElementById("leftSlide2")
const rightSlide1 = document.getElementById("rightSlide1")
const rightSlide2 = document.getElementById("rightSlide2")
const guideToSparkling = document.getElementById("guideToSparkling")
const arrowKeys = document.getElementById("arrow-keys")
const arrowKeyHolder = document.getElementById("arrowKeyHolder")
const newArrowKeyPlaceHolder = document.getElementById("newArrowKeyPlaceHolder")
arrowKeyHolder.appendChild(arrowKeys)

const character_face_up = "https://res.cloudinary.com/dfulxq7so/image/upload/v1611950505/Yang_Back_2x_wfa5l1.png"
const character_face_down = "https://res.cloudinary.com/dfulxq7so/image/upload/v1611950509/Yang_Front_2x_j9ad21.png"
const character_face_left = "https://res.cloudinary.com/dfulxq7so/image/upload/v1611950538/Yang_RightSide_2x_i223zj.png"
const character_face_right = "https://res.cloudinary.com/dfulxq7so/image/upload/v1611950517/Yang_LeftSide_2x_qc1sg5.png"

const player = document.getElementById("player");
const playerImg = document.getElementById("playerImg");
player.style.left = `${characterPos.x}%`
player.style.top = `${characterPos.y}%`

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
    if (e.key === "ArrowRight"){
        // playerImg.src = character_face_right
        arrowRight.style.backgroundColor = "#111F47"
        arrowLeft.style.backgroundColor = arrowUp.style.backgroundColor = arrowDown.style.backgroundColor = "#EFF5F5"
        characterPos.x = characterPos.x + 1
        getCharacterMove("RIGHT")
        playerImg.src = character_image["RIGHT"]
        playerImg.style.transform = 'rotateY(360deg)'
    } else if (e.key === "ArrowLeft"){
        // playerImg.src = character_face_left
        arrowLeft.style.backgroundColor = "#111F47"
        arrowRight.style.backgroundColor = arrowUp.style.backgroundColor = arrowDown.style.backgroundColor = "#EFF5F5"
        characterPos.x = characterPos.x - 1
        getCharacterMove("LEFT")
        playerImg.src = character_image["LEFT"]
        playerImg.style.transform = 'rotateY(180deg)'
    } else if (e.key === "ArrowDown"){
        // playerImg.src = character_face_down
        arrowDown.style.backgroundColor = "#111F47"
        arrowLeft.style.backgroundColor = arrowRight.style.backgroundColor = arrowUp.style.backgroundColor = "#EFF5F5"
        characterPos.y = characterPos.y + 1
        getCharacterMove("DOWN")
        playerImg.src = character_image["DOWN"]
    } else if (e.key === "ArrowUp"){
        // playerImg.src = character_face_up
        arrowUp.style.backgroundColor = "#111F47"
        arrowLeft.style.backgroundColor = arrowRight.style.backgroundColor = arrowDown.style.backgroundColor = "#EFF5F5"
        characterPos.y = characterPos.y - 1
        getCharacterMove("UP")
        playerImg.src = character_image["UP"]
    }

    
    player.style.left = `${characterPos.x}%`
    player.style.top = `${characterPos.y}%`
}

function removeTutorial(){
    //hide instruction
    instruction.style.display = 'none'
    //change character position
    characterPos.x = 40
    characterPos.y = 50
    player.style.left = `${characterPos.x}%`
    player.style.top = `${characterPos.y}%`
    //show left slide 2
    leftSlide2.style.display = 'block'
    //hide right slide 1 and show right slide 2
    rightSlide1.style.display = 'none'
    rightSlide2.style.display = 'block'
    //show guideToSparkling
    guideToSparkling.style.display = 'block'
    //remove arrow keys from current holder and move to new position
    let originalArrowKeys  = arrowKeyHolder.removeChild(arrowKeys)
    newArrowKeyPlaceHolder.appendChild(originalArrowKeys)
}

function addTutorial(){
    //show instruction
    instruction.style.display = 'block'
    //hide left slide 1
    leftSlide1.style.display = 'none'
    //add arrow keys
    arrowKeyHolder.appendChild(arrowKeys)
}

function rectArea(x1, y1, x2, y2, x3, y3, x4, y4){
    return Math.floor(Math.sqrt(Math.pow(x1-x4,2) + Math.pow(y1-y4,2))*Math.sqrt(Math.pow(x3-x4,2) + Math.pow(y3-y4,2)))
  }

function dist(x1, y1, x2, y2){
    return Math.sqrt(Math.pow(x1-x2,2) + Math.pow(y1-y2,2))
  }

function triangArea(x1, y1, x2, y2, x3, y3){
    const a = dist(x1, y1, x2, y2)
    const b = dist(x1, y1, x3, y3)
    const c = dist(x2, y2, x3, y3)
    const p = a + b + c
    const s = p/2
    return Math.floor(Math.sqrt(s*(s-a)*(s-b)*(s-c)))
  }

function isInsideRectangle(rect, target){
    const topLeft = rect[0]
    const topRight = rect[1]
    const bottomRight = rect[2]
    const bottomLeft = rect[3]

    if (  triangArea(topLeft.x, topLeft.y, target.x, target.y, bottomLeft.x, bottomLeft.y) 
        + triangArea(topLeft.x, topLeft.y, target.x, target.y, topRight.x, topRight.y)
        + triangArea(topRight.x, topRight.y, target.x, target.y, bottomRight.x, bottomRight.y)
        + triangArea(bottomRight.x, bottomRight.y, target.x, target.y, bottomLeft.x, bottomLeft.y) 
        > rectArea(topLeft.x, topLeft.y, topRight.x, topRight.y, bottomRight.x, bottomRight.y, bottomLeft.x, bottomLeft.y)
        ) {
          return false
        }
    return true
  }

document.addEventListener("keydown", handleKeyDown)