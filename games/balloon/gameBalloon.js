const container = document.getElementById("container")
const character = document.getElementById("playerImg")
const redBalloon = document.getElementById("red")
const blueBalloon = document.getElementById("blue")
const purpleBalloon = document.getElementById("purple")

const gapBetweenBalloons = 10
const maxImageInd = 15

const moveInd = { 
    right: 0,
    left: 0
}

const balloonSize = {
    width: 15,
    height: 50
}

const characterSize = {
    width: 11,
    height: 22
}

const character_face = {
    right: "",
    left: ""
}
const characterPos = {
    x: 10,
    y: 63
}
const redBalloonPos = {
    x: 20,
    y: 20
}
const blueBalloonPos = {
    x: 20 + balloonSize.width + gapBetweenBalloons,
    y: 20
}
const purpleBalloonPos = {
    x: 20 + balloonSize.width*2 + gapBetweenBalloons*2,
    y: 20
}

let playerImageInd = 0

character.style.width = `${characterSize.width}%`
character.style.height = `${characterSize.height}%`
character.style.left = `${characterPos.x}%`
character.style.top = `${characterPos.y}%`
redBalloon.style.width = blueBalloon.style.width = purpleBalloon.style.width = `${balloonSize.width}%`
redBalloon.style.height = blueBalloon.style.height = purpleBalloon.style.height = `${balloonSize.height}%`
redBalloon.style.left = `${redBalloonPos.x}%`
redBalloon.style.top = `${redBalloonPos.y}%`
blueBalloon.style.left = `${blueBalloonPos.x}%`
blueBalloon.style.top = `${blueBalloonPos.y}%`
purpleBalloon.style.left = `${purpleBalloonPos.x}%`
purpleBalloon.style.top = `${purpleBalloonPos.y}%`

let timeKeyDown
let timeKeyUp
let balloonSelected = false
const balloonFlyingSpeed = 30
const balloonFlyingChange = 5

//Function to get character image file (that is stored locally)
function getCharacterImg(id){
    if (id < 10){
      id = "0" + id.toString()
    } 
    return `../../asset/Yang_Walk_LR/Yang_Walk_LR_000${id}.png`
  }

//Functions to fly the balloons
function flyRed(){
    redBalloonPos.y -= balloonFlyingChange
    redBalloon.style.top = `${redBalloonPos.y}%`
    setTimeout(flyRed, balloonFlyingSpeed)
}

function flyBlue(){
    blueBalloonPos.y -= balloonFlyingChange
    blueBalloon.style.top = `${blueBalloonPos.y}%`
    setTimeout(flyBlue, balloonFlyingSpeed)
}

function flyPurple(){
    purpleBalloonPos.y -= balloonFlyingChange
    purpleBalloon.style.top = `${purpleBalloonPos.y}%`
    setTimeout(flyPurple, balloonFlyingSpeed)
}


//Function to get a movement
function getCharacterMove(dir){
    character_face[dir] = getCharacterImg(moveInd[dir])
    moveInd[dir] += 1
   
}

//function to check if character touches a balloon
function checkTouchBalloon(){
    if (characterPos.x + characterSize.width/2 >= redBalloonPos.x 
        && characterPos.x + characterSize.width/2 <= redBalloonPos.x + balloonSize.width
        && characterPos.y >= redBalloonPos.y 
        && characterPos.y <= redBalloonPos.y + balloonSize.height/2){
            console.log("touch red")
            flyRed()
            balloonSelected = true
        } 
    else if (characterPos.x + characterSize.width/2 >= blueBalloonPos.x 
        && characterPos.x + characterSize.width/2 <= blueBalloonPos.x + balloonSize.width
        && characterPos.y >= blueBalloonPos.y 
        && characterPos.y <= blueBalloonPos.y + balloonSize.height/2){
            console.log("touch blue")
            flyBlue()
            balloonSelected = true
        }
    else if (characterPos.x + characterSize.width/2 >= purpleBalloonPos.x 
        && characterPos.x + characterSize.width/2 <= purpleBalloonPos.x + balloonSize.width
        && characterPos.y >= purpleBalloonPos.y 
        && characterPos.y <= purpleBalloonPos.y + balloonSize.height/2){
            console.log("touch purple")
            flyPurple()
            balloonSelected = true
        }

}

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

    console.log(balloonSelected)

    if (!balloonSelected ){
        checkTouchBalloon()
    }

    if (countStep <= totalStep*2) {
        setTimeout(jump, 50)
    }  
}

function handleKeyDown(e){
    timeKeyDown = new Date()

    //move right
    if (e.key === "ArrowRight"){
        characterPos.x += 1
        character_face.right = getCharacterImg(moveInd.right)
        character.src = character_face.right
        character.style.transform = 'rotateY(360deg)'
        moveInd.right += 1
        if (moveInd.right >= maxImageInd){
            moveInd.right = 0
        } 
        
    } 
    //move left
    else  if (e.key === "ArrowLeft"){
        characterPos.x -= 1
        character_face.left = getCharacterImg(moveInd.left)
        character.src = character_face.left
        character.style.transform = 'rotateY(180deg)'
        moveInd.left += 1
        if (moveInd.left >= maxImageInd){
            moveInd.left = 0
        } 
    } 
    //jump
    if (e.keyCode === 32){
        countStep = 0
        if (character.src === character_face.right){
            change = 1
        } else {
            change = -1
        }
        jump()
    }

    character.style.left = `${characterPos.x}%`
    character.style.top = `${characterPos.y}%`
}




document.addEventListener('keydown', handleKeyDown)