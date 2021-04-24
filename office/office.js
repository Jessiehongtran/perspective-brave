document.addEventListener('keydown', handleKeyDown)
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
const decreaseSizeIcon = document.getElementsByClassName('icon decrease-size')[0]
const increaseSizeIcon = document.getElementsByClassName('icon increase-size')[0]
const curMode = sessionStorage.getItem('data-theme')
const bigOffice = document.getElementsByClassName("bigOffice")[0]

const controlKey = document.getElementById("control-key")

const arrowKeyHolder = document.getElementById("arrowKeyHolder")

let sizeElastic = parseInt(localStorage.getItem('sizeElastic')) || 0

if (curMode && curMode === "dark"){
    bigOffice.src = 'https://res.cloudinary.com/dfulxq7so/image/upload/v1618942774/office-dark_ofafkt.svg'
    instruction.style.backgroundColor = "#015EF4"
    instruction.style.color = '#FFFFFF'
    for (let i = 0; i < arrows.length; i++){
        arrows[i].style.backgroundColor = "#000000"
    }
    controlKey.style.backgroundColor = '#FF2EE0'
    controlKey.style.color = '#000000'
    root.style.setProperty("--pseudo-bordercolor", "#015EF4")
    infoIcon.style.backgroundImage = 'url(https://res.cloudinary.com/dfulxq7so/image/upload/v1619027718/infoIcon-noword-dark_sqcaou.svg)'
    infoIcon.style.color = "#FFFFFF"
    increaseSizeIcon.src = "https://res.cloudinary.com/dfulxq7so/image/upload/v1619023453/increaseText-icon-dark_q2g7qj.svg"
    decreaseSizeIcon.src = "https://res.cloudinary.com/dfulxq7so/image/upload/v1619023453/decreaseText-icon-dark_e2uv48.svg"
}

function toggleInstruction(){
    if (instruction.style.display === 'block'){
        instruction.style.display = 'none'
    } else {
        instruction.style.display = 'block'
    }
}



//variables
const charPos = {
    x: 1200,
    y: 400
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
    w: 100,
    h: 120
}

const sparkPos = {
    x: 600,
    y: 600
}

const sparkSize = {
    w: 120,
    h: 120
}

const changeX = 20
const changeY = 12
let sparklingInd = 0

const squareSize = 10
const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
const cols = Math.floor(vw/squareSize)
const rows = Math.floor(vh/squareSize)
const squares = []
let eachSquare
let firstWalk = true
let intheSpark = false
let inSparkReminder = true
const withScreenReader = sessionStorage.getItem('screen-reader')

//setup
char.style.left = `${charPos.x}px`
char.style.top = `${charPos.y}px`
char.style.width = `${charSize.w}px`
char.style.height = `${charSize.h}px`
sparkling.style.left = `${sparkPos.x}px`
sparkling.style.top = `${sparkPos.y}px`
sparkling.style.width = `${sparkSize.w}px`
sparkling.style.height = `${sparkSize.h}px`


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

function handleKeyDown(e){
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
        }

        getCharacterMove(curDir)
        charImg.src = charFace[curDir]

        const curRow = Math.floor((charPos.y + charSize.h)/squareSize)
        const curCol = Math.floor((charPos.x + charSize.w/2)/squareSize)

        if (isWalkable(curRow, curCol)){
            canWalk = {
                "UP": true,
                "DOWN": true,
                "LEFT": true,
                "RIGHT": true
            }
            char.style.left = `${charPos.x}px`
            char.style.top = `${charPos.y}px`

            charSize = {
                w: 65,
                h: 80
            }
            charImg.style.width = `${charSize.w}px`
            charImg.style.height = `${charSize.h}px`
        } else {
            canWalk[curDir] = false
            //hit sound
            audio = new Audio('../asset/VOfiles/PerspectivesVO_hit.mp3');
            audio.play()
        }
    }
    console.log(e.key)

    //check enter sparkling
    if (charPos.x + charSize.w/2 >= sparkPos.x 
            && charPos.x + charSize.w/2 <= sparkPos.x + sparkSize.w
            && charPos.y + charSize.h >= sparkPos.y + sparkSize.h*0.85 
            && charPos.y + charSize.h <= sparkPos.y + sparkSize.h*0.97){
                console.log('inSparkReminder', inSparkReminder)
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

drawStair(60, 2, 96, 2, 4, 2, "DOWN")
drawStair(58, 4, 96, 4, 4, 2, "DOWN")
drawStair(56, 8, 96, 4, 4, 2, "DOWN")
drawStair(54, 12, 96, 4, 4, 2, "DOWN")
drawStair(51, 16, 27, 6, 4, 2, "DOWN")
drawStair(49, 20, 27, 6, 4, 2, "DOWN")
drawStair(64, 45, 96, 7, 4, 2, "DOWN")
drawStair(62, 49, 96, 7, 4, 2, "DOWN")
drawStair(58, 56, 96, 7, 4, 2, "DOWN")
drawStair(40, 56, 96, 17, 4, 2, "DOWN")
drawStair(33, 46, 60, 11, 3, 2, "DOWN")
drawStair(43, 32, 46, 7, 3, 2, "UP")
drawStair(27, 71, 96, 20, 4, 2, "DOWN")
drawStair(27, 83, 96, 10, 4, 2, "DOWN")
drawStair(54, 96, 139, 26, 4, 2, "UP")
drawStair(30, 126, 134, 26, 4, 2, "UP")
drawStair(28, 134, 139, 26, 3, 2, "DOWN")
drawStair(37, 139, 154, 22, 3, 2, "DOWN")
drawStair(77, 101, 117, 11, 3, 2, "UP")
drawStair(69, 121, 135, 11, 3, 2, "UP")


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
