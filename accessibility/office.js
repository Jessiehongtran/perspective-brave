document.addEventListener('keydown', handleKeyDown)
setTimeout(showExit, 30000)

//DOM elements
const container = document.getElementById("container")
const char = document.getElementById("player")
const charImg = document.getElementById("playerImg")
const sparkling = document.getElementById("sparkling")
const instruction = document.getElementsByClassName("instruction")[0]

//variables
const charPos = {
    x: 750,
    y: 600
}

const charFace = {
    "UP": "../asset/Yang_Walk_UP/Yang_Walk_UP_00000.png",
    "DOWN": "../asset/Yang_Walk_DN/Yang_Walk_DN_00000.png",
    "LEFT": "../asset/Yang_walk_LR/Yang_Walk_LR_00000.png",
    "RIGHT": "../asset/Yang_walk_LR/Yang_Walk_LR_00000.png"
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

const squareSize = 10
const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
const cols = Math.floor(vw/squareSize)
const rows = Math.floor(vh/squareSize)
const squares = []
let eachSquare
let firstWalk = true

//setup
char.style.left = `${charPos.x}px`
char.style.top = `${charPos.y}px`
char.style.width = `${charSize.w}px`
char.style.height = `${charSize.h}px`
sparkling.style.left = `${sparkPos.x}px`
sparkling.style.top = `${sparkPos.y}px`
sparkling.style.width = `${sparkSize.w}px`
sparkling.style.height = `${sparkSize.h}px`

//VO intro environment


function handleKeyDown(e){
    if (e.key === "e"){
        window.location.href = "../scenario/scenario1/yangConversation.html"
    }

    if (firstWalk){
        //describe environment
        audio = new Audio('../asset/VOfiles/PerspectivesVO_officeDescribe.wav')
        audio.play()
        firstWalk = false
    } else {
        if (e.key === "a" && canWalk["LEFT"]){
            //move left
            curDir = "LEFT"
            charPos.x -= changeX
            charPos.y -= changeY
            charImg.src = charFace["LEFT"]
            charImg.style.transform = 'rotateY(180deg)'
        }
        if (e.key === "d" && canWalk["RIGHT"]){
            //move right
            curDir = "RIGHT"
            charPos.x += changeX
            charPos.y += changeY
            charImg.src = charFace["RIGHT"]
            charImg.style.transform = 'rotateY(360deg)'
        }
        if (e.key === "w" && canWalk["UP"]){
            curDir = "UP"
            //move up
            charPos.x += changeX
            charPos.y -= changeY
            charImg.src = charFace["UP"]
        }
        if (e.key === "s" && canWalk["DOWN"]){
            curDir = "DOWN"
            //move down
            charPos.x -= changeX
            charPos.y += changeY
            charImg.src = charFace["DOWN"]
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

        //check enter sparkling
        if (charPos.x + charSize.w/2 >= sparkPos.x 
            && charPos.x + charSize.w/2 <= sparkPos.x + sparkSize.w
            && charPos.y + charSize.h >= sparkPos.y + sparkSize.h*0.75 
            && charPos.y + charSize.h <= sparkPos.y + sparkSize.h*0.9){
                audio = new Audio('../asset/VOfiles/PerspectivesVO_inTheSpark.wav');
                audio.play()
                console.log(e.key)
                if (e.key === "Enter"){
                    //move to next page
                    window.location.href = "../scenario/scenario1/yangConversation.html"
                }
            }
    }

}

//assemble sparkling animation

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
    instruction.innerHTML = `Press <span class="key-btn">E</span> to exit`
    audio = new Audio('../asset/VOfiles/PerspectivesVO_officeExit.mp3')
    audio.play()
}