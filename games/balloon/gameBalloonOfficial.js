
let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
let vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

console.log('vw', vw, 'vh', vh)

const squareSize = 10

const standardVW = 1792
const standardVH = 952

let vwRange = 0
let vhRange = 0

const platform = document.getElementsByClassName('platform')[0]

let characterPos = {
    x: 850,
    y: 650
}

let balloonSize = 200

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

//screen size 1366x768
if (vw > 1360 && vw < 1370 && vh > 765 && vh < 775){
    vwRange = -26
    vhRange = -14
    characterPos = {
        x: 600,
        y: 500
    }
    platform.style.top = '20%'
    platform.style.left = '0%'
    balloonSize = 170

    greenBalloonPos = {
        x: Math.floor(5*vw/100),
        y: Math.floor(30*vh/100)
    }

    redBalloonPos = {
        x: Math.floor(45*vw/100),
        y: 0
    }

    yellowBalloonPos = {
        x: Math.floor(88*vw/100),
        y: Math.floor(30*vh/100)
    }
}

//screen size 1440x900
if (vw > 1439 && vw < 1450 && vh > 899 && vh < 910){
    vwRange = -26
    vhRange = -3
    characterPos = {
        x: 600,
        y: 600
    }
    platform.style.top = '30%'
    platform.style.left = '0%'
    balloonSize = 170

    greenBalloonPos = {
        x: Math.floor(5*vw/100),
        y: Math.floor(30*vh/100)
    }

    redBalloonPos = {
        x: Math.floor(43*vw/100),
        y: 0
    }

    yellowBalloonPos = {
        x: Math.floor(83*vw/100),
        y: Math.floor(30*vh/100)
    }
}

//screen size 1536x864
if (vw > 1530 && vw < 1540 && vh > 860 && vh < 870){
    vwRange = -26
    vhRange = -3
    characterPos = {
        x: 600,
        y: 600
    }
    platform.style.top = '30%'
    platform.style.left = '0%'
    balloonSize = 170

    greenBalloonPos = {
        x: Math.floor(5*vw/100),
        y: Math.floor(30*vh/100)
    }

    redBalloonPos = {
        x: Math.floor(40*vw/100),
        y: 0
    }

    yellowBalloonPos = {
        x: Math.floor(78*vw/100),
        y: Math.floor(30*vh/100)
    }
}

//screen size 1680x1050
if (vw > 1675 && vw < 1685 ){
    vwRange = -8
    vhRange = 0
    characterPos = {
        x: 800,
        y: 700
    }
    platform.style.top = '30%'
    platform.style.left = '8%'
    balloonSize = 170

    greenBalloonPos = {
        x: Math.floor(12*vw/100),
        y: Math.floor(30*vh/100)
    }

    redBalloonPos = {
        x: Math.floor(45*vw/100),
        y: 0
    }

    yellowBalloonPos = {
        x: Math.floor(79*vw/100),
        y: Math.floor(30*vh/100)
    }
}


//screen size 1280x720
if (vw > 1275 && vw < 1285 && vh > 715 && vh < 725){
    vwRange = -34
    vhRange = -14
    characterPos = {
        x: 800,
        y: 400
    }
    platform.style.top = '23%'
    platform.style.left = '-6%'
    balloonSize = 170

    greenBalloonPos = {
        x: Math.floor(0*vw/100),
        y: Math.floor(38*vh/100)
    }

    redBalloonPos = {
        x: Math.floor(43*vw/100),
        y: 0
    }

    yellowBalloonPos = {
        x: Math.floor(88*vw/100),
        y: Math.floor(38*vh/100)
    }
}

//screen size 1280x800
if (vw > 1275 && vw < 1285 && vh > 795 && vh < 805){
    vwRange = -34
    vhRange = -11
    characterPos = {
        x: 800,
        y: 400
    }
    platform.style.top = '23%'
    platform.style.left = '-6%'
    balloonSize = 170

    greenBalloonPos = {
        x: Math.floor(0*vw/100),
        y: Math.floor(38*vh/100)
    }

    redBalloonPos = {
        x: Math.floor(43*vw/100),
        y: 0
    }

    yellowBalloonPos = {
        x: Math.floor(88*vw/100),
        y: Math.floor(38*vh/100)
    }
}

