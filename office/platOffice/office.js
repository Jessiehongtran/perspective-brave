const characterPos = {
  x: 60,
  y: 60
}

const characterSize = {
  w: 8,
  h: 9
}

const sparklingPos = {
  x: 32,
  y: 47
}

const sparklingSize = {
  w: 5,
  h: 10
}

const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

console.log('vw', vw)
console.log('vh', vh)



const characterMovingSpeed = 2

const container = document.getElementById("container")
const arrowLeft = document.getElementById("arrow-left")
const arrowDown = document.getElementById("arrow-down")
const arrowRight = document.getElementById("arrow-right")
const arrowUp = document.getElementById("arrow-up")
const instruction = document.getElementById("instruction")
const leftSlide1 = document.getElementById("leftSlide1")
const leftSlide2 = document.getElementById("leftSlide2")
const leftSlide3 = document.getElementById("leftSlide3")
const rightSlide1 = document.getElementById("rightSlide1")
const rightSlide2 = document.getElementById("rightSlide2")
const arrowKeys = document.getElementById("arrow-keys")
const arrowKeyHolder = document.getElementById("arrowKeyHolder")
const newArrowKeyPlaceHolder = document.getElementById("newArrowKeyPlaceHolder")
const detailInstruction = document.getElementById("detail-instruction")
const welcome = document.getElementById("welcome")
const office = document.getElementById("office")
const keys = document.getElementById("keys")
const enterKey = document.getElementById("enter")
const header = document.getElementById("header")
const sparkling = document.getElementById("sparkling")
const player = document.getElementById("player");
const playerImg = document.getElementById("playerImg");
const sparklingImages = document.getElementsByClassName("sparklingImage")
const infoIcon = document.getElementById("infoIcon");
const hoverState = document.getElementById("hoverState");
const detailTutorial = document.getElementsByClassName("detail-tutorial")[0];
const walkingDirection = document.getElementsByClassName("walking-direction")[0];
const speakerIcon = document.getElementsByClassName("speakerIcon")[0];

arrowKeyHolder.appendChild(arrowKeys)

const character_face_up = "https://res.cloudinary.com/dfulxq7so/image/upload/v1611950505/Yang_Back_2x_wfa5l1.png"
const character_face_down = "https://res.cloudinary.com/dfulxq7so/image/upload/v1611950509/Yang_Front_2x_j9ad21.png"
const character_face_left = "https://res.cloudinary.com/dfulxq7so/image/upload/v1611950538/Yang_RightSide_2x_i223zj.png"
const character_face_right = "https://res.cloudinary.com/dfulxq7so/image/upload/v1611950517/Yang_LeftSide_2x_qc1sg5.png"

let can_go_left = true
let can_go_right = true
let can_go_down = true
let can_go_up = true
let curWalkingDir 


player.style.left = `${characterPos.x}%`
player.style.top = `${characterPos.y}%`
player.style.width = `${characterSize.w}%`
player.style.height = `${characterPos.h}%`
sparkling.style.left = `${sparklingPos.x}%`
sparkling.style.top = `${sparklingPos.y}%`
sparkling.style.width = `${sparklingPos.w}%`
sparkling.style.height = `${sparklingPos.h}%`


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

let sparklingInd 
let imgInd
//Function to show sparkling
function showSparkling(i){
  sparklingInd = 0
  imgInd = i
  displaySparklingImg()
}

function displaySparklingImg(){
  let fillInd = sparklingInd
  if (sparklingInd < 150){
    if (sparklingInd < 10){
      fillInd = "00" + sparklingInd.toString()
    } else if (sparklingInd >= 10 && sparklingInd < 100){
      fillInd = "0" + sparklingInd.toString()
    } 
    sparklingImages[parseInt(imgInd)].src = `../../asset/Blue_Sparkles/Sparkles_00${fillInd}.png`
    sparklingInd += 1
  } else {
    sparklingInd = 0
  }

  setTimeout(displaySparklingImg, 30)

}

function restrict(dir){
  if (dir === "UP"){
    can_go_up = can_go_left = can_go_right = false
    detailTutorial.innerHTML = `You can only go DOWN`
    walkingDirection.innerHTML = `You can only go DOWN`
    arrowDown.style.backgroundColor = "#F64141"
  } else if (dir === "DOWN"){
    can_go_down = can_go_left = can_go_right = false
    detailTutorial.innerHTML = `You can only go UP`
    walkingDirection.innerHTML = `You can only go UP`
    arrowUp.style.backgroundColor = "#F64141"
  } else if (dir === "LEFT"){
    can_go_up = can_go_down = can_go_left = false
    detailTutorial.innerHTML = `You can only go RIGHT`
    walkingDirection.innerHTML = `You can only go RIGHT`
    arrowRight.style.backgroundColor = "#F64141"
  } else if (dir === "RIGHT"){
    can_go_up = can_go_down = can_go_right = false
    detailTutorial.innerHTML = `You can only go LEFT`
    walkingDirection.innerHTML = `You can only go LEFT`
    arrowLeft.style.backgroundColor = "#F64141"
  }
  detailTutorial.style.color = "#F64141"
}


