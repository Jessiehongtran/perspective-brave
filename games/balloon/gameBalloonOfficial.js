const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
const squareSize = 10

const standardVW = 1792
const standardVH = 952

const vwRange = Math.floor(((vw - standardVW)/squareSize)/4)
const vhRange = Math.floor(((vh - standardVH)/squareSize)/2)

console.log(vwRange, vhRange)

const characterPos = {
    x: 800,
    y: 600
}

const balloonSize = 200

const greenBalloonPos = {
    x: Math.floor(18*vw/100),
    y: Math.floor(40*vh/100)
}

const redBalloonPos = {
    x: Math.floor(45*vw/100),
    y: Math.floor(10*vh/100)
}

const yellowBalloonPos = {
    x: Math.floor(73*vw/100),
    y: Math.floor(40*vh/100)
}

let characterSize = {
    w: 100,
    h: 150
}

const allowedWalkingDir = {
    "RIGHT": true,
    "LEFT": true,
    "DOWN": true,
    "UP": true
    
}

let opDir
let adjustIndForWidth = 1
let adjustIndForHeight = 1
let letSoundPlay

const character = document.getElementById('player')
const playerImg = document.getElementById('playerImg')
const container = document.getElementById('container')
const walkingDirection = document.getElementsByClassName("walking-direction")[0]
const gameInstruction = document.getElementsByClassName("game-instruction")[0]
const infoIcon = document.getElementsByClassName("info-icon")[0]
const question = document.getElementsByClassName("question")[0]
const redBalloon = document.getElementById('redBalloon')
const greenBalloon = document.getElementById('greenBalloon')
const yellowBalloon = document.getElementById('yellowBalloon')
const wrongIndicate = document.getElementsByClassName('wrong-indicate')[0]
const hello = document.getElementsByClassName('hello')[0]
// const x = document.getElementById('x')

character.style.left = `${characterPos.x}px`
character.style.top = `${characterPos.y}px`
character.style.width = `${characterSize.w}px`
character.style.height = `${characterSize.h}px`
redBalloon.style.left = `${redBalloonPos.x}px`
redBalloon.style.top = `${redBalloonPos.y}px`
greenBalloon.style.left = `${greenBalloonPos.x}px`
greenBalloon.style.top = `${greenBalloonPos.y}px`
yellowBalloon.style.left = `${yellowBalloonPos.x}px`
yellowBalloon.style.top = `${yellowBalloonPos.y}px`

redBalloon.style.width = greenBalloon.style.width = yellowBalloon.style.width = `${balloonSize}px`
// x.style.left = `${characterPos.x + characterSize.w/2 }px`
// x.style.top = `${characterPos.y + characterSize.h }px`

//function for character to jump
let countStep = 0
let totalStep = 10
let change
function jump(){
    if (countStep < totalStep) {
        characterPos.y -= 10
    } else if (countStep >= totalStep && countStep < totalStep*2){
        characterPos.y += 10
    }   
    //if touch platform, stop
    countStep += 1

    character.style.left = `${characterPos.x}px`
    character.style.top = `${characterPos.y}px`

    isTouchingBalloon()

    // checkTouchBalloon()

    if (countStep <= totalStep*2) {
        setTimeout(jump, 50)
    }  
}

