document.addEventListener('keydown', handleKeyDown)
document.addEventListener('keyup', handleKeyUp)
setTimeout(showExit, 60000)

//DOM elements
const container = document.getElementById("container")
const char = document.getElementById("player")
const charImg = document.getElementById("playerImg")
const sparkling = document.getElementById("sparkling")
const sparklingImage = document.getElementsByClassName("sparklingImage")[0]
const instruction = document.getElementById("instruction")
const root = document.querySelector(":root")
const arrows = document.getElementsByClassName("arrow")
const infoIcon = document.getElementsByClassName("infoIcon")[0]
const tutorial = document.getElementsByClassName("tutorial")[0]
const toolTipText = document.getElementsByClassName("tooltiptext")[0]
const sizeChange = document.getElementsByClassName('size-change')[0] 
const decreaseSizeIcon = document.getElementsByClassName('icon decrease-size')[0] 
const increaseSizeIcon = document.getElementsByClassName('icon increase-size')[0] 
const curMode = sessionStorage.getItem('data-theme')
const bigOffice = document.getElementsByClassName("bigOffice")[0]
let rowAdjust = 0

let audioBeingPlayed = false

const controlKey = document.getElementById("control-key")

const arrowKeyHolder = document.getElementById("arrowKeyHolder")

let sizeElastic = parseInt(localStorage.getItem('sizeElastic')) || 0

if (curMode && curMode === "dark"){
    bigOffice.src = 'https://res.cloudinary.com/dfulxq7so/image/upload/v1619548447/Group_305_scs2ey.svg'
    container.style.backgroundColor = "#1D1D1D"
    instruction.style.backgroundColor = "#015EF4"
    instruction.style.color = '#FFFFFF'
    for (let i = 0; i < arrows.length; i++){
        arrows[i].style.backgroundColor = "#000000"
    }
    controlKey.style.backgroundColor = '#FF2EE0'
    controlKey.style.color = '#000000'
    root.style.setProperty("--pseudo-bordercolor", "#015EF4")
    infoIcon.style.backgroundImage = 'url(https://res.cloudinary.com/dfulxq7so/image/upload/v1619538404/infoIcon-dark_nchudy.svg)'
    infoIcon.style.color = "#FFFFFF"
    sizeChange.style.backgroundColor = '#015EF4'
    decreaseSizeIcon.style.color = increaseSizeIcon.style.color = '#FFFFFF'
}

function toggleInstruction(){
    console.log('toggleInstruction')
    if (instruction.style.display !== 'none'){
        instruction.style.display = 'none'
    } else {
        instruction.style.display = 'flex'
    }
}



//variables
const charPos = {
    x: 65,
    y: 30
}

const charFace = {
    "UP": "../asset/Yang_Walk_UP/Yang_Walk_UP_00000.png",
    "DOWN": "../asset/Yang_Walk_DN/Yang_Walk_DN_00000.png",
    "LEFT": "../asset/Yang_walk_LR/Yang_Walk_LR_00000.png",
    "RIGHT": "../asset/Yang_walk_LR/Yang_Walk_LR_00000.png"
}

//Initiate variables to keep track image index
let moveInd = {
    "UP": 0,
    "DOWN": 0,
    "LEFT": 0,
    "RIGHT": 0
  }

let canWalk = {
    "UP": true,
    "DOWN": true,
    "LEFT": true,
    "RIGHT": true
}

let charSize = {
    w: 6,
    h: 8.7
}

const sparkPos = {
    x: 30,
    y: 50
}

const sparkSize = {
    w: 6,
    h: 6
}

const changeX = 1
const changeY = 1
let sparklingInd = 0

const squareSize = 1
const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
if (vw < 1300){
    rowAdjust = -10
}


const cols = 100
const rows = 100
const squares = []
let eachSquare
let firstWalk = true
let intheSpark = false
let inSparkReminder = true
let curDir
const withScreenReader = sessionStorage.getItem('screen-reader')

//setup
char.style.left = `${charPos.x}%`
char.style.top = `${charPos.y}%`
char.style.width = `${charSize.w}%`
char.style.height = `${charSize.h}%`
sparkling.style.left = `${sparkPos.x}%`
sparkling.style.top = `${sparkPos.y}%`
sparkling.style.width = `${sparkSize.w}%`
sparkling.style.height = `${sparkSize.h}%`


function displaySparklingImg(){
    let fillInd = sparklingInd
    if (sparklingInd < 150){
        if (sparklingInd < 10){
            fillInd = "00" + sparklingInd.toString()
        } else if (sparklingInd >= 10 && sparklingInd < 100){
            fillInd = "0" + sparklingInd.toString()
        } 
        sparklingImage.src = `../asset/Blue_Sparkles/Sparkles_00${fillInd}.png`
        sparklingInd += 1
    } else {
        sparklingInd = 0
    }

    setTimeout(displaySparklingImg, 30)

}
displaySparklingImg()

