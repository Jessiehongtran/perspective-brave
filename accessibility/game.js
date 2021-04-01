let canWalk = {
    "LEFT": true,
    "RIGHT": true,
    "DOWN": true,
    "UP": true
}
let curDir 
const charFace = {
    "UP": "../asset/Yang_Walk_UP/Yang_Walk_UP_00000.png",
    "DOWN": "../asset/Yang_Walk_DN/Yang_Walk_DN_00000.png",
    "LEFT": "../asset/Yang_walk_LR/Yang_Walk_LR_00000.png",
    "RIGHT": "../asset/Yang_walk_LR/Yang_Walk_LR_00000.png"
}
const char = document.getElementsByClassName("character")[0]
const greenBalloon = document.getElementsByClassName("balloon green")[0]
const redBalloon = document.getElementsByClassName("balloon red")[0]
const yellowBalloon = document.getElementsByClassName("balloon yellow")[0]

let charPos = {
    x: 55,
    y: 50
}

let charSize = {
    w: 12,
    h: 12
}
const changeX = 2
const changeY = 2

const greenBalloonPos = {
    x: 18,
    y: 35
}

const redBalloonPos = {
    x: 45,
    y: 5
}

const yellowBalloonPos = {
    x: 73,
    y: 35
}

const balloonSize = {
    w: 10,
    h: 25
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

let countStep = 0
const totalStep = 10
const flyingSpeed = 2

function handleKeyDown(e){
    if (e.key === "a" && canWalk["LEFT"]){
        //move left
        curDir = "LEFT"
        charPos.x -= changeX
        charPos.y -= changeY
        char.src = charFace["LEFT"]
        char.style.transform = 'rotateY(180deg)'
    }
    if (e.key === "d" && canWalk["RIGHT"]){
        //move right
        curDir = "RIGHT"
        charPos.x += changeX
        charPos.y += changeY
        char.src = charFace["RIGHT"]
        char.style.transform = 'rotateY(360deg)'
    }
    if (e.key === "w" && canWalk["UP"]){
        curDir = "UP"
        //move up
        charPos.x += changeX
        charPos.y -= changeY
        char.src = charFace["UP"]
    }
    if (e.key === "s" && canWalk["DOWN"]){
        curDir = "DOWN"
        //move down
        charPos.x -= changeX
        charPos.y += changeY
        char.src = charFace["DOWN"]
    }

    charSize = {
        w: 5,
        h: 12
    }

    char.style.left = `${charPos.x}%`
    char.style.top = `${charPos.y}%`
    char.style.width = `${charSize.w}%`
    char.style.height = `${charSize.h}%`

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
            flyRedBalloon()
        }

    if (charPos.x + charSize.w/2 >= yellowBalloonPos.x && charPos.x + charSize.w/2 <= yellowBalloonPos.x + balloonSize.w
        && charPos.y  >= yellowBalloonPos.y && charPos.y <= yellowBalloonPos.y + balloonSize.h){
            flyYellowBalloon()
        }

    if (countStep <= totalStep*2) {
        setTimeout(jump, 50)
    } 
}

function flyGreenBalloon(){
    if (greenBalloonPos.y > - balloonSize.h){
        greenBalloonPos.y -= flyingSpeed
        greenBalloon.style.top = `${greenBalloonPos.y}%`
        setTimeout(flyGreenBalloon, 80)
    }
}

function flyRedBalloon(){
    if (redBalloonPos.y > - balloonSize.h){
        redBalloonPos.y -= flyingSpeed
        redBalloon.style.top = `${redBalloonPos.y}%`
        setTimeout(flyRedBalloon, 80)
    }
}

function flyYellowBalloon(){
    if (yellowBalloonPos.y > - balloonSize.h){
        yellowBalloonPos.y -= flyingSpeed
        yellowBalloon.style.top = `${yellowBalloonPos.y}%`
        setTimeout(flyYellowBalloon, 80)
    }
}

document.addEventListener('keydown', handleKeyDown)

//path limit

//maybe allow choosing balloon by just tabing

//wrong or correct indication