//screen size 1600x900
if (vw > 1595 && vw < 1605 && vh > 895 && vh < 905){
    vwRange = -18
    vhRange = -4
    characterPos = {
        x: 800,
        y: 700
    }
    platform.style.top = '30%'
    platform.style.left = '5%'
    balloonSize = 170

    greenBalloonPos = {
        x: Math.floor(10*vw/100),
        y: Math.floor(38*vh/100)
    }

    redBalloonPos = {
        x: Math.floor(44*vw/100),
        y: Math.floor(3*vh/100)
    }

    yellowBalloonPos = {
        x: Math.floor(80*vw/100),
        y: Math.floor(38*vh/100)
    }
}

//screen size 1920x1080
if (vw > 1915 && vw < 1925){
    vwRange = 0
    vhRange = 0
    characterPos = {
        x: 800,
        y: 700
    }
    platform.style.top = '30%'
    platform.style.left = '13%'
    balloonSize = 170

    greenBalloonPos = {
        x: Math.floor(17*vw/100),
        y: Math.floor(35*vh/100)
    }

    redBalloonPos = {
        x: Math.floor(46*vw/100),
        y: Math.floor(3*vh/100)
    }

    yellowBalloonPos = {
        x: Math.floor(76*vw/100),
        y: Math.floor(35*vh/100)
    }
}

//screen size 2560x1440
if (vw > 2500 && vw < 2600){
    vwRange = 50
    vhRange = 23
    characterPos = {
        x: 1500,
        y: 1000
    }
    platform.style.top = '40%'
    platform.style.left = '30%'
    balloonSize = 170

    greenBalloonPos = {
        x: Math.floor(33*vw/100),
        y: Math.floor(40*vh/100)
    }

    redBalloonPos = {
        x: Math.floor(55*vw/100),
        y: Math.floor(16*vh/100)
    }

    yellowBalloonPos = {
        x: Math.floor(77*vw/100),
        y: Math.floor(40*vh/100)
    }
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
let duration
function speak(file){
    audio = new Audio(file);
    audio.volume = 1;
    audio.play()
    audio.onloadedmetadata = function() {
        duration = audio.duration*1000
    };
    setTimeout(function(){
        audioIsBeingPlayed = false
    }, duration)
   
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
        walkingDirection.style.display = 'none'
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
            walkingDirection.innerHTML = `Do not go there. You can only go ${opDir}`
            walkingDirection.style.display = 'block'
            if (letSoundPlay){
                playSound(`../../asset/VOfiles/PerspectivesVO_limit_${opDir}.wav`)
            }
        }
    } 
}

function enableWalkingDir(){
    const dirs = Object.keys(allowedWalkingDir)
    for (let i = 0; i < dirs.length; i++){
        allowedWalkingDir[dirs[i]] = true
    } 
    walkingDirection.style.display = 'none'
    letSoundPlay = true
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
            speak('../../asset/VOfiles/PerspectivesVO_wrong_answer.wav')
        }, 1000)
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
        }, 1000)
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
            jumping = false
            flyRed()
        }
    if (characterPos.x + characterSize.w/2 >= greenBalloonPos.x
        && characterPos.x + characterSize.w/2 <= greenBalloonPos.x + balloonSize
        && characterPos.y >= greenBalloonPos.y - balloonSize){
            flyGreen()
        }
    if (characterPos.x + characterSize.w/2 >= yellowBalloonPos.x
        && characterPos.x + characterSize.w/2 <= yellowBalloonPos.x + balloonSize
        && characterPos.y >= yellowBalloonPos.y - balloonSize){
            flyYellow()
        }
    
}

const walkingSpeed = 20
let curDir 
let preDir = null
let audio

function stopVO(){
    if (audio){
        audio.pause()
    }
}

let firstWalk = true

