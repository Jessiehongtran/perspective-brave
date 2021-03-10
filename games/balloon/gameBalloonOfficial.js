const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

const characterPos = {
    x: 600,
    y: 700
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
        setTimeout(flyRed, 100)
    }
}

function flyGreen(){
    greenBalloonPos.y -= 10
    greenBalloon.style.top = `${greenBalloonPos.y}px`

    if (letSoundPlay){
        playSound('../../asset/sounds/Explode.mp3')
    }

    if (greenBalloonPos.y >  - 200){
        setTimeout(flyGreen, 100)
    }
}

function flyYellow(){
    yellowBalloonPos.y -= 10
    yellowBalloon.style.top = `${yellowBalloonPos.y}px`

    if (letSoundPlay){
        playSound('../../asset/sounds/Explode.mp3')
    }

    if (yellowBalloonPos.y > - 200){
        setTimeout(flyYellow, 100)
    }
}

//function to play sound
function playSound(file){
    var audio = new Audio(file);
    audio.play()
    letSoundPlay = false
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


if (vw < 1792 && vw >= 1500){
    adjustIndForWidth = 0.85
    adjustIndForHeight = 0.97
} else if (vw >= 1400 && vw < 1500){
    adjustIndForWidth = 0.8
    adjustIndForHeight = 0.95
} else if (vw >= 1300 && vw < 1400){
    adjustIndForWidth = 0.77
    adjustIndForHeight = 0.94
} else if (vw >= 1200 && vw < 1300){
    adjustIndForWidth = 0.7
    adjustIndForHeight = 0.93
} else if (vw >= 1100 && vw < 1200){
    adjustIndForWidth = 0.65
    adjustIndForHeight = 0.91
} else if (vw >= 900 && vw < 1100 ){
    adjustIndForWidth = 0.53
    adjustIndForHeight = 0.83
} else if (vw < 900 ){
    adjustIndForWidth = 0.40
    adjustIndForHeight = 0.74
}


const squareWidth = 10*adjustIndForWidth
const squareHeight = 10*adjustIndForHeight
const cols = Math.floor(vw/squareWidth)
const rows = Math.floor(vh/squareHeight)


const squares = []
for (let r = 0; r < rows; r++){
  let squareRows = []
    for (let c = 0; c < cols; c++){
        eachSquare = document.createElement('div')
        eachSquare.setAttribute('id', 'eachSquare')
        eachSquare.style.width = `${squareWidth}px`
        eachSquare.style.height = `${squareHeight}px`
        eachSquare.style.position = 'absolute'
        eachSquare.style.left = `${c*squareWidth}px`
        eachSquare.style.top = `${r*squareHeight}px`
        // eachSquare.style.border = '1px solid grey'
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
    for (let i = bottomRow - 4; i > midRow - 1; i-- ){
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


drawParallelogram(34, 66, 58, 122)
drawParallelogram(57, 87, 20, 90)
drawParallelogram(57, 87, 90, 150)
drawParallelogram(76, 98, 55, 125)

function drawBush(leftCol, rightCol, startRow){
    let count = 0
    for (c = leftCol; c < Math.floor((rightCol + leftCol)/2); c++){
        for (r = startRow - Math.floor(count*1.5); r <= startRow + count ; r++){
            if (r < rows && c < cols && squares[r][c]){
                squares[r][c].element.style.backgroundColor = 'green'
                squares[r][c].walkable = true
            }
        }
        count += 1
    }
    count = 0
    for (c = rightCol; c >= Math.floor((rightCol + leftCol)/2); c--){
        for (r = startRow - Math.floor(count*1.5); r <= startRow + count ; r++){
            if (r < rows && c < cols && squares[r][c]){
                squares[r][c].element.style.backgroundColor = 'green'
                squares[r][c].walkable = true
            }
        }
        count += 1
    }
}

drawBush(70, 89, 63)

drawBush(58, 72, 82)

drawBush(109, 132, 55)


let r1 = 79
let c1 = 110

for (let i = r1; i < r1 + 4; i++){
    if (i < rows && c1 < cols){
        squares[i][c1].element.style.backgroundColor = 'green'
        squares[i][c1].walkable = true
    }
}
for (let i = r1-1; i < r1 + 6; i++){
    if (i < rows && c1-1 < cols){
        squares[i][c1-1].element.style.backgroundColor = 'green'
        squares[i][c1-1].walkable = true
    }
}
for (let i = r1-1; i < r1 + 3; i++){
    if (i < rows && c1 - 2 < cols){
        squares[i][c1-2].element.style.backgroundColor = 'green'
        squares[i][c1-2].walkable = true
    }
}
for (let i = r1-2; i < r1 + 4; i++){
    if (i < rows && c1 - 3 < cols){
        squares[i][c1-3].element.style.backgroundColor = 'green'
        squares[i][c1-3].walkable = true
    }
}
for (let i = r1; i < r1 + 4; i++){
    if (i < rows && c1+1 < cols){
        squares[i][c1+1].element.style.backgroundColor = 'green'
        squares[i][c1+1].walkable = true
    }
}
for (let i = r1; i < r1 + 5; i++){
    if (i < rows && c1 + 2 < cols){
        squares[i][c1+2].element.style.backgroundColor = 'green'
        squares[i][c1+2].walkable = true
    }
}
for (let i = r1; i < r1 + 5; i++){
    if (i < rows && c1 + 3 < cols){
        squares[i][c1+3].element.style.backgroundColor = 'green'
        squares[i][c1+3].walkable = true
    }
}
for (let i = r1+1; i < r1 + 6; i++){
    if (i < rows && c1 + 4 < cols){
        squares[i][c1+4].element.style.backgroundColor = 'green'
        squares[i][c1+4].walkable = true
    }
}
for (let i = r1+1; i < r1 + 6; i++){
    if (i < rows && c1 + 5 < cols){
        squares[i][c1+5].element.style.backgroundColor = 'green'
        squares[i][c1+5].walkable = true
    }
}
for (let i = r1+2; i < r1 + 7; i++){
    if (i < rows && c1 + 6 < cols){
        squares[i][c1+6].element.style.backgroundColor = 'green'
        squares[i][c1+6].walkable = true
    }
}
for (let i = r1+2; i < r1 + 7; i++){
    if (i < rows && c1 + 7 < cols){
        squares[i][c1+7].element.style.backgroundColor = 'green'
        squares[i][c1+7].walkable = true
    }
}
for (let i = r1+3; i < r1 + 8; i++){
    if (i < rows && c1 + 8 < cols){
        squares[i][c1+8].element.style.backgroundColor = 'green'
        squares[i][c1+8].walkable = true
    }
}
for (let i = r1+3; i < r1 + 8; i++){
    if (i < rows && c1 + 9 < cols){
        squares[i][c1+9].element.style.backgroundColor = 'green'
        squares[i][c1+9].walkable = true
    }
}
for (let i = 89; i < 91; i++){
    if (i < rows && 66 < cols){
        squares[i][66].element.style.backgroundColor = 'pink'
        squares[i][66].walkable = true
    }
}
for (let i = 88; i < 92; i++){
    if (i < rows && 67 < cols){
        squares[i][67].element.style.backgroundColor = 'pink'
        squares[i][67].walkable = true
    }
}
for (let i = 87; i < 92; i++){
    if (i < rows && 68 < cols){
        squares[i][68].element.style.backgroundColor = 'pink'
        squares[i][68].walkable = true
    }
}
for (let i = 88; i < 92; i++){
    if (i < rows && 69 < cols){
        squares[i][69].element.style.backgroundColor = 'pink'
        squares[i][69].walkable = true
    }
}
for (let i = 88; i < 92; i++){
    if (i < rows && 70 < cols){
        squares[i][70].element.style.backgroundColor = 'pink'
        squares[i][70].walkable = true
    }
}
for (let i = 88; i < 93; i++){
    if (i < rows && 71 < cols){
        squares[i][71].element.style.backgroundColor = 'pink'
        squares[i][71].walkable = true
    }
}
for (let i = 89; i < 93; i++){
    if (i < rows && 72 < cols){
        squares[i][72].element.style.backgroundColor = 'pink'
        squares[i][72].walkable = true
    }
}
for (let i = 89; i < 93; i++){
    if (i < rows && 73 < cols){
        squares[i][73].element.style.backgroundColor = 'pink'
        squares[i][73].walkable = true
    }
}
for (let i = 89; i < 95; i++){
    if (i < rows && 74 < cols){
        squares[i][74].element.style.backgroundColor = 'pink'
        squares[i][74].walkable = true
    }
}
for (let i = 90; i < 95; i++){
    if (i < rows && 75 < cols){
        squares[i][75].element.style.backgroundColor = 'pink'
        squares[i][75].walkable = true
    }
}
for (let i = 90; i < 95; i++){
    if (i < rows && 76 < cols){
        squares[i][76].element.style.backgroundColor = 'pink'
        squares[i][76].walkable = true
    }
}
for (let i = 90; i < 95; i++){
    if (i < rows && 77 < cols){
        squares[i][77].element.style.backgroundColor = 'pink'
        squares[i][77].walkable = true
    }
}
for (let i = 91; i < 95; i++){
    if (i < rows && 78 < cols){
        squares[i][78].element.style.backgroundColor = 'pink'
        squares[i][78].walkable = true
    }
}
for (let i = 91; i < 95; i++){
    if (i < rows && 79 < cols){
        squares[i][79].element.style.backgroundColor = 'pink'
        squares[i][79].walkable = true
    }
}
for (let i = 91; i < 95; i++){
    if (i < rows && 80 < cols){
        squares[i][80].element.style.backgroundColor = 'pink'
        squares[i][80].walkable = true
    }
}
for (let i = 92; i < 95; i++){
    if (i < rows && 81 < cols){
        squares[i][81].element.style.backgroundColor = 'pink'
        squares[i][81].walkable = true
    }
}
for (let i = 92; i < 95; i++){
    if (i < rows && 82 < cols){
        squares[i][82].element.style.backgroundColor = 'pink'
        squares[i][82].walkable = true
    }
}
for (let i = 92; i < 95; i++){
    if (i < rows && 83 < cols){
        squares[i][83].element.style.backgroundColor = 'pink'
        squares[i][83].walkable = true
    }
}
for (let i = 93; i < 95; i++){
    if (i < rows && 84 < cols){
        squares[i][84].element.style.backgroundColor = 'pink'
        squares[i][84].walkable = true
    }
}
for (let i = 93; i < 95; i++){
    if (i < rows && 85 < cols){
        squares[i][85].element.style.backgroundColor = 'pink'
        squares[i][85].walkable = true
    }
}
for (let i = 93; i < 95; i++){
    if (i < rows && 86 < cols){
        squares[i][86].element.style.backgroundColor = 'pink'
        squares[i][86].walkable = true
    }
}
for (let i = 94; i < 95; i++){
    if (i < rows && 87 < cols){
        squares[i][87].element.style.backgroundColor = 'pink'
        squares[i][87].walkable = true
    }
}
for (let i = 94; i < 95; i++){
    if (i < rows && 88 < cols){
        squares[i][88].element.style.backgroundColor = 'pink'
        squares[i][88].walkable = true
    }
}
for (let i = 94; i < 95; i++){
    if (i < rows && 89 < cols){
        squares[i][89].element.style.backgroundColor = 'pink'
        squares[i][89].walkable = true
    }
}

let n = 0
let breakpoint = 0
for (let c = 91; c < 120; c++){
    for (let r = 94 - n ; r > 94 - n - 5; r--){
        if (r < rows && c < cols && squares[r][c]){
            squares[r][c].element.style.backgroundColor = 'pink'
            squares[r][c].walkable = true
        }
    }
    breakpoint += 1
    if (breakpoint === 8){
        n += 1
        breakpoint = 0
    }
}

function isWalkable(){
    let curCol = Math.floor((characterPos.x + characterSize.w/2)/squareWidth)
    let curRow = Math.floor((characterPos.y + characterSize.h -10)/squareHeight)

    if (squares[curRow][curCol].walkable){
        return true
    }
    return false
}

document.addEventListener('keydown', handleKeyDown)

