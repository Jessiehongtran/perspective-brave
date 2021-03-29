document.addEventListener('keydown', handleKeyDown)

const char = document.getElementById("player")

const charPos = {
    x: 500,
    y: 400
}

const changeX = 20
const changeY = 12

function handleKeyDown(e){
    if (e.key === "a"){
        //move left
        charPos.x -= changeX
        charPos.y -= changeY
    }
    if (e.key === "d"){
        //move right
        charPos.x += changeX
        charPos.y += changeY
    }
    if (e.key === "w"){
        //move up
        charPos.x += changeX
        charPos.y -= changeY
    }
    if (e.key === "s"){
        //move down
        charPos.x -= changeX
        charPos.y += changeY
    }

    char.style.left = `${charPos.x}px`
    char.style.top = `${charPos.y}px`

}