function walk(e){
    let playAudioOnWalking = localStorage.getItem('playAudioOnWalking')

    //describe the environment
    if (firstWalk && playAudioOnWalking === "true"){
        speak('../../asset/VOfiles/PerspectivesVO_gamePlatformDescribe.wav')
        firstWalk = false
    }

    if (!isWalkable()){
        disableCurWalkingDir()
    } else {
        enableWalkingDir()
    }

    //move right
    if (e.key === "ArrowRight" && allowedWalkingDir["RIGHT"]){
        characterPos.x += walkingSpeed
        opDir = "LEFT"
        curDir = "RIGHT"
        getCharacterMove("RIGHT")
        playerImg.src = character_image["RIGHT"]
        playerImg.style.transform = 'rotateY(360deg)'
        if (playAudioOnWalking === "true" && !firstWalk){
            if (curDir !== preDir || preDir === null){
                audioIsBeingPlayed = true
                speak('../../asset/VOfiles/PerspectivesVO_moveRight.wav')
            }
        }
    } 
    //move left
    if (e.key === "ArrowLeft" && allowedWalkingDir["LEFT"]){
        characterPos.x -= walkingSpeed
        opDir = "RIGHT"
        curDir = "LEFT"
        getCharacterMove("LEFT")
        playerImg.src = character_image["LEFT"]
        playerImg.style.transform = 'rotateY(180deg)'
        if (playAudioOnWalking === "true" && !firstWalk){
            if (curDir !== preDir || preDir === null){
                audioIsBeingPlayed = true
                speak('../../asset/VOfiles/PerspectivesVO_moveLeft.wav')
            }
        }
    } 
    //move up
    if (e.key === "ArrowUp" && allowedWalkingDir["UP"]){
        characterPos.y -= walkingSpeed
        opDir = "DOWN"
        curDir = "UP"
        getCharacterMove("UP")
        playerImg.src = character_image["UP"]
        if (playAudioOnWalking === "true" && !firstWalk){
            if (curDir !== preDir || preDir === null){
                audioIsBeingPlayed = true
                speak('../../asset/VOfiles/PerspectivesVO_moveUp.wav')
            }
        }
    } 
    //move down
    if (e.key === "ArrowDown" && allowedWalkingDir["DOWN"]){
        characterPos.y += walkingSpeed
        opDir = "UP"
        curDir = "DOWN"
        getCharacterMove("DOWN")
        playerImg.src = character_image["DOWN"]
        if (playAudioOnWalking === "true" && !firstWalk){
            if (curDir !== preDir || preDir === null){
                audioIsBeingPlayed = true
                speak('../../asset/VOfiles/PerspectivesVO_moveDown.wav')
            }
        }
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

    preDir = curDir
}

function handleKeyDown(e){
    if (!audioIsBeingPlayed){
        walk(e)
    }
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
    drawParallelogram(29 + vhRange, 55 + vhRange, 59 + vwRange, 140 + vwRange)
    //board contains green balloon
    drawParallelogram(50 + vhRange, 80 + vhRange, 22 + vwRange, 100 + vwRange)
    //board contains yellow balloon
    drawParallelogram(49 + vhRange, 81 + vhRange, 90 + vwRange, 178 + vwRange)
    //board that is empty
    drawParallelogram(73 + vhRange, 103 + vhRange, 62 + vwRange, 130 + vwRange)
    // if (vh > 930){
    //     drawParallelogram(73, 103, 62, 130)
    // } else {
    //     drawParallelogram(70, 100, 62, 130)
    // }
    //stair connects red and green
    drawStair(47 + vhRange, 80 + vwRange, 92 + vwRange, 12, 2, "DOWN")
    drawStair(55 + vhRange, 78 + vwRange, 80 + vwRange, 4, 2, "DOWN")
    drawStair(53 + vhRange, 92 + vwRange, 94 + vwRange, 6, 2, "DOWN")
    drawStair(54 + vhRange, 94 + vwRange, 96 + vwRange, 4, 2, "DOWN")
    //stair connects green and empty
    drawStair(78 + vhRange, 66 + vwRange, 78 + vwRange, 9, 2, "UP")
    // if (vh > 930){
    //     drawStair(78, 66, 78, 9, 2, "UP")
    // } else {
    //     drawStair(78, 66, 78, 6, 2, "UP")
    // }
    //stair connects empty and yellow
    drawStair(73 + vhRange, 117 + vwRange, 129 + vwRange, 10, 2, "DOWN")
    drawStair(79 + vhRange, 129 + vwRange, 131 + vwRange, 6, 2, "DOWN")
    // if (vh > 930){
    //     drawStair(73, 117, 129, 10, 2, "DOWN")
    //     drawStair(79, 129, 131, 6, 2, "DOWN")
    // } else {
    //     drawStair(73, 117, 129, 7, 2, "DOWN")
    //     drawStair(79, 129, 131, 4, 2, "DOWN")
    // }
    //stair connects red and yellow
    drawStair(46 + vhRange, 126 + vwRange, 137 + vwRange, 8, 2, "UP")
    drawStair(44 + vhRange, 137 + vwRange, 149 + vwRange, 7, 1, "DOWN")
}

function isWalkable(){
    let curCol = Math.floor((characterPos.x + characterSize.w/2)/squareSize)
    let curRow = Math.floor((characterPos.y + characterSize.h -10)/squareSize)

    if (curRow < rows && curCol < cols && squares[curRow][curCol].walkable){
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
