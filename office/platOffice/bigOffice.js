const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

const container = document.getElementById("container")
const character = document.getElementById("player")
const walkingDirection = document.getElementsByClassName("walking-direction")[0]
const playerImg = document.getElementById("playerImg")
const sparklingImage = document.getElementsByClassName("sparklingImage")[0]
const sparkling = document.getElementById("sparkling")

const characterPos = {
    x: 800,
    y: 600
}

let sparklingPos = {
    x: 600,
    y: 570
  }
  
const sparklingSize = {
    w: 50,
    h: 100
}

const allowedWalkingDir = {
    "RIGHT": true,
    "LEFT": true,
    "DOWN": true,
    "UP": true
    
}

let preDir = null
let curDir
let letSoundPlay = true

const characterHeight = 85
const halfCharacterWidth = 55

character.style.left = `${characterPos.x}px`
character.style.top = `${characterPos.y}px`
character.style.width = '120px'
character.style.height = '100px'
sparkling.style.left = `${sparklingPos.x}px`
sparkling.style.top = `${sparklingPos.y}px`
sparkling.style.width = `${sparklingPos.w}px`
sparkling.style.height = `${sparklingPos.h}px`


container.style.backgroundSize = `${vw} ${vh}`

const squareSize = 10

const cols = Math.floor(vw/squareSize)
const rows = Math.floor(vh/squareSize)
 
let opDir
let audio

const paths = [
    {r1: 48, r2: 72, c1: 63, c2: 112},
    {r1: 72, r2: 84, c1: 51, c2: 92},
    {r1: 64, r2: 72, c1: 51, c2: 65},
    {r1: 59, r2: 63, c1: 51, c2: 65},
    {r1: 64, r2: 84, c1: 49, c2: 51},
    {r1: 59, r2: 84, c1: 45, c2: 49},
    {r1: 57, r2: 82, c1: 40, c2: 45},
    {r1: 54, r2: 79, c1: 35, c2: 40},
    {r1: 55, r2: 77, c1: 33, c2: 35},
    {r1: 44, r2: 76, c1: 30, c2: 33},
    {r1: 47, r2: 74, c1: 26, c2: 30},
    {r1: 49, r2: 72, c1: 22, c2: 26},
    {r1: 51, r2: 70, c1: 18, c2: 22},
    {r1: 53, r2: 67, c1: 14, c2: 18},
    {r1: 55, r2: 65, c1: 10, c2: 14},
    {r1: 57, r2: 63, c1: 6, c2: 9},
    {r1: 59, r2: 61, c1: 3, c2: 5},
    {r1: 28, r2: 48, c1: 73, c2: 97},
    {r1: 45, r2: 60, c1: 112, c2: 116},
    {r1: 42, r2: 68, c1: 117, c2: 120},
    {r1: 40, r2: 68, c1: 120, c2: 123},
    {r1: 38, r2: 66, c1: 123, c2: 127},
    {r1: 35, r2: 66, c1: 127, c2: 131},
    {r1: 33, r2: 50, c1: 131, c2: 135},
    {r1: 30, r2: 55, c1: 135, c2: 138},
    {r1: 32, r2: 55, c1: 138, c2: 141},
    {r1: 33, r2: 55, c1: 141, c2: 144},
    {r1: 35, r2: 54, c1: 144, c2: 147},
    {r1: 36, r2: 54, c1: 147, c2: 149},
]

let eachSquare

// for (let r = 0; r < rows; r++){
//     for (let c = 0; c < cols; c++){
//         eachSquare = document.createElement('div')
//         eachSquare.setAttribute('id', 'eachSquare')
//         eachSquare.style.width = `${squareSize}px`
//         eachSquare.style.height = `${squareSize}px`
//         eachSquare.style.position = 'absolute'
//         eachSquare.style.left = `${c*squareSize}px`
//         eachSquare.style.top = `${r*squareSize}px`
//         eachSquare.style.border = '1px solid grey'
//         eachSquare.style.zIndex = '5'

//         //map out walkable path   
//         for (let k = 0; k < paths.length ; k++){
//             if (r >= paths[k].r1 && r <= paths[k].r2 && c >= paths[k].c1 && c <= paths[k].c2){
//                 eachSquare.style.backgroundColor = "red"
//             }
//         }

//         container.appendChild(eachSquare)
//     }
// }

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

let sparklingInd = 0

