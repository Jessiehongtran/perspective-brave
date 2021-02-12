const container = document.getElementById("container")
const character = document.getElementById("playerImg")
const redBalloon = document.getElementById("red")
const blueBalloon = document.getElementById("blue")
const purpleBalloon = document.getElementById("purple")

const gapBetweenBalloons = 10

const balloonSize = {
    width: 15,
    height: 50
}

const characterSize = {
    width: 11,
    height: 22
}

const character_face = {
    right: "https://res.cloudinary.com/dfulxq7so/image/upload/v1611950517/Yang_LeftSide_2x_qc1sg5.png",
    left: "https://res.cloudinary.com/dfulxq7so/image/upload/v1611950538/Yang_RightSide_2x_i223zj.png"
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
    x: redBalloonPos.x + balloonSize.width + gapBetweenBalloons,
    y: 20
}
const purpleBalloonPos = {
    x: redBalloonPos.x + balloonSize.width*2 + gapBetweenBalloons*2,
    y: 20
}

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
    setTimeout(jump, 50)
}

function handleKeyDown(e){
    console.log("down")
    timeKeyDown = new Date()

    //move right
    if (e.key === "ArrowRight"){
        characterPos.x += 1
        character.src = character_face.right
    } 
    //move left
    else  if (e.key === "ArrowLeft"){
        characterPos.x -= 1
        character.src = character_face.left
    } 
    //jump
    if (e.keyCode === 32){
        countStep = 0
        if (character.src === character_face.right){
            change = 1
            jump()
        } else {
            change = -1
            jump()
        }
    }

    character.style.left = `${characterPos.x}%`
    character.style.top = `${characterPos.y}%`
}




document.addEventListener('keydown', handleKeyDown)