function enterOrLeavePlatform(){
    if ( gameInstruction.style.display !== 'none'){
        gameInstruction.style.display = 'none'
    } else {
        gameInstruction.style.display = 'flex'
    }
    
    if (infoIcon.style.display === 'none'){
        infoIcon.style.display = 'block'
    } else {
        infoIcon.style.display = 'none'
    }
    
    if (question.style.display === 'none'){
        question.style.display = 'block'
    } else {
        question.style.display = 'none'
    }
    
    if (character.style.display === 'none'){
        character.style.display = 'block'
    } else {
        character.style.display = 'none' 
    }

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

function disableCurWalkingDir(){
    const dirs = Object.keys(allowedWalkingDir)
    for (let i = 0; i < dirs.length; i++){
        if (dirs[i] !== opDir){
            allowedWalkingDir[dirs[i]] = false
        } else {
            walkingDirection.innerHTML = `You can only go ${opDir}`
            walkingDirection.style.display = 'block'
        }
    } 
}

function enableWalkingDir(){
    const dirs = Object.keys(allowedWalkingDir)
    for (let i = 0; i < dirs.length; i++){
        allowedWalkingDir[dirs[i]] = true
    } 
    walkingDirection.style.display = 'none'
}

function flyRed(){
    redBalloonPos.y -= 10
    redBalloon.style.top = `${redBalloonPos.y}px`

    if (letSoundPlay){
        playSound('../../asset/sounds/Cheer.mp3')
    }

    if (redBalloonPos.y >  - 200){
        setTimeout(flyRed, 50)
    }
}

function flyGreen(){
    greenBalloonPos.y -= 10
    greenBalloon.style.top = `${greenBalloonPos.y}px`

    if (letSoundPlay){
        playSound('../../asset/sounds/Explode.mp3')
        greenBalloon.style.backgroundImage = 'url(https://res.cloudinary.com/dfulxq7so/image/upload/v1615418936/green_pop_vwveha.svg)'
        console.log(greenBalloon.childNodes)
        greenBalloon.childNodes[1].innerHTML = "Wrong, try again"
        greenBalloon.childNodes[1].style.color = "black"

    } else {
        greenBalloon.style.backgroundImage = 'none'
    }

    if (greenBalloonPos.y >  - 200){
        setTimeout(flyGreen, 100)
    } else {
        wrongIndicate.style.display = 'flex'
        // hello.style.display = 'block'
    }
}

function flyYellow(){
    yellowBalloonPos.y -= 10
    yellowBalloon.style.top = `${yellowBalloonPos.y}px`

    if (letSoundPlay){
        playSound('../../asset/sounds/Explode.mp3')
        yellowBalloon.style.backgroundImage = 'url(https://res.cloudinary.com/dfulxq7so/image/upload/v1615418947/yellow_pop_q9yror.svg)'
        yellowBalloon.childNodes[1].innerHTML = "Wrong, try again"
        yellowBalloon.childNodes[1].style.color = "black"
    } else {
        yellowBalloon.style.backgroundImage = 'none'

    }

    if (yellowBalloonPos.y > - 200){
        setTimeout(flyYellow, 100)
    } else {
        wrongIndicate.style.display = 'flex'
        // hello.style.display = 'block'
    }
}

//function to play sound
function playSound(file){
    var audio = new Audio(file);
    audio.play()
    letSoundPlay = false
}

function removeError(){
    wrongIndicate.style.display = 'none'
}

function isTouchingBalloon(){
    if (characterPos.x + characterSize.w/2 >= redBalloonPos.x
        && characterPos.x + characterSize.w/2 <= redBalloonPos.x + balloonSize
        && characterPos.y >= redBalloonPos.y - balloonSize){
            console.log('touch red')
            flyRed()
        }
    if (characterPos.x + characterSize.w/2 >= greenBalloonPos.x
        && characterPos.x + characterSize.w/2 <= greenBalloonPos.x + balloonSize
        && characterPos.y >= greenBalloonPos.y - balloonSize){
            console.log('touch green')
            flyGreen()
        }
    if (characterPos.x + characterSize.w/2 >= yellowBalloonPos.x
        && characterPos.x + characterSize.w/2 <= yellowBalloonPos.x + balloonSize
        && characterPos.y >= yellowBalloonPos.y - balloonSize){
            console.log('touch yellow')
            flyYellow()
        }
    
}

const walkingSpeed = 20

function handleKeyDown(e){
    if (!isWalkable()){
        disableCurWalkingDir()
    } else {
        enableWalkingDir()
    }

    //move right
    if (e.key === "ArrowRight" && allowedWalkingDir["RIGHT"]){
        characterPos.x += walkingSpeed
        opDir = "LEFT"
        getCharacterMove("RIGHT")
        playerImg.src = character_image["RIGHT"]
        playerImg.style.transform = 'rotateY(360deg)'
    } 
    //move left
    if (e.key === "ArrowLeft" && allowedWalkingDir["LEFT"]){
        characterPos.x -= walkingSpeed
        opDir = "RIGHT"
        getCharacterMove("LEFT")
        playerImg.src = character_image["LEFT"]
        playerImg.style.transform = 'rotateY(180deg)'
    } 
    //move up
    if (e.key === "ArrowUp" && allowedWalkingDir["UP"]){
        characterPos.y -= walkingSpeed
        opDir = "DOWN"
        getCharacterMove("UP")
        playerImg.src = character_image["UP"]
    } 
    //move down
    if (e.key === "ArrowDown" && allowedWalkingDir["DOWN"]){
        characterPos.y += walkingSpeed
        opDir = "UP"
        getCharacterMove("DOWN")
        playerImg.src = character_image["DOWN"]
    } 
    //jump
    if (e.key === "Enter"){
        letSoundPlay = true 
        countStep = 0
        jump()
    }

    character.style.left = `${characterPos.x}px`
    character.style.top = `${characterPos.y}px`

    characterSize = {
        w: 100,
        h: 120
    }
    character.style.width = `${characterSize.w}px`
    character.style.height = `${characterSize.h}px`
    // x.style.position = 'absolute'
    // x.style.zIndex = '15'
    // x.style.color = 'white'
    // x.style.left = `${characterPos.x + characterSize.w/2 }px`
    // x.style.top = `${characterPos.y + characterSize.h -10}px`
}



const squareWidth = 10*adjustIndForWidth
const squareHeight = 10*adjustIndForHeight
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

        squareRows.push({
            element: eachSquare,
            walkable: false
        })

        // container.appendChild(eachSquare)
    }
    squares.push(squareRows)
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