function handleKeyDown(e){
    if (e.key === "ArrowRight" && can_go_right){
        arrowRight.style.backgroundColor = "#111F47"
        arrowLeft.style.backgroundColor = arrowUp.style.backgroundColor = arrowDown.style.backgroundColor = enterKey.style.backgroundColor = "#EFF5F5"
        characterPos.x = characterPos.x + characterMovingSpeed
        getCharacterMove("RIGHT")
        playerImg.src = character_image["RIGHT"]
        playerImg.style.transform = 'rotateY(360deg)'
        curWalkingDir = "RIGHT"
    } else if (e.key === "ArrowLeft" && can_go_left){
        arrowLeft.style.backgroundColor = "#111F47"
        arrowRight.style.backgroundColor = arrowUp.style.backgroundColor = arrowDown.style.backgroundColor = enterKey.style.backgroundColor  = "#EFF5F5"
        characterPos.x = characterPos.x - characterMovingSpeed
        getCharacterMove("LEFT")
        playerImg.src = character_image["LEFT"]
        playerImg.style.transform = 'rotateY(180deg)'
        curWalkingDir = "LEFT"
    } else if (e.key === "ArrowDown" && can_go_down){
        arrowDown.style.backgroundColor = "#111F47"
        arrowLeft.style.backgroundColor = arrowRight.style.backgroundColor = arrowUp.style.backgroundColor = enterKey.style.backgroundColor  = "#EFF5F5"
        characterPos.y =  characterPos.y + characterMovingSpeed
        getCharacterMove("DOWN")
        playerImg.src = character_image["DOWN"]
        curWalkingDir = "DOWN"
    } else if (e.key === "ArrowUp" && can_go_up){
        arrowUp.style.backgroundColor = "#111F47"
        arrowLeft.style.backgroundColor = arrowRight.style.backgroundColor = arrowDown.style.backgroundColor = enterKey.style.backgroundColor  = "#EFF5F5"
        characterPos.y =  characterPos.y - characterMovingSpeed
        getCharacterMove("UP")
        playerImg.src = character_image["UP"]
        curWalkingDir = "UP"
    } else if (e.key === "Enter"){
        enterKey.style.backgroundColor = "#111F47"
        arrowLeft.style.backgroundColor = arrowRight.style.backgroundColor = arrowDown.style.backgroundColor = arrowUp.style.backgroundColor  = "#EFF5F5"
    }

    if (characterPos.x + characterSize.w/2 >= sparklingPos.x  && characterPos.x + characterSize.w/2 <= sparklingPos.x + sparklingSize.w
      && characterPos.y + characterSize.h >= sparklingPos.y && characterPos.y + characterSize.h <= sparklingPos.y + sparklingSize.h
      && e.key === "Enter"
      ){
        window.location.href = '../../scenario/scenario1/yangConversation.html'
      }

    player.style.left = `${characterPos.x}%`
    player.style.top = `${characterPos.y}%`

    if (
      //touch first table
      isInsideRectangle([{ x: 47, y: 54.5 }, { x: 41.5, y: 59 }, { x: 48, y: 65 }, { x: 53.5, y: 60.5 }], { x: characterPos.x + 3.5, y: characterPos.y + 6})
      //touch edge 1
      || isInsideRectangle([{ x: 35, y: 59 }, { x: 67, y: 84.5 }, { x: 63, y: 90 }, { x: 31, y: 64.5 }], { x: characterPos.x + 3.5, y: characterPos.y + 6})
      //touch array of tables
      || isInsideRectangle([{ x: 85, y: 50 }, { x: 93, y: 57 }, { x: 69, y: 77 }, { x: 61, y: 71 }], { x: characterPos.x + 3.5, y: characterPos.y + 6})
      //touch wall 1
      || isInsideRectangle([{ x: 47, y: 37 }, { x: 58, y: 37 }, { x: 58, y: 57 }, { x: 47, y: 57 }], { x: characterPos.x + 3.5, y: characterPos.y + 6})
      //touch cupboard 1
      || isInsideRectangle([{ x: 65, y: 57 }, { x: 82, y: 44 }, { x: 84, y: 45.5 }, { x: 67, y: 58.5 }], { x: characterPos.x + 3.5, y: characterPos.y + 6})
      //touch wall 2
      || isInsideRectangle([{ x: 65, y: 57 }, { x: 70, y: 57 }, { x: 70, y: 45 }, { x: 65, y: 45 }], { x: characterPos.x + 3.5, y: characterPos.y + 6})
      //touch table inside
      || isInsideRectangle([{ x: 55, y: 44 }, { x: 60, y: 49 }, { x: 70, y: 40 }, { x: 65, y: 35 }], { x: characterPos.x + 3.5, y: characterPos.y + 6})
      ){
        restrict(curWalkingDir)
    } else {
      can_go_up = can_go_down = can_go_right = can_go_left = true
      detailTutorial.innerHTML = `Use the arrow keys on your keyboard to move around in Yang’s Office.`
      detailTutorial.style.color = 'black'
      walkingDirection.innerHTML = `Hello there!`
    }


}

