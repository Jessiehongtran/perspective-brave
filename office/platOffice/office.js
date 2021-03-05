let characterPos = {
  x: 60,
  y: 60
}

let characterSize = {
  w: 7,
  h: 12
}

let sparklingPos = {
  x: 32,
  y: 47
}

const sparklingSize = {
  w: 5,
  h: 10
}

const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

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
const ma = document.getElementById("ma")
const bigOffice = document.getElementById("bigOffice");
const bigTable = document.getElementById("bigTable")
const smallTable = document.getElementById("smallTable")
const arrayTable = document.getElementById("arrayTable")
const frontDrawer = document.getElementById("frontDrawer")
const backDrawer = document.getElementById("backDrawer")

const x = document.getElementById("x")
const y = document.getElementById("y")
const z = document.getElementById("z")
const k = document.getElementById("k")
const x1 = document.getElementById("x1")
const y1 = document.getElementById("y1")
const z1 = document.getElementById("z1")
const k1 = document.getElementById("k1")
const x2 = document.getElementById("x2")
const y2 = document.getElementById("y2")
const z2 = document.getElementById("z2")
const k2 = document.getElementById("k2")
const x3 = document.getElementById("x3")
const y3 = document.getElementById("y3")
const z3 = document.getElementById("z3")
const k3 = document.getElementById("k3")
const x4 = document.getElementById("x4")
const y4 = document.getElementById("y4")
const z4 = document.getElementById("z4")
const k4 = document.getElementById("k4")
const x5 = document.getElementById("x5")
const y5 = document.getElementById("y5")
const z5 = document.getElementById("z5")
const k5 = document.getElementById("k5")
const x6 = document.getElementById("x6")
const y6 = document.getElementById("y6")
const z6 = document.getElementById("z6")
const k6 = document.getElementById("k6")
let inBigOffice = false

const bigTablePos = {
  x: 150,
  y: 400
}

const smallTablePos = {
  x: 570,
  y: 50
}

const arrayTablePos = {
  x: 750,
  y: 500
}

const bigTableSize = {
  w: 600,
  h: 300
}

const smallTableSize = {
  w: 500,
  h: 250
}

const arrayTableSize = {
  w: 1000,
  h: 500
}

const bigTableStartingPoint = {
  x: 250,
  y: 520
}

const smallTableStartingPoint = {
  x: 700,
  y: 250
}

const arrayTableStartingPoint = {
  x: 900,
  y: 900
}

const wall1StartingPoint = {
  x: 650,
  y: 250
}

const wall2StartingPoint = {
  x: 970,
  y: 280
}

const frontDrawerPoint = {
  x: 1430,
  y: 340
}

const frontDrawerPos = {
  x: 1100,
  y: 290
}

const frontDrawerSize = {
  w: 800,
  h: 200
}

const backDrawerPos = {
  x: 750,
  y: 290
}

const backDrawerSize = {
  w: 800,
  h: 200
}

const backDrawerPoint = {
  x: 1050,
  y: 450
}

const baseScreenViewWidth = 1600
const baseScreenViewHeight = 952

bigTable.style.left = `${bigTablePos.x*vw/baseScreenViewWidth}px`
bigTable.style.top = `${bigTablePos.y*vh/baseScreenViewHeight}px`
bigTable.style.width = `${bigTableSize.w}px`
bigTable.style.height = `${bigTableSize.h}px`
x.style.left = `${bigTableStartingPoint.x}px`
x.style.top = `${bigTableStartingPoint.y}px`
y.style.left = `${bigTableStartingPoint.x + 220}px`
y.style.top = `${bigTableStartingPoint.y - 140}px`
z.style.left = `${bigTableStartingPoint.x + 220 + 220}px`
z.style.top = `${bigTableStartingPoint.y + 0}px`
k.style.left = `${bigTableStartingPoint.x + 220}px`
k.style.top = `${bigTableStartingPoint.y + 140}px`

smallTable.style.left = `${smallTablePos.x*vw/baseScreenViewWidth}px`
smallTable.style.top = `${smallTablePos.y*vh/baseScreenViewHeight}px`
smallTable.style.width = `${smallTableSize.w}px`
smallTable.style.height = `${smallTableSize.h}px`
x1.style.left = `${smallTableStartingPoint.x}px`
x1.style.top = `${smallTableStartingPoint.y}px`
y1.style.left = `${smallTableStartingPoint.x + 220}px`
y1.style.top = `${smallTableStartingPoint.y - 150}px`
z1.style.left = `${smallTableStartingPoint.x + 220*1.32}px`
z1.style.top = `${smallTableStartingPoint.y - 100}px`
k1.style.left = `${smallTableStartingPoint.x + 220*0.35}px`
k1.style.top = `${smallTableStartingPoint.y + 40}px`

