const container = document.getElementById("container")
const character = document.getElementById("playerImg")
const character_face = {
    right: "https://res.cloudinary.com/dfulxq7so/image/upload/v1611950517/Yang_LeftSide_2x_qc1sg5.png",
    left: "https://res.cloudinary.com/dfulxq7so/image/upload/v1611950538/Yang_RightSide_2x_i223zj.png"
}
const characterPos = {
    x: 10,
    y: 63
}
character.style.left = `${characterPos.x}%`
character.style.top = `${characterPos.y}%`

function handleKeyDown(e){
    console.log(e.key, e.keyCode)

    if (e.key == "ArrowRight"){
        characterPos.x += 1
        character.src = character_face.right
    } else  if (e.key == "ArrowLeft"){
        characterPos.x -= 1
        character.src = character_face.left
    } 

    character.style.left = `${characterPos.x}%`
    character.style.top = `${characterPos.y}%`
}

document.addEventListener('keydown', handleKeyDown)