function removeTutorialShowInstruction(){
  //change background
  container.style.backgroundImage = "url(https://res.cloudinary.com/dfulxq7so/image/upload/v1613955122/Group_201_rfbx6m.png)"
  //make sure header is there
  header.style.display = 'flex'
  header.style.justifyContent = 'center'
  //hide left slide 3 and show left slide 2
  leftSlide3.style.display = 'none'
  leftSlide2.style.display = 'block'
  //remove welcome line
  welcome.style.display = 'none'
  //remove instruction
  instruction.style.display = 'none'
  //hide infoIcon
  infoIcon.style.display = 'none'
  //hide office
  office.style.display = 'none'
  //add arrowkeys and enter keys to keys div
  keys.appendChild(arrowKeys)
  enterKey.style.display = 'flex'
  enterKey.style.justifyContent = 'center'
  enterKey.style.alignItems = 'center'
  keys.appendChild(enterKey)
  //show detail instruction
  detailInstruction.style.display = 'flex'
  detailInstruction.style.flexDirection = 'column'
  detailInstruction.style.alignItems = 'center'
  //move the speaker icon
  detailInstruction.appendChild(speakerIcon)
  speakerIcon.style.width = '6%'
  //hide right slide 1 and show right slide 2
  rightSlide1.style.display = 'none'
  rightSlide2.style.display = 'block'
  //hide player
  player.style.display = 'none'
  //show sparkling
  showSparkling(1)
  //return arrow keys to original colors
  arrowLeft.style.backgroundColor = arrowRight.style.backgroundColor = arrowUp.style.backgroundColor = arrowDown.style.backgroundColor = enterKey.style.backgroundColor = "#EFF5F5"
}

function enterOffice(){
    //hide detail instruction
    detailInstruction.style.display = 'none'
    //hide Perspective header
    header.style.display = 'none'
    //show infoIcon
    infoIcon.style.display = 'block'
    //change character position
    characterPos.x = 40
    characterPos.y = 50
    player.style.left = `${characterPos.x}%`
    player.style.top = `${characterPos.y}%`
    //hide left slide 2 and show left slide 3
    leftSlide2.style.display = 'none'
    leftSlide3.style.display = 'block'
    //change office image and bg image
    container.style.backgroundImage = 'none'
    container.style.backgroundColor = 'transparent' 
    office.style.display = 'block'
    office.style.width = '100%'
    office.style.left = '0'
    office.style.top = '5%'
    //show player
    player.style.display = 'block'
    //show sparkling
    sparkling.style.display = 'block'
    showSparkling(0)
    //show walkingDirection
    walkingDirection.style.display = 'block'
    //hide speakerIcon
    speakerIcon.style.display = 'none'
}

function showTutorial(){
    //reset background 
    container.style.backgroundImage = "url(https://res.cloudinary.com/dfulxq7so/image/upload/v1613785093/Group_160_uxai8d.png)"
    //add welcome title
    welcome.style.display = 'block'
    //hide infoIcon
    infoIcon.style.display = 'none'
    //hide detail instruction
    detailInstruction.style.display = 'none'
    //show tutorial
    instruction.style.display = 'block'
    arrowKeyHolder.appendChild(arrowKeys) //fix arrow key changing color and character not moving
    //show office
    office.style.display = 'block'
    //hide left slide 2 and show left slide 1
    leftSlide2.style.display = 'none'
    leftSlide1.style.display = 'block'
    //show right slide 1 and hide right slide 2
    rightSlide1.style.display = 'block'
    rightSlide2.style.display = 'none'
    //show player
    player.style.display = 'block'
    //hide sparkling
    sparkling.style.display = 'none'
    //reset player position
    player.style.left = '50%'
    player.style.top = '60%'
}

function toggleExplain(){
  if (hoverState.style.display === 'none'){
    hoverState.style.display = 'block'
  } else {
    hoverState.style.display = 'none'
  }
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