arrayTable.style.left = `${arrayTablePos.x*vw/baseScreenViewWidth}px`
arrayTable.style.top = `${arrayTablePos.y*vh/baseScreenViewHeight}px`
arrayTable.style.width = `${arrayTableSize.w}px`
arrayTable.style.height = `${arrayTableSize.h}px`
x2.style.left = `${arrayTableStartingPoint.x}px`
x2.style.top = `${arrayTableStartingPoint.y}px`
y2.style.left = `${arrayTableStartingPoint.x + 630}px`
y2.style.top = `${arrayTableStartingPoint.y - 380}px`
z2.style.left = `${arrayTableStartingPoint.x + 600 + 140}px`
z2.style.top = `${arrayTableStartingPoint.y - 290}px`
k2.style.left = `${arrayTableStartingPoint.x + 120}px`
k2.style.top = `${arrayTableStartingPoint.y + 60}px`


x3.style.left = `${wall1StartingPoint.x}px`
x3.style.top = `${wall1StartingPoint.y}px`
y3.style.left = `${wall1StartingPoint.x + 60}px`
y3.style.top = `${wall1StartingPoint.y}px`
z3.style.left = `${wall1StartingPoint.x + 60}px`
z3.style.top = `${wall1StartingPoint.y + 220}px`
k3.style.left = `${wall1StartingPoint.x}px`
k3.style.top = `${wall1StartingPoint.y + 220}px`

x4.style.left = `${wall2StartingPoint.x}px`
x4.style.top = `${wall2StartingPoint.y}px`
y4.style.left = `${wall2StartingPoint.x + 60}px`
y4.style.top = `${wall2StartingPoint.y}px`
z4.style.left = `${wall2StartingPoint.x + 60}px`
z4.style.top = `${wall2StartingPoint.y + 200}px`
k4.style.left = `${wall2StartingPoint.x}px`
k4.style.top = `${wall2StartingPoint.y + 200}px`

backDrawer.style.left = `${backDrawerPos.x*vw/baseScreenViewWidth}px`
backDrawer.style.top = `${backDrawerPos.y*vh/baseScreenViewHeight}px`
backDrawer.style.width = `${backDrawerSize.w}px`
backDrawer.style.height = `${backDrawerSize.h}px`
x5.style.left = `${backDrawerPoint.x}px`
x5.style.top = `${backDrawerPoint.y}px`
y5.style.left = `${backDrawerPoint.x + 240}px`
y5.style.top = `${backDrawerPoint.y - 140}px`
z5.style.left = `${backDrawerPoint.x + 240 + 20}px`
z5.style.top = `${backDrawerPoint.y - 120}px`
k5.style.left = `${backDrawerPoint.x + 20}px`
k5.style.top = `${backDrawerPoint.y + 20}px`

