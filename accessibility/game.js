const squareSize = 1

let canWalk = {
    "LEFT": true,
    "RIGHT": true,
    "DOWN": true,
    "UP": true
}
let curDir 
let audio 
const charFace = {
    "UP": "../asset/Yang_Walk_UP/Yang_Walk_UP_00000.png",
    "DOWN": "../asset/Yang_Walk_DN/Yang_Walk_DN_00000.png",
    "LEFT": "../asset/Yang_walk_LR/Yang_Walk_LR_00000.png",
    "RIGHT": "../asset/Yang_walk_LR/Yang_Walk_LR_00000.png"
}

//Initiate variables to keep track image index
let moveInd = {
    "UP": 0,
    "DOWN": 0,
    "LEFT": 0,
    "RIGHT": 0
  }

const char = document.getElementsByClassName("character")[0]
const greenBalloon = document.getElementsByClassName("balloon green")[0]
const redBalloon = document.getElementsByClassName("balloon red")[0]
const yellowBalloon = document.getElementsByClassName("balloon yellow")[0]
const instruction = document.getElementsByClassName("instruction")[0]
const wrongIndicate = document.getElementsByClassName("wrong-indicate")[0]
const winning = document.getElementsByClassName("winning")[0]
const mainGame = document.getElementsByClassName("main-game")[0]
const charInWinning = document.getElementsByClassName("character")[1]
const landing = document.getElementsByClassName("landing")[0]
const cheerStuff = document.getElementsByClassName("cheer-stuff")[0]
const rightSlide = document.getElementById("rightSlide")

setTimeout(function(){
    instruction.style.display = 'block'
}, 2000)

let charPos = {
    x: 55,
    y: 50
}

let charSize = {
    w: 12,
    h: 12
}
const changeX = 1
const changeY = 1

const greenBalloonPos = {
    x: 18,
    y: 50
}

const redBalloonPos = {
    x: 45,
    y: 20
}

const yellowBalloonPos = {
    x: 73,
    y: 50
}

const balloonSize = {
    w: 10,
    h: 25
}

const cheerStuffPos = {
    x: 40,
    y: 20
}


char.style.left = `${charPos.x}%`
char.style.top = `${charPos.y}%`
char.style.width = `${charSize.w}%`
char.style.height = `${charSize.h}%`

greenBalloon.style.left = `${greenBalloonPos.x}%`
greenBalloon.style.top = `${greenBalloonPos.y}%`
redBalloon.style.left = `${redBalloonPos.x}%`
redBalloon.style.top = `${redBalloonPos.y}%`
yellowBalloon.style.left = `${yellowBalloonPos.x}%`
yellowBalloon.style.top = `${yellowBalloonPos.y}%`
greenBalloon.style.width = redBalloon.style.width = yellowBalloon.style.width = `${balloonSize.w}%`
greenBalloon.style.height = redBalloon.style.height = yellowBalloon.style.height = `${balloonSize.h}%`
cheerStuff.style.left = `${cheerStuffPos.x}%`
cheerStuff.style.top = `${cheerStuffPos.y}%`

let balloonCoor = 1

function initialFlyGreen(){
    greenBalloonPos.y -= balloonCoor
    greenBalloon.style.top = `${greenBalloonPos.y}%`
    balloonCoor += 1
    if (balloonCoor < 6){
        setTimeout(initialFlyGreen, 120)
    } else {
        balloonCoor = 1
        initialFlyRed()
    }
}

function initialFlyRed(){
    redBalloonPos.y -= balloonCoor
    redBalloon.style.top = `${redBalloonPos.y}%`
    balloonCoor += 1
    if (balloonCoor < 6){
        setTimeout(initialFlyRed, 120)
    } else {
        balloonCoor = 1
        initialFlyYellow()
    }
}

function initialFlyYellow(){
    yellowBalloonPos.y -= balloonCoor
    yellowBalloon.style.top = `${yellowBalloonPos.y}%`
    balloonCoor += 1
    if (balloonCoor < 6){
        setTimeout(initialFlyYellow, 120)
    }
}


initialFlyGreen()

let countStep = 0
const totalStep = 10
const flyingSpeed = 3
let cheerInd = 1
let isJumping = false
let exploded = false

const widthScreenReader = sessionStorage.getItem('screen-reader')
if (widthScreenReader === "true"){
    instruction.innerHTML = `
    <p class="each-line">Press <span class="key-btn">G</span> to select green balloon</p>
    <p class="each-line">Press <span class="key-btn">R</span> to select red balloon</p>
    <p class="each-line">Press <span class="key-btn">Y</span> to select yellow balloon</p>
    `
    instruction.setAttribute('aria-label', 'Press G to select green balloon, press R to select red balloon, press Y to select yellow balloon')
}

