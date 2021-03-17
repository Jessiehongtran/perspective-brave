let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
let vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
const squareSize = 10

const standardVW = 1792
const standardVH = 952

let vwRange = Math.floor(((vw - standardVW)/squareSize)/4)
let vhRange = Math.floor(((vh - standardVH)/squareSize)/2)


const characterPos = {
    x: 850,
    y: 650
}

const balloonSize = 200

let greenBalloonPos = {
    x: Math.floor(19*vw/100),
    y: Math.floor(30*vh/100)
}


let redBalloonPos = {
    x: Math.floor(49*vw/100),
    y: Math.floor(2*vh/100)
}

let yellowBalloonPos = {
    x: Math.floor(82*vw/100),
    y: Math.floor(30*vh/100)
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
let cheerImageInd = 1

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
const winning = document.getElementsByClassName('winning')[0]
const mainGame = document.getElementsByClassName('main-game')[0]
const board = document.getElementsByClassName('landing')[0]
const slideButtons = document.getElementsByClassName('slide-buttons')[0]
const speakerIconInWrong = document.getElementsByClassName('speakerIcon wrong')[0]

let audioIsBeingPlayed = false
function speak(file){
    if (!audioIsBeingPlayed){
        let duration
        audio = new Audio(file);
        audio.volume = 1;
        audio.play()
        audio.onloadedmetadata = function() {
            duration = audio.duration*1000
        };
        setTimeout(function(){
            audioIsBeingPlayed = true
        }, duration)
    }
}


function setupPosition(){
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
}

//function for character to jump
let countStep = 0
let totalStep = 10
let countChaRedFly = 0
let jumping = true
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

    if (jumping){
        isTouchingBalloon()
    }

    // checkTouchBalloon()

    if (countStep <= totalStep*2) {
        setTimeout(jump, 50)
    } 
}

