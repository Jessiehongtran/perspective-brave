const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

const container = document.getElementById("container")
const character = document.getElementById("player")
const x = document.getElementById("x")

const characterPos = {
    x: 600,
    y: 600
}

const allowedWalkingDir = {
    "RIGHT": true,
    "LEFT": true,
    "DOWN": true,
    "UP": true
    
}

character.style.left = `${characterPos.x}px`
character.style.top = `${characterPos.y}px`
x.style.position = 'absolute'
x.style.zIndex = '16'
x.style.color = 'green'
x.style.left = `${characterPos.x + 120}px`
x.style.top = `${characterPos.y + 100}px`


container.style.backgroundSize = `${vw} ${vh}`

// const bigTable = document.getElementById("bigTable")
// const smallTable = document.getElementById("smallTable")
// const arrayTable = document.getElementById("arrayTable")

// bigTable.style.left = `${150*vw/1600}px`
// bigTable.style.top = `${400*vh/952}px`
// smallTable.style.left = `${570*vw/1600}px`
// smallTable.style.top = `${50*vh/952}px`
// arrayTable.style.left = `${750*vw/1600}px`
// arrayTable.style.top = `${500*vh/952}px`

const squareSize = 10

const cols = Math.floor(vw/squareSize)
const rows = Math.floor(vh/squareSize)
 
let opDir

const paths = [
    {r1: 48, r2: 72, c1: 63, c2: 112},
    {r1: 72, r2: 84, c1: 51, c2: 92},
    {r1: 64, r2: 72, c1: 51, c2: 65},
    {r1: 59, r2: 63, c1: 51, c2: 65},
    {r1: 64, r2: 84, c1: 50, c2: 50},
    {r1: 59, r2: 84, c1: 45, c2: 49},
    {r1: 57, r2: 82, c1: 40, c2: 44},
    {r1: 54, r2: 79, c1: 35, c2: 39},
    {r1: 55, r2: 77, c1: 34, c2: 34},
    {r1: 44, r2: 76, c1: 30, c2: 33},
    {r1: 47, r2: 74, c1: 26, c2: 29},
    {r1: 49, r2: 72, c1: 22, c2: 25},
    {r1: 51, r2: 70, c1: 18, c2: 21},
    {r1: 53, r2: 67, c1: 14, c2: 17},
    {r1: 55, r2: 65, c1: 10, c2: 13},
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

for (let r = 0; r < rows; r++){
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

        //map out walkable path   
        for (let k = 0; k < paths.length ; k++){
            if (r >= paths[k].r1 && r <= paths[k].r2 && c >= paths[k].c1 && c <= paths[k].c2){
                eachSquare.style.backgroundColor = "red"
            }
        }

        container.appendChild(eachSquare)
    }
}

function isWalkable(){
    for (let k = 0; k < paths.length ; k++){
        if (characterPos.y + 100 >= paths[k].r1*10 && characterPos.y +100 <= paths[k].r2*10 && characterPos.x + 120 >= paths[k].c1*10 && characterPos.x + 120 <= paths[k].c2*10){
            return true
        }
    }
    return false
}

function disableCurWalkingDir(){
    const dirs = Object.keys(allowedWalkingDir)
    for (let i = 0; i < dirs.length; i++){
        if (dirs[i] !== opDir){
            allowedWalkingDir[dirs[i]] = false
        }
    } 
}

function enableWalkingDir(){
    const dirs = Object.keys(allowedWalkingDir)
    for (let i = 0; i < dirs.length; i++){
        allowedWalkingDir[dirs[i]] = true
    
    } 
}

function handleKeyDown(e){
    if (!isWalkable()){
        disableCurWalkingDir()
    } else {
        enableWalkingDir()
    }
    if (e.key === "ArrowRight" && allowedWalkingDir["RIGHT"]){
        characterPos.x = characterPos.x + 20
        opDir = "LEFT"
    } else if (e.key === "ArrowLeft" && allowedWalkingDir["LEFT"]){
        characterPos.x = characterPos.x - 20
        opDir = "RIGHT"
    } else if (e.key === "ArrowUp" && allowedWalkingDir["UP"]){
        characterPos.y = characterPos.y - 20
        opDir = "DOWN"
    } else if (e.key === "ArrowDown" && allowedWalkingDir["DOWN"]){
        characterPos.y = characterPos.y + 20
        opDir = "UP"
    }
    character.style.left = `${characterPos.x}px`
    character.style.top = `${characterPos.y}px`
    
}

document.addEventListener("keydown", handleKeyDown)