const rows = 100
const cols = 100
const squares = []
for (let r = 0; r < rows; r++){
let squareRows = []
    for (let c = 0; c < cols; c++){
        eachSquare = document.createElement('div')
        eachSquare.setAttribute('id', 'eachSquare')
        eachSquare.style.width = `${squareSize}%`
        eachSquare.style.height = `${squareSize}%`
        eachSquare.style.position = 'absolute'
        eachSquare.style.left = `${c*squareSize}%`
        eachSquare.style.top = `${r*squareSize}%`
        eachSquare.style.border = '1px solid grey'
        eachSquare.style.zIndex = '5'

        squareRows.push({
            element: eachSquare,
            walkable: false
        })

        //container.appendChild(eachSquare)
    }
    squares.push(squareRows)
}

//Function to get character image file (that is stored locally)
function getCharacterImg(dir, id){
    if (id < 10){
      id = "0" + id.toString()
    } 
    if (dir === "UP"){
      return `../asset/Yang_Walk_UP/Yang_Walk_UP_000${id}.png`
    } else if (dir === "DOWN"){
      return `../asset/Yang_Walk_DN/Yang_Walk_DN_000${id}.png`
    } else if (dir === "LEFT" || dir === "RIGHT"){
      return `../asset/Yang_Walk_LR/Yang_Walk_LR_000${id}.png`
    } 
  }
  
const maxImageInd = 15

//Function to get a movement
function getCharacterMove(dir){
    charFace[dir] = getCharacterImg(dir, moveInd[dir])
    moveInd[dir] += 1
    if (moveInd[dir] >= maxImageInd){
        moveInd[dir] = 0
    } 
}

function handleKeyDown(e){
    let flex = 0
    if (curDir === "LEFT" || curDir === "DOWN"){
        flex = -2
    } else if (curDir === "RIGHT" || curDir === "UP"){
        flex = 2
    } 
    if (!squares[charPos.y + charSize.h ][charPos.x + Math.floor(charSize.w/2) + flex].walkable){
        canWalk[curDir] = false
        audio = new Audio('../asset/VOfiles/PerspectivesVO_hit.mp3');
        audio.play()
    } else {
        canWalk = {
            "LEFT": true,
            "RIGHT": true,
            "DOWN": true,
            "UP": true
        }
    }
    
    if (e.key === "a" && canWalk["LEFT"]){
        curDir = "LEFT"
        charPos.x -= changeX
        charPos.y -= changeY
        char.style.transform = 'rotateY(180deg)'
    }
    if (e.key === "d" && canWalk["RIGHT"]){
        curDir = "RIGHT"
        charPos.x += changeX
        charPos.y += changeY
        char.style.transform = 'rotateY(360deg)'
    }
    if (e.key === "w" && canWalk["UP"]){
        curDir = "UP"
        charPos.x += changeX
        charPos.y -= changeY
    }
    if (e.key === "s" && canWalk["DOWN"]){
        curDir = "DOWN"
        charPos.x -= changeX
        charPos.y += changeY
    }

    if (e.key === "a" || e.key === "d" || e.key === "w" || e.key === "s"){
        getCharacterMove(curDir)
        char.src = charFace[curDir]
        charSize = {
            w: 6,
            h: 14
        }
        char.style.left = `${charPos.x}%`
        char.style.top = `${charPos.y}%`
        char.style.width = `${charSize.w}%`
        char.style.height = `${charSize.h}%`
    }


    if (e.key === "j"){
        if (countStep === 0 || countStep === totalStep*2 + 1){
            countStep = 0
            jump()
        }
    }

    if (e.key === "g"){
        //fly green
        flyGreenBalloon()

    }
    if (e.key === "r"){
        //fly red
        flyRedBalloon()
    }
    if (e.key === "y"){
        //fly yellow
        flyYellowBalloon()
    }

}

function jump(){
    isJumping = true
    console.log(countStep)
    if (countStep < totalStep) {
        charPos.y -= 1
    } else if (countStep >= totalStep && countStep < totalStep*2){
        charPos.y += 1
    }   
    //if touch platform, stop
    countStep += 1

    char.style.left = `${charPos.x}%`
    char.style.top = `${charPos.y}%`

    //check touch balloon
    if (charPos.x + charSize.w/2 >= greenBalloonPos.x && charPos.x + charSize.w/2 <= greenBalloonPos.x + balloonSize.w
        && charPos.y  >= greenBalloonPos.y && charPos.y <= greenBalloonPos.y + balloonSize.h
        ){
            flyGreenBalloon()
        }

    if (charPos.x + charSize.w/2 >= redBalloonPos.x && charPos.x + charSize.w/2 <= redBalloonPos.x + balloonSize.w
        && charPos.y  >= redBalloonPos.y && charPos.y <= redBalloonPos.y + balloonSize.h){
            isJumping = false
            flyRedBalloon()
        }

    if (charPos.x + charSize.w/2 >= yellowBalloonPos.x && charPos.x + charSize.w/2 <= yellowBalloonPos.x + balloonSize.w
        && charPos.y  >= yellowBalloonPos.y && charPos.y <= yellowBalloonPos.y + balloonSize.h){
            flyYellowBalloon()
        }

    if (isJumping && countStep <= totalStep*2) {
        setTimeout(jump, 50)
    } 
}

