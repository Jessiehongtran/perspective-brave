const characterPos = {
    x: 40,
    y: 50
}

const characterSize = {
    w: 50,
    h: 50
}

const character = document.getElementById('player')
const playerImg = document.getElementById('playerImg')

character.style.left = `${characterPos.x}%`
character.style.top = `${characterPos.y}%`


//function for character to jump
let countStep = 0
let totalStep = 10
let change
function jump(){
    if (countStep < totalStep) {
        characterPos.y -= 2
        characterPos.x = characterPos.x  + change*0.02
    } else if (countStep >= totalStep && countStep < totalStep*2){
        characterPos.y += 2
        characterPos.x = characterPos.x  + change*0.02
    }   
    //if touch platform, stop
    countStep += 1

    character.style.left = `${characterPos.x}%`
    character.style.top = `${characterPos.y}%`

    // checkTouchBalloon()

    if (countStep <= totalStep*2) {
        setTimeout(jump, 50)
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

function handleKeyDown(e){
    //move right
    if (e.key === "ArrowRight"){
        characterPos.x += 1
        getCharacterMove("RIGHT")
        playerImg.src = character_image["RIGHT"]
        playerImg.style.transform = 'rotateY(360deg)'
    } 
    //move left
    if (e.key === "ArrowLeft"){
        characterPos.x -= 1
        getCharacterMove("LEFT")
        playerImg.src = character_image["LEFT"]
        playerImg.style.transform = 'rotateY(180deg)'
    } 
    //move up
    if (e.key === "ArrowUp"){
        characterPos.y -= 1
        getCharacterMove("UP")
        playerImg.src = character_image["UP"]
    } 
    //move down
    if (e.key === "ArrowDown"){
        characterPos.y += 1
        getCharacterMove("DOWN")
        playerImg.src = character_image["DOWN"]
    } 
    //jump
    if (e.keyCode === 32){
        countStep = 0
        jump()
    }

    character.style.left = `${characterPos.x}%`
    character.style.top = `${characterPos.y}%`
    playerImg.style.width = `30%`
    playerImg.style.height = `30%`
}




document.addEventListener('keydown', handleKeyDown)