frontDrawer.style.left = `${frontDrawerPos.x*vw/baseScreenViewWidth}px`
frontDrawer.style.top = `${frontDrawerPos.y*vh/baseScreenViewHeight}px`
frontDrawer.style.width = `${frontDrawerSize.w}px`
frontDrawer.style.height = `${frontDrawerSize.h}px`
x6.style.left = `${frontDrawerPoint.x}px`
x6.style.top = `${frontDrawerPoint.y}px`
y6.style.left = `${frontDrawerPoint.x + 20}px`
y6.style.top = `${frontDrawerPoint.y -20}px`
z6.style.left = `${frontDrawerPoint.x + 230}px`
z6.style.top = `${frontDrawerPoint.y + 100}px`
k6.style.left = `${frontDrawerPoint.x + 230 -20}px`
k6.style.top = `${frontDrawerPoint.y + 100 + 20}px`


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
player.style.height = `${characterSize.h}%`
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
        if (inBigOffice){
          characterPos.x = characterPos.x + 30
        } else {
          characterPos.x = characterPos.x + characterMovingSpeed
        } 
        getCharacterMove("RIGHT")
        playerImg.src = character_image["RIGHT"]
        playerImg.style.transform = 'rotateY(360deg)'
        curWalkingDir = "RIGHT"
    } else if (e.key === "ArrowLeft" && can_go_left){
        arrowLeft.style.backgroundColor = "#111F47"
        arrowRight.style.backgroundColor = arrowUp.style.backgroundColor = arrowDown.style.backgroundColor = enterKey.style.backgroundColor  = "#EFF5F5"
        if (inBigOffice){
          characterPos.x = characterPos.x - 30
        } else {
          characterPos.x = characterPos.x - characterMovingSpeed
        }
        getCharacterMove("LEFT")
        playerImg.src = character_image["LEFT"]
        playerImg.style.transform = 'rotateY(180deg)'
        curWalkingDir = "LEFT"
    } else if (e.key === "ArrowDown" && can_go_down){
        arrowDown.style.backgroundColor = "#111F47"
        arrowLeft.style.backgroundColor = arrowRight.style.backgroundColor = arrowUp.style.backgroundColor = enterKey.style.backgroundColor  = "#EFF5F5"
        if (inBigOffice){
          characterPos.y = characterPos.y + 30
        } else {
          characterPos.y =  characterPos.y + characterMovingSpeed
        }
        getCharacterMove("DOWN")
        playerImg.src = character_image["DOWN"]
        curWalkingDir = "DOWN"
    } else if (e.key === "ArrowUp" && can_go_up){
        arrowUp.style.backgroundColor = "#111F47"
        arrowLeft.style.backgroundColor = arrowRight.style.backgroundColor = arrowDown.style.backgroundColor = enterKey.style.backgroundColor  = "#EFF5F5"
        if (inBigOffice){
          characterPos.y = characterPos.y - 30
        } else {
          characterPos.y =  characterPos.y - characterMovingSpeed
        }
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

    if (inBigOffice){
      player.style.left = `${characterPos.x}px`
      player.style.top = `${characterPos.y}px`
      ma.style.left = `${characterPos.x + 50}px`
      ma.style.top = `${characterPos.y + 120}px`
    } else {
      player.style.left = `${characterPos.x}%`
      player.style.top = `${characterPos.y}%`
    }

    if (inBigOffice){
      if (
        //touch big table
        isInsideRectangle([{ x: bigTableStartingPoint.x, y: bigTableStartingPoint.y }, { x: bigTableStartingPoint.x + 220, y: bigTableStartingPoint.y - 140 }, { x: bigTableStartingPoint.x + 220*2, y: bigTableStartingPoint.y }, { x: bigTableStartingPoint.x + 220, y: bigTableStartingPoint.y + 140 }], { x: characterPos.x + 100, y: characterPos.y + 120})
        //touch wall1
        || isInsideRectangle([{ x: wall1StartingPoint.x, y: wall1StartingPoint.y }, { x: wall1StartingPoint.x + 60, y: wall1StartingPoint.y }, { x: wall1StartingPoint.x + 60, y: wall1StartingPoint.y + 220 }, { x: wall1StartingPoint.x, y: wall1StartingPoint.y + 220 }], { x: characterPos.x + 100, y: characterPos.y + 120 })
        //touch wall2
        || isInsideRectangle([{ x: wall2StartingPoint.x, y: wall2StartingPoint.y }, { x: wall2StartingPoint.x + 60, y: wall2StartingPoint.y }, { x: wall2StartingPoint.x + 60, y: wall2StartingPoint.y + 200 }, { x: wall2StartingPoint.x, y: wall2StartingPoint.y + 200 }], { x: characterPos.x + 100, y: characterPos.y + 120 })
        //touch small table
        || isInsideRectangle([{ x: smallTableStartingPoint.x, y: smallTableStartingPoint.y }, { x: smallTableStartingPoint.x + 220, y: smallTableStartingPoint.y - 150 }, { x: smallTableStartingPoint.x + 220*1.32, y: smallTableStartingPoint.y - 100 }, { x: smallTableStartingPoint.x + 220*0.35, y: smallTableStartingPoint.y + 40 }], { x: characterPos.x + 100, y: characterPos.y + 120 })
        //touch array table
        || isInsideRectangle([{ x: arrayTableStartingPoint.x, y: arrayTableStartingPoint.y }, { x: arrayTableStartingPoint.x + 630, y: arrayTableStartingPoint.y - 380 }, { x: arrayTableStartingPoint.x + 600 + 140, y: arrayTableStartingPoint.y - 290 }, { x: arrayTableStartingPoint.x + 120, y: arrayTableStartingPoint.y + 60 }], { x: characterPos.x + 100, y: characterPos.y + 120 })
        //touch back drawer
        || isInsideRectangle([{ x: backDrawerPoint.x, y: backDrawerPoint.y }, { x: backDrawerPoint.x + 240, y: backDrawerPoint.y - 140 }, { x: backDrawerPoint.x + 240 + 20, y: backDrawerPoint.y - 120 }, { x: backDrawerPoint.x + 20, y: backDrawerPoint.y + 20 }], { x: characterPos.x + 100, y: characterPos.y + 120 })
        //touch front drawer
        || isInsideRectangle([{ x: frontDrawerPoint.x, y: frontDrawerPoint.y }, { x: frontDrawerPoint.x + 20, y: frontDrawerPoint.y -20 }, { x: frontDrawerPoint.x + 230, y: frontDrawerPoint.y + 100 }, { x: frontDrawerPoint.x + 230 -20, y: frontDrawerPoint.y + 100 + 20 }], { x: characterPos.x + 100, y: characterPos.y + 120 })
      ){
        // console.log('touch first table in big office')
        restrict(curWalkingDir)
      } else {
        can_go_up = can_go_down = can_go_right = can_go_left = true
        walkingDirection.innerHTML = `Hello there!`
      }
    } else {
      if (
        //touch first table
        isInsideRectangle([{ x: 47, y: 54.5 }, { x: 41.5, y: 59 }, { x: 48, y: 65 }, { x: 53.5, y: 60.5 }], { x: characterPos.x + 3.5, y: characterPos.y + 6})
        //touch edge 1
        || isInsideRectangle([{ x: 35, y: 59 }, { x: 67, y: 84.5 }, { x: 63, y: 90 }, { x: 31, y: 64.5 }], { x: characterPos.x , y: characterPos.y + 6})
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
      }
    }
}