function flyGreenBalloon(){
    if (greenBalloonPos.y > - balloonSize.h){
        greenBalloonPos.y -= flyingSpeed
        greenBalloon.style.top = `${greenBalloonPos.y}%`
        setTimeout(flyGreenBalloon, 80)
    } else {
        showError()
    }
}


function flyRedBalloon(){
    if (redBalloonPos.y > - balloonSize.h){
        redBalloonPos.y -= flyingSpeed
        redBalloon.style.top = `${redBalloonPos.y}%`
        charPos.y -= flyingSpeed
        char.style.top = `${charPos.y}%`
        setTimeout(flyRedBalloon, 80)
    } else {
        audio = new Audio('../asset/sounds/Cheer.mp3')
        audio.play()
        charInWinning.style.top = `48%`
        charInWinning.style.left = `41%`
        charInWinning.style.width = `18%`
        charInWinning.style.height = `18%`
        charInWinning.style.position = 'absolute'
        showWinning()
    }
}

function flyYellowBalloon(){
    if (yellowBalloonPos.y > - balloonSize.h){
        yellowBalloonPos.y -= flyingSpeed
        yellowBalloon.style.top = `${yellowBalloonPos.y}%`
        setTimeout(flyYellowBalloon, 80)
    } else {
        showError()
    }
}


function showError(){
    if (!exploded){
        audio = new Audio('../asset/sounds/Explode.mp3')
        audio.play()
        exploded = true
    }
    wrongIndicate.style.display = 'flex'
    setTimeout(function(){
        audio = new Audio('../asset/VOfiles/PerspectivesVO_wrong_answer.wav');
        audio.play()
        setTimeout(hideError, 3000)
    }, 3000)

    setTimeout(function(){
        exploded = false
    }, 10000)
    
}

function hideError(){
    wrongIndicate.style.display = 'none'
}

function showWinning(){
    winning.style.display = 'flex'
    mainGame.style.display = 'none'
    showCheerImg()
}

function showCheerImg(){
    charInWinning.style.display = 'none'
    if (cheerInd < 11){
        let cheerImgInd
        if (cheerInd < 10){
            cheerImgInd = "0" + cheerInd.toString()
        } else {
            cheerImgInd = cheerInd
        }
        landing.src = `../asset/winning/winning_${cheerImgInd}.svg`
        cheerStuffPos.y += cheerInd*3/4
        cheerStuff.style.top = `${cheerStuffPos.y}%`
        cheerInd += 1
        setTimeout(showCheerImg, 60)
    } else {
        rightSlide.style.display = 'block'
    }
}


function drawParallelogram(topRow, bottomRow, leftCol, rightCol){
    const midCol = Math.floor((leftCol + rightCol)/2)
    const midRow = Math.floor((topRow + bottomRow)/2)
    const increaseGap = Math.floor((rightCol - midCol)/(midRow - topRow))
    let increase = 0
    for (let i = topRow; i < midRow; i++ ){
        let j = midCol - increase
        while (j < midCol + increase + 1){
            if (i < rows && j < cols && squares[i][j]){
                squares[i][j].element.style.backgroundColor = 'red'
                squares[i][j].walkable = true
            }
            j += 1
        }
        increase += increaseGap
    }

    increase = 0
    for (let i = bottomRow ; i > midRow - 1; i-- ){
        let j = midCol - increase
        while (j < midCol + increase + 1){
            if (i < rows && j < cols && squares[i][j]){
                squares[i][j].element.style.backgroundColor = 'red'
                squares[i][j].walkable = true
            }
            j += 1
        }
        increase += increaseGap
    }
}


function drawACol(col, startRow, endRow){
    for (let i = startRow; i < endRow + 1; i++){
        if (i < rows && col < cols){
            squares[i][col].element.style.backgroundColor = 'orange'
            squares[i][col].walkable = true
        }
    }
}

function drawStair(topRow, leftCol, rightCol, stepLength, stepWidth, dimension){
    let dimenInd = 1
    if (dimension === "UP"){
        dimenInd  = -1
    } 
    let i = leftCol
    let j = topRow
    let count = 0
    while (i < rightCol){
        //draw that column
        drawACol(i, j, j + stepLength)
        i += 1
        count += 1
        if (count === stepWidth){
            count = 0
            j = j + dimenInd
        }
    }
}

drawParallelogram(25, 57, 25, 75)
drawParallelogram(50, 78, 10, 53)
drawParallelogram(49, 80, 48, 87)
drawParallelogram(68, 96, 34, 65)
drawStair(55, 40, 48, 12, 1, "UP")
drawStair(76, 34, 40, 7, 1, "UP")
drawStair(73, 59, 65, 6, 1, "DOWN")
drawStair(46, 62, 67, 7, 1, "UP")
drawStair(43, 67, 72, 7, 1, "DOWN")
drawStair(88, 40, 47, 9, 1, "DOWN")
drawStair(95, 35, 42, 8, 1, "UP")

document.addEventListener('keydown', handleKeyDown)