function displaySparklingImg(){
    let fillInd = sparklingInd
    if (sparklingInd < 150){
        if (sparklingInd < 10){
            fillInd = "00" + sparklingInd.toString()
        } else if (sparklingInd >= 10 && sparklingInd < 100){
            fillInd = "0" + sparklingInd.toString()
        } 
        sparklingImage.src = `../../asset/Blue_Sparkles/Sparkles_00${fillInd}.png`
        sparklingInd += 1
    } else {
        sparklingInd = 0
    }

    setTimeout(displaySparklingImg, 30)

}
  

function isWalkable(){
    for (let k = 0; k < paths.length ; k++){
        if (characterPos.y + characterHeight >= paths[k].r1*10 && characterPos.y + characterHeight <= paths[k].r2*10 && characterPos.x + halfCharacterWidth >= paths[k].c1*10 && characterPos.x + halfCharacterWidth <= paths[k].c2*10){
            return true
        }
    }
    return false
}

//function to play sound
function playSound(file){
    var audio = new Audio(file);
    audio.play()
    letSoundPlay = false
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

let gapToNextStep = 0
let audioIsBeingPlayed = false
function speak(file){
    audio = new Audio(file);
    audio.volume = 1;
    audio.play()
    audio.onloadedmetadata = function() {
        gapToNextStep = audio.duration*1000
    };
    setTimeout(function(){
        audioIsBeingPlayed = false
    }, gapToNextStep)
}

function stopVO(){
    audio.pause()
}

let firstWalk = true

function walk(e){
    let playAudioOnWalking = localStorage.getItem('playAudioOnWalking')

    //describe the environment
    if (firstWalk && playAudioOnWalking === "true"){
        speak('../../asset/VOfiles/PerspectivesVO_officeDescribe.wav')
        firstWalk = false
    }

    if (!isWalkable()){
        disableCurWalkingDir()
    } else {
        enableWalkingDir()
    }
    if (e.key === "ArrowRight" && allowedWalkingDir["RIGHT"]){
        curDir = "RIGHT"
        characterPos.x = characterPos.x + 20
        opDir = "LEFT"
        getCharacterMove("RIGHT")
        playerImg.src = character_image["RIGHT"]
        playerImg.style.transform = 'rotateY(360deg)'
        if (playAudioOnWalking === "true" && !firstWalk){
            if (curDir !== preDir || preDir === null){
                audioIsBeingPlayed = true
                speak('../../asset/VOfiles/PerspectivesVO_moveRight.wav')
            }
        }
    } else if (e.key === "ArrowLeft" && allowedWalkingDir["LEFT"]){
        curDir = "LEFT"
        characterPos.x = characterPos.x - 20
        opDir = "RIGHT"
        getCharacterMove("LEFT")
        playerImg.src = character_image["LEFT"]
        playerImg.style.transform = 'rotateY(180deg)'
        if (playAudioOnWalking === "true" && !firstWalk){
            if (curDir !== preDir || preDir === null){
                audioIsBeingPlayed = true
                speak('../../asset/VOfiles/PerspectivesVO_moveLeft.wav')
            }
        }
    } else if (e.key === "ArrowUp" && allowedWalkingDir["UP"]){
        curDir = "UP"
        characterPos.y = characterPos.y - 20
        opDir = "DOWN"
        getCharacterMove("UP")
        playerImg.src = character_image["UP"]
        if (playAudioOnWalking === "true" && !firstWalk){
            if (curDir !== preDir || preDir === null){
                audioIsBeingPlayed = true
                speak('../../asset/VOfiles/PerspectivesVO_moveUp.wav')
            }
        }
    } else if (e.key === "ArrowDown" && allowedWalkingDir["DOWN"]){
        curDir = "DOWN"
        characterPos.y = characterPos.y + 20
        opDir = "UP"
        getCharacterMove("DOWN")
        playerImg.src = character_image["DOWN"]
        if (playAudioOnWalking === "true" && !firstWalk){
            if (curDir !== preDir || preDir === null){
                audioIsBeingPlayed = true
                speak('../../asset/VOfiles/PerspectivesVO_moveDown.wav')
            }
        }
    }
    character.style.left = `${characterPos.x}px`
    character.style.top = `${characterPos.y}px`

    if (characterPos.x + halfCharacterWidth >= sparklingPos.x  && characterPos.x + halfCharacterWidth <= sparklingPos.x + sparklingSize.w
        && characterPos.y + characterHeight >= sparklingPos.y && characterPos.y + characterHeight <= sparklingPos.y + sparklingSize.h
        && e.key === "Enter"
        ){
          stopVO()
          window.location.href = '../../scenario/scenario1/yangConversation.html'
        }

    preDir = curDir
}

function handleKeyDown(e){
    if (!audioIsBeingPlayed){
        walk(e)
    }
}

document.addEventListener("keydown", handleKeyDown)
displaySparklingImg()