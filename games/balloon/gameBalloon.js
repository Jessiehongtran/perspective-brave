const container = document.getElementById("container")
const character = document.getElementById("playerImg")
const redBalloon = document.getElementById("red")
const blueBalloon = document.getElementById("blue")
const purpleBalloon = document.getElementById("purple")
const text = document.getElementById("text")
const cloud = document.getElementById("cloud")
const land = document.getElementById("land")
const skyLanding = document.getElementById("sky-landing")


const gapBetweenBalloons = 10
const maxImageInd = 15
const skyLandingHeight = 10

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

const balloonExplodeCostume = {
    red: "https://res.cloudinary.com/dfulxq7so/image/upload/v1613147601/redExplode_hqjuxt.png",
    purple: "https://res.cloudinary.com/dfulxq7so/image/upload/v1613147747/purpleExplode_jc94h3.png"
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
const balloonFlyingSpeed = 30
const balloonFlyingChange = 5
let letSoundPlay = true

//Function to get character image file (that is stored locally)
function getCharacterImg(id){
    if (id < 10){
      id = "0" + id.toString()
    } 
    return `../../asset/Yang_Walk_LR/Yang_Walk_LR_000${id}.png`
  }

//function to get character and blue balloon fall down
function fallCharacterAndBalloon(){
    console.log("invokinggggg", characterPos.y, blueBalloonPos.y)
    blueBalloonPos.y += 5
    characterPos.y += 5

    blueBalloon.style.top = `${blueBalloonPos.y}%`
    character.style.top =  `${characterPos.y}%`

    if (characterPos.y + characterSize.height < 45 - characterSize.height - skyLandingHeight){
        setTimeout(fallCharacterAndBalloon, balloonFlyingSpeed)
    }
}

//Function to show sky setup
function showSky(){
    //hide text, red and purple balloons and land
    text.style.display = redBalloon.style.display = purpleBalloon.style.display =  land.style.display =  'none'

    //show cloud
    cloud.style.display = 'block'

    //show sky landing
    skyLanding.style.display = 'block'
    skyLanding.style.transition = 'all 1s ease'
    skyLanding.style.height = `${skyLandingHeight}%`

    //show character falling
    fallCharacterAndBalloon()
}

//Fly character
function flyCharacter(){
    console.log("fly character")

     //update character coordinates
    characterPos.y -= balloonFlyingChange
    character.style.top = `${characterPos.y}%`

    //recursion
    if (characterPos.y > - characterSize.height - 10){
        setTimeout(flyCharacter, balloonFlyingSpeed)
    }
}


//Functions to fly the balloons
function flyRed(){
    console.log("flying red", redBalloonPos.y)

     //update balloon coordinates
    redBalloonPos.y -= balloonFlyingChange
    redBalloon.style.top = `${redBalloonPos.y}%`

     //change costume and play sound
    if (redBalloonPos.y < 15 && letSoundPlay){
        changeCostume("red")
        playSound('../../asset/sounds/Explode.mp3')
    }

    //recursion
    if (redBalloonPos.y > - balloonSize.height - 10){
        setTimeout(flyRed, balloonFlyingSpeed)
    } 
}

function flyBlue(){
    console.log("flying blue", blueBalloonPos.y)

    //update balloon coordinates
    blueBalloonPos.y -= balloonFlyingChange
    blueBalloon.style.top = `${blueBalloonPos.y}%`

    //fly character and play sound
    if (blueBalloonPos.y < 15 && letSoundPlay){
        flyCharacter() //realize that as long as this function is called, flyBlue is called as well >> very interesting
        playSound('../../asset/sounds/Cheer.mp3')
    }

    //change background to sky
    setTimeout(showSky, 1000)

    //recursion
    if (blueBalloonPos.y > - balloonSize.height - 10){
        setTimeout(flyBlue, balloonFlyingSpeed)  
    } 
}

function flyPurple(){
    console.log("flying purple", purpleBalloonPos.y)

    //update balloon coordinates
    purpleBalloonPos.y -= balloonFlyingChange
    purpleBalloon.style.top = `${purpleBalloonPos.y}%`

    //change costume and play sound
    if (purpleBalloonPos.y < 15 && letSoundPlay){
        changeCostume("purple")
        playSound('../../asset/sounds/Explode.mp3')
    }

    //recursion
    if (purpleBalloonPos.y > - balloonSize.height - 10){
        setTimeout(flyPurple, balloonFlyingSpeed)
    } 
}


//Function to get a movement
function getCharacterMove(dir){
    character_face[dir] = getCharacterImg(moveInd[dir])
    moveInd[dir] += 1
   
}

//function to play sound
function playSound(file){
    var audio = new Audio(file);
    audio.play()
    letSoundPlay = false
}

//function to change costume
function changeCostume(balloonColor){
    console.log("changing costume", balloonColor)
    if (balloonColor === "red"){
        console.log("changing costume of red")
        redBalloon.style.backgroundImage = `url(${balloonExplodeCostume.red})`
    } else if (balloonColor === "purple"){
        console.log("changing costume of purple")
        purpleBalloon.style.backgroundImage = `url(${balloonExplodeCostume.purple})`
    }
}

//function to check if character touches a balloon
function checkTouchBalloon(){
    if (characterPos.x + characterSize.width/2 >= redBalloonPos.x 
        && characterPos.x + characterSize.width/2 <= redBalloonPos.x + balloonSize.width
        && characterPos.y >= redBalloonPos.y 
        && characterPos.y <= redBalloonPos.y + balloonSize.height/2){
            console.log("touch red")
            flyRed()
        } 
    else if (characterPos.x + characterSize.width/2 >= blueBalloonPos.x 
        && characterPos.x + characterSize.width/2 <= blueBalloonPos.x + balloonSize.width
        && characterPos.y >= blueBalloonPos.y 
        && characterPos.y <= blueBalloonPos.y + balloonSize.height/2){
            console.log("touch blue")
            flyBlue()
        }
    else if (characterPos.x + characterSize.width/2 >= purpleBalloonPos.x 
        && characterPos.x + characterSize.width/2 <= purpleBalloonPos.x + balloonSize.width
        && characterPos.y >= purpleBalloonPos.y 
        && characterPos.y <= purpleBalloonPos.y + balloonSize.height/2){
            console.log("touch purple")
            flyPurple()
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

    checkTouchBalloon()

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
        letSoundPlay = true 
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