//Function to get character image file (that is stored locally)
function getCharacterImg(dir, id){
    if (id < 10){
      id = "0" + id.toString()
    } 
    if (dir === "UP"){
      return `../asset/Yang_Walk_UP/Yang_Walk_UP_000${id}.png`
    } else if (dir === "DOWN"){
      return `../asset/Yang_Walk_DN/Yang_Walk_DN_000${id}.png`
    } else if (dir === "LEFT" || dir === "RIGHT"){
      return `../asset/Yang_Walk_LR/Yang_Walk_LR_000${id}.png`
    } 
  }
  
const maxImageInd = 15

//Function to get a movement
function getCharacterMove(dir){
    charFace[dir] = getCharacterImg(dir, moveInd[dir])
    moveInd[dir] += 1
    if (moveInd[dir] >= maxImageInd){
        moveInd[dir] = 0
    } 
}

function isCloserToSparklingSpot(nextX, nextY, curX, curY){
    if (getDistance(nextX, nextY, sparkPos.x + sparkSize.w/2, sparkPos.y + sparkSize.h + 1.5) 
        < getDistance(curX, curY, sparkPos.x + sparkSize.w/2, sparkPos.y + sparkSize.h + 1.5)){
            return true
    }
    return false
}

function handleKeyUp(){
    const screenReader = sessionStorage.getItem('screen-reader')
    let nextX, nextY
    if (curDir === "LEFT"){
        nextX = charPos.x - changeX
        nextY = charPos.y
    } else if (curDir === "RIGHT"){
        nextX = charPos.x + changeX
        nextY = charPos.y
    } else if (curDir === "UP"){
        nextX = charPos.x 
        nextY = charPos.y - changeY
    } else if (curDir === "DOWN"){
        nextX = charPos.x 
        nextY = charPos.y + changeY
    }

    if (!audioBeingPlayed && screenReader && screenReader === "true" && isCloserToSparklingSpot(nextX, nextY, charPos.x, charPos.y)){
        //hint you are closer to sparkling spot
        audio = new Audio('../asset/VOfiles/PerspectivesVO_closeToSpot2.mp3')
        audioBeingPlayed = true
        audio.play()
        audio.onloadedmetadata = function(){
            setTimeout(function(){
                audioBeingPlayed = false
            }, audio.duration*1000)
        }
        

    }
}

function handleKeyDown(e){
    console.log('key in office', e.key)
    if (e.key === "e"){
        window.location.href = "../scenario/scenario1/yangConversation.html"
    }

    if (!intheSpark){
        if (e.key === "a" && canWalk["LEFT"]){
            curDir = "LEFT"
            charPos.x -= changeX
            charImg.style.transform = 'rotateY(180deg)'

            if (e.key === "w" && canWalk["UP"]){
                charPos.y -= changeY
            }
            if (e.key === "s" && canWalk["DOWN"]){
                charPos.y += changeY
            }
            getCharacterMove(curDir)
            charImg.src = charFace[curDir]
        }
        if (e.key === "d" && canWalk["RIGHT"]){
            curDir = "RIGHT"
            charPos.x += changeX
            charImg.style.transform = 'rotateY(360deg)'

            if (e.key === "w" && canWalk["UP"]){
                charPos.y -= changeY
            }
            if (e.key === "s" && canWalk["DOWN"]){
                charPos.y += changeY
            }
            getCharacterMove(curDir)
            charImg.src = charFace[curDir]
        }
        if (e.key === "w" && canWalk["UP"]){
            curDir = "UP"
            charPos.y -= changeY

            if (e.key === "a" && canWalk["LEFT"]){
                charPos.x -= changeX
            }
            if (e.key === "d" && canWalk["RIGHT"]){
                charPos.x += changeX
            }
            getCharacterMove(curDir)
            charImg.src = charFace[curDir]
        }
        if (e.key === "s" && canWalk["DOWN"]){
            curDir = "DOWN"
            charPos.y += changeY

            if (e.key === "a" && canWalk["LEFT"]){
                charPos.x -= changeX
            }
            if (e.key === "d" && canWalk["RIGHT"]){
                charPos.x += changeX
            }
            getCharacterMove(curDir)
            charImg.src = charFace[curDir]
        }

       
        const curRow = Math.floor((charPos.y + charSize.h)/squareSize)
        const curCol = Math.floor((charPos.x + charSize.w/2)/squareSize)

        if (isWalkable(curRow, curCol)){
            canWalk = {
                "UP": true,
                "DOWN": true,
                "LEFT": true,
                "RIGHT": true
            }
            char.style.left = `${charPos.x}%`
            char.style.top = `${charPos.y}%`

        } else {
            canWalk[curDir] = false
            //hit sound
            audio = new Audio('../asset/VOfiles/PerspectivesVO_hit.mp3');
            audio.play()
        }
    }


    //check enter sparkling
    if (charPos.x + charSize.w/2 >= sparkPos.x + 1
            && charPos.x + charSize.w/2 <= sparkPos.x + sparkSize.w - 1
            && charPos.y + charSize.h >= sparkPos.y + sparkSize.h + 2.5
            && charPos.y + charSize.h <= sparkPos.y + sparkSize.h + 4.7){
                // console.log('inSparkReminder', inSparkReminder)
                if (inSparkReminder){
                    intheSpark = true
                    inSparkReminder = false
                    audio = new Audio('../asset/VOfiles/PerspectivesVO_inTheSpark.wav');
                    audio.onloadedmetadata = function() {
                        setTimeout(function(){
                            inSparkReminder = true
                        }, audio.duration*1000)
                    };
                    audio.play()
                }
                if (e.key === "Enter"){
                    //move to next page
                    window.location.href = "../scenario/scenario1/yangConversation.html"
                }
    }
    

}

//path limit
for (let r = 0; r < rows; r++){
    let squareRows = []
    for (let c = 0; c < cols; c++){
        eachSquare = document.createElement('div')
        eachSquare.setAttribute('id', 'eachSquare')
        eachSquare.style.width = `${squareSize}%`
        eachSquare.style.height = `${squareSize}%`
        eachSquare.style.position = 'absolute'
        eachSquare.style.left = `${c*squareSize}%`
        eachSquare.style.top = `${r*squareSize}%`
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

function drawACol(col, startRow, endRow){
    for (let i = startRow; i < endRow + 1; i++){
        if (i < rows && col < cols){
            squares[i][col].element.style.backgroundColor = 'red'
            squares[i][col].walkable = true
        }
    }
}

function drawStair(leftRow, leftCol, rightCol, stepLength, stepWidth,stepGap, dimension){
    let dimenInd = 1*stepGap
    if (dimension === "UP"){
        dimenInd  = -1*stepGap
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

drawStair(45, 10, 50, 18 + rowAdjust, 2, 2, "DOWN")
drawStair(27, 24, 60, 12 , 2, 2, "DOWN")
drawStair(40, 28, 50, 24 , 2, 2, "DOWN")
drawStair(20, 36, 50, 24 , 2, 2, "DOWN")
drawStair(40, 50, 60, 20 , 2, 2, "DOWN")
drawStair(44, 52, 72, 22 , 2, 2, "UP")
drawStair(32, 72, 80, 20 , 2, 2, "DOWN")

if (rowAdjust === 0){
    drawStair(66, 50, 80, 12 , 2, 2, "UP")
    drawStair(55, 23, 30, 11 , 5, 2, "DOWN")
} else {
    drawStair(38, 54, 72, 4 , 2, 2, "UP")
    drawStair(28, 72, 80, 4 , 2, 2, "DOWN")
    drawStair(49, 23, 30, 11 , 5, 0, "DOWN")
}

//checkWalkable
function isWalkable(r,c){
    if (r < rows && c < cols && squares[r][c].walkable){
        return true
    }
    return false
}

function showExit(){
    while (instruction.firstChild) {
        instruction.removeChild(instruction.firstChild);
      }
    instruction.innerHTML = `Press <span class="key-btn extra">E</span> to exit`
    instruction.style.flexDirection = 'row'
    audio = new Audio('../asset/VOfiles/PerspectivesVO_officeExit.mp3')
    audio.play()
}

//set sizes
toolTipText.style.fontSize = `${14 + sizeElastic}px`
tutorial.style.fontSize = `${18 + sizeElastic}px`
arrowKeyHolder.style.fontSize = `${16 + sizeElastic}px`
infoIcon.style.width = `${6 + sizeElastic/10}%`
infoIcon.style.fontSize = `${14 + sizeElastic}px`
infoIcon.style.height = `${5 + sizeElastic/10}%`

function updateSize(){
    if (sizeElastic > -5 && sizeElastic < 5){
        toolTipText.style.fontSize = `${14 + sizeElastic}px`
        tutorial.style.fontSize = `${18 + sizeElastic}px`
        tutorial.style.lineHeight = `${38 + sizeElastic}px`
        arrowKeyHolder.style.fontSize = `${16 + sizeElastic}px`
        arrowKeyHolder.style.lineHeight = `${23 + sizeElastic}px`
        infoIcon.style.width = `${6 + sizeElastic/10}%`
        infoIcon.style.fontSize = `${14 + sizeElastic}px`
        infoIcon.style.height = `${5 + sizeElastic/10}%`
    }
    localStorage.setItem('sizeElastic', sizeElastic)
}

function increaseSize(){
    sizeElastic += 1
    updateSize()
}
function decreaseSize(){
    sizeElastic -= 1
    updateSize()
}

function getDistance(x1, y1, x2, y2){
    return Math.sqrt(Math.pow(x1-x2, 2) + Math.pow(y1-y2, 2))
}