function enterOrLeavePlatform(){

    console.log(question, infoIcon, character)
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
        question.style.display = 'flex'
        question.style.flexDirection = 'column'
        question.style.alignItems = 'flex-start'
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

let cheerInd
function cheeringCharacter(){
    //hide character
    character.style.display = 'none'
    //sound
    if (letSoundPlay){
        playSound('../../asset/sounds/Tada.mp3')
    }
    //change board
    if (cheerImageInd < 10){
        cheerInd = '0' + cheerImageInd.toString()
    } else {
        cheerInd = cheerImageInd
    }

    if (cheerImageInd < 11){
        board.src = `../../asset/winning/winning_${cheerInd}.svg`
        cheerImageInd += 1
        setTimeout(cheeringCharacter, 70)
    } else {
        slideButtons.style.display = 'block'
    }
    
}

function popRedBalloon(){
    //change costume
    redBalloon.style.backgroundImage = 'url(https://res.cloudinary.com/dfulxq7so/image/upload/v1615502165/Group_218_v7xguc.svg)'
    redBalloon.style.width = `${balloonSize*3}px`
    redBalloonPos.x = Math.floor(vw/2) - balloonSize*3/2
    redBalloon.style.left = `${redBalloonPos.x}px`
    //hide text in ballon
    redBalloon.childNodes[1].style.innerHTML = ""
    //sound
    if (letSoundPlay){
        playSound('../../asset/sounds/Opera.mp3')
        playSound('../../asset/sounds/Gong.mp3')
    }
    //let it fall down
    if (redBalloonPos.y < 2*vh/3 - 100){
        redBalloonPos.y += 10 
        redBalloon.style.top = `${redBalloonPos.y}px`
        letSoundPlay = true
        setTimeout(popRedBalloon, 100)
    }

}

function flyCharacterAndRedBalloon(){
    console.log('h', redBalloonPos.y)
    characterPos.y -= 10
    character.style.top = `${characterPos.y}px`
    redBalloonPos.y -= 10
    redBalloon.style.top = `${redBalloonPos.y}px`

    if (characterPos.y > 2/3*vh + 60){
        setTimeout(flyCharacterAndRedBalloon, 20)
    } else {
        playerImg.src= "../../asset/Yang_Walk_DN/Yang_Walk_DN_00001.png"
        //reset character pos
        character.style.left = `calc(50% - ${characterSize.w/2}px)`
        character.style.top = `calc(50% + ${characterSize.h/2}px)`
        //reset red balloon pos
        redBalloon.style.left = `calc(50% - ${characterSize.w/2}px)`
        redBalloon.style.top = `calc(50% + ${characterSize.h/2 - 300}px)`
        //pop red balloon
        setTimeout(popRedBalloon, 1000)
        letSoundPlay = true
        setTimeout(cheeringCharacter, 1000)
    }
}

function flyRed(){
    console.log('redBalloonPos.y', redBalloonPos.y)
    if (redBalloonPos.y >  - 100){
        redBalloonPos.y -= 10
        redBalloon.style.top = `${redBalloonPos.y}px`
        characterPos.y -= 10
        character.style.top = `${characterPos.y}px`
        if (letSoundPlay){
            playSound('../../asset/sounds/Cheer.mp3')
        }
        setTimeout(flyRed, 50)
    } else {
        console.log('top flying red')
        //hide main game and empty container
        container.style.backgroundImage = 'none'
        walkingDirection.style.display = question.style.display = infoIcon.style.display = mainGame.style.display = 'none'
        //show winning scene
        winning.style.display = 'flex'
        //reset character and red balloon position
        characterPos.y = vh 
        redBalloonPos.y = vh - 100
        characterPos.x = Math.floor(vw/2) - characterSize.w/2
        redBalloonPos.x = Math.floor(vw/2) - characterSize.w/2
        character.style.left = `${characterPos.x}px`
        character.style.top = `${characterPos.y}px`
        redBalloon.style.left = `${redBalloonPos.x}px`
        redBalloon.style.top = `${redBalloonPos.y}px`
        //hide green and yellow balloons
        greenBalloon.style.display = 'none'
        yellowBalloon.style.display = 'none'
        //push character from bottom to top
        setTimeout(flyCharacterAndRedBalloon, 0)
        console.log(redBalloonPos.y)
    }
}

function flyGreen(){
    greenBalloonPos.y -= 10
    greenBalloon.style.top = `${greenBalloonPos.y}px`

    if (letSoundPlay){
        playSound('../../asset/sounds/Explode.mp3')
        greenBalloon.style.backgroundImage = 'url(https://res.cloudinary.com/dfulxq7so/image/upload/v1615418936/green_pop_vwveha.svg)'
        console.log(greenBalloon.childNodes)

    } else {
        greenBalloon.style.backgroundImage = 'none'
    }

    if (greenBalloonPos.y >  - 200){
        setTimeout(flyGreen, 100)
    } else {
        setTimeout(function(){
            wrongIndicate.style.display = 'flex'
            speakerIconInWrong.onclick = speak('../../asset/VOfiles/PerspectivesVO_wrong_answer.wav')
        }, 2000)
    }
}

function flyYellow(){
    yellowBalloonPos.y -= 10
    yellowBalloon.style.top = `${yellowBalloonPos.y}px`

    if (letSoundPlay){
        playSound('../../asset/sounds/Explode.mp3')
        yellowBalloon.style.backgroundImage = 'url(https://res.cloudinary.com/dfulxq7so/image/upload/v1615418947/yellow_pop_q9yror.svg)'
    } else {
        yellowBalloon.style.backgroundImage = 'none'

    }

    if (yellowBalloonPos.y > - 200){
        setTimeout(flyYellow, 100)
    } else {
        setTimeout(function(){
            wrongIndicate.style.display = 'flex'
            speakerIconInWrong.onclick = speak('../../asset/VOfiles/PerspectivesVO_wrong_answer.wav')
        }, 2000)
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
            jumping = false
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
        jumping = true
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
}



const squareWidth = 10*adjustIndForWidth
const squareHeight = 10*adjustIndForHeight
let cols = Math.floor(vw/squareSize)
let rows = Math.floor(vh/squareSize)


let squares = []

function setupGrid(){
    squares = []
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

function mapoutGamePlatform(){
    //board contains red balloon
    drawParallelogram(29, 55, 59, 140)
    //board contains green balloon
    drawParallelogram(50, 80, 22, 100)
    //board contains yellow balloon
    drawParallelogram(49, 81, 90, 178)
    //board that is empty
    if (vh > 930){
        console.log('heyyo')
        drawParallelogram(73, 103, 62, 130)
    } else {
        drawParallelogram(70, 100, 62, 130)
    }
    //stair connects red and green
    drawStair(47, 80, 92, 12, 2, "DOWN")
    drawStair(55, 78, 80, 4, 2, "DOWN")
    drawStair(53, 92, 94, 6, 2, "DOWN")
    drawStair(54, 94, 96, 4, 2, "DOWN")
    //stair connects green and empty
    if (vh > 930){
        drawStair(78, 66, 78, 9, 2, "UP")
    } else {
        drawStair(78, 66, 78, 6, 2, "UP")
    }
    //stair connects empty and yellow
    if (vh > 930){
        drawStair(73, 117, 129, 10, 2, "DOWN")
        drawStair(79, 129, 131, 6, 2, "DOWN")
    } else {
        drawStair(73, 117, 129, 7, 2, "DOWN")
        drawStair(79, 129, 131, 4, 2, "DOWN")
    }
    //stair connects red and yellow
    drawStair(46, 126, 137, 8, 2, "UP")
    drawStair(44, 137, 149, 7, 1, "DOWN")
}

function isWalkable(){
    let curCol = Math.floor((characterPos.x + characterSize.w/2)/squareSize)
    let curRow = Math.floor((characterPos.y + characterSize.h -10)/squareSize)

    if (squares[curRow][curCol].walkable){
        return true
    }
    return false
}

function handleResize(){
    vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    greenBalloonPos = {
        x: Math.floor(18*vw/100),
        y: Math.floor(30*vh/100)
    }
    
    redBalloonPos = {
        x: Math.floor(45*vw/100),
        y: Math.floor(2*vh/100)
    }
    
    yellowBalloonPos = {
        x: Math.floor(73*vw/100),
        y: Math.floor(30*vh/100)
    }
    cols = Math.floor(vw/squareSize)
    rows = Math.floor(vh/squareSize)
    setupPosition()
    setupGrid()
    mapoutGamePlatform()
}

document.addEventListener('keydown', handleKeyDown)
window.addEventListener('resize', handleResize)
setupPosition()
setupGrid()
mapoutGamePlatform()