function drawMap(){
  const squareSize = 10

  const cols = Math.floor(vw/squareSize)
  const rows = Math.floor(vh/squareSize)

  let eachSquare

  for (let r = 0; r < rows; r++){
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

          //first table paint
          if (c >= 21 && c <= 25 && r >= 31 && r <= 50){
            eachSquare.style.backgroundColor = "red"
          }
          if (c >= 26 && c <= 30 && r >= 33 && r <= 52){
            eachSquare.style.backgroundColor = "red"
          }
          if (c >= 31 && c <= 35 && r >= 34 && r <= 53){
            eachSquare.style.backgroundColor = "red"
          }
          if (c >= 36 && c <= 39 && r >= 34 && r <= 53){
            eachSquare.style.backgroundColor = "red"
          }
          if (c >= 40 && c <= 44 && r >= 30 && r <= 59){
            eachSquare.style.backgroundColor = "red"
          }
          if (c >= 45 && c <= 49 && r >= 32 && r <= 53){
            eachSquare.style.backgroundColor = "red"
          }
          if (c >= 49 && c <= 54 && r >= 35 && r <= 53){
            eachSquare.style.backgroundColor = "red"
          }

          //second table paint
          if (c >= 66 && c <= 72 && r >= 3 && r <= 20){
            eachSquare.style.backgroundColor = "yellow"
          }
          if (c >= 72 && c <= 76 && r >= 0 && r <= 14){
            eachSquare.style.backgroundColor = "yellow"
          }
          if (c >= 76 && c <= 80 && r >= 0 && r <= 11){
            eachSquare.style.backgroundColor = "yellow"
          }
          if (c >= 80 && c <= 84 && r >= 0 && r <= 9){
            eachSquare.style.backgroundColor = "yellow"
          }
          if (c >= 85 && c <= 93 && r >= 0 && r <= 7){
            eachSquare.style.backgroundColor = "yellow"
          }

          container.appendChild(eachSquare)
      }
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
    office.style.left = '-5%'
    office.style.top = '-10%'
    office.style.backgroundImage = 'none'
    bigOffice.style.display = 'block'
    office.appendChild(bigOffice)
    //show player & increase playerImg size
    player.style.display = 'block'
    playerImg.style.width = '100%'
    //show sparkling
    sparkling.style.display = 'block'
    showSparkling(0)
    //show walkingDirection
    walkingDirection.style.display = 'block'
    //hide speakerIcon
    speakerIcon.style.display = 'none'
    //update inBigOffice
    inBigOffice = true
    //reset player and sparkling from percentage to px
    characterPos = {
      x: 600,
      y: 600
    }
    characterSize = {
      w: 100,
      h: 120
    }
    sparklingPos = {
      x: 500,
      y: 500
    }
    player.style.left = `${characterPos.x}px`
    player.style.top = `${characterPos.y}px`
    player.style.width = `${characterSize.w}px`
    player.style.height = `${characterSize.h}px`
    sparkling.style.left = `${sparklingPos.x}px`
    sparkling.style.top = `${sparklingPos.y}px`
    //draw the map
    drawMap()
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

    console.log('topLeft', topLeft, ' topRight',  topRight, 'bottomRight', bottomRight, 'bottomLeft', bottomLeft)
    console.log('target', target)

    console.log('triangle1', triangArea(topLeft.x, topLeft.y, target.x, target.y, bottomLeft.x, bottomLeft.y))
    console.log('triangle2', triangArea(topLeft.x, topLeft.y, target.x, target.y, topRight.x, topRight.y))
    console.log('triangle3', triangArea(topRight.x, topRight.y, target.x, target.y, bottomRight.x, bottomRight.y))
    console.log('triangle4', triangArea(bottomRight.x, bottomRight.y, target.x, target.y, bottomLeft.x, bottomLeft.y) )
    console.log('rect', rectArea(topLeft.x, topLeft.y, topRight.x, topRight.y, bottomRight.x, bottomRight.y, bottomLeft.x, bottomLeft.y))

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