drawParallelogram(24 + vhRange, 54 + vhRange, 58 + vwRange, 122 + vwRange)
drawParallelogram(47 + vhRange, 77 + vhRange, 22 + vwRange, 92 + vwRange)
drawParallelogram(47 + vhRange, 77 + vhRange, 90 + vwRange, 150 + vwRange)
drawParallelogram(66 + vhRange, 92 + vhRange, 52 + vwRange, 124 + vwRange)

function drawACol(col, startRow, endRow){
    for (let i = startRow; i < endRow + 1; i++){
        if (i < rows && col < cols){
            squares[i][col].element.style.backgroundColor = 'orange'
            squares[i][col].walkable = true
        }
    }
}

function drawStair(leftRow, leftCol, rightCol, stepLength, stepWidth, dimension){
    let dimenInd = 1
    if (dimension === "UP"){
        dimenInd  = -1
    } 
    let i = leftCol
    let j = leftRow
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

drawStair(47 + vhRange, 74 + vwRange, 84 +vwRange, 8, 2, "DOWN")
drawStair(52 + vhRange, 72 + vwRange, 74 + vwRange, 2, 2, "DOWN")
drawStair(51 + vhRange, 84 + vwRange, 86 + vwRange, 3, 2, "DOWN")
drawStair(74 + vhRange, 62 + vwRange, 74 + vwRange, 4, 2, "UP")
drawStair(70 + vhRange, 105 + vwRange, 116 + vwRange, 4, 2, "DOWN")
drawStair(42 + vhRange, 112 + vwRange, 121 + vwRange, 8, 2, "UP")
drawStair(40 + vhRange, 121 + vwRange, 133 + vwRange, 7, 1, "DOWN")

function isWalkable(){
    let curCol = Math.floor((characterPos.x + characterSize.w/2)/squareSize)
    let curRow = Math.floor((characterPos.y + characterSize.h -10)/squareSize)

    if (squares[curRow][curCol].walkable){
        return true
    }
    return false
}

document.addEventListener('keydown', handleKeyDown)

