const officeWrapper = document.getElementById("wrapper")
const cupboardLeft = document.getElementById("cupboard-left")
const cupboardRight = document.getElementById("cupboard-right")
const tableLeft = document.getElementById("table-left")
const tableRight1 = document.getElementById("table-right-1")
const tableRight2 = document.getElementById("table-right-2")
const tableRight3 = document.getElementById("table-right-3")
const player = document.getElementById("player")
const cupboardLeftTopLeft = document.getElementById("cupboardLeft-top-left")
const tableLeftTopLeft = document.getElementById("tableLeft-top-left")
const cupboardRightTopLeft = document.getElementById("cupboardRight-top-left")
const tableRight1TopLeft = document.getElementById("tableRight1-top-left")
const tableRight2TopLeft = document.getElementById("tableRight2-top-left")
const tableRight3TopLeft = document.getElementById("tableRight3-top-left")
const sparkling = document.getElementById("sparkling")

const wrapperWidthPercentage = 70
const cupboardWidth = 300
const cupboardHeight = 230
const bigTableWidth = 230
const bigTableHeight = 200
const smallTableWidth = 150
const smallTableHeight = 150

wrapper.style.width = `${wrapperWidthPercentage}%`
cupboardLeft.style.width = `${cupboardWidth}px`
cupboardLeft.style.height = `${cupboardHeight}px`
cupboardRight.style.width = `${cupboardWidth}px`
cupboardRight.style.height = `${cupboardHeight}px`
tableLeft.style.width = `${bigTableWidth}px`
tableLeft.style.height = `${bigTableHeight}px`
tableRight1.style.width = tableRight2.style.width = tableRight3.style.width = `${smallTableWidth}px`
tableRight1.style.height = tableRight2.style.height = tableRight3.style.height = `${smallTableHeight}px`


const cupboardLeftPosition = {
    x: 350,
    y: 320
}
cupboardLeft.style.left = cupboardLeftTopLeft.style.left = `${cupboardLeftPosition.x}px`
cupboardLeft.style.top = cupboardLeftTopLeft.style.top =  `${cupboardLeftPosition.y}px`

const tableLeftPosition = {
    x: 750,
    y: 200
}
tableLeft.style.left = tableLeftTopLeft.style.left = `${tableLeftPosition.x}px`
tableLeft.style.top = tableLeftTopLeft.style.top = `${tableLeftPosition.y}px`

const cupboardRightPosition = {
    x: 1150,
    y: 300
}
cupboardRight.style.left = cupboardRightTopLeft.style.left = `${cupboardRightPosition.x}px`
cupboardRight.style.top = cupboardRightTopLeft.style.top = `${cupboardRightPosition.y}px`

const tableRight1Position = {
    x: 1200,
    y: 500
}
tableRight1.style.left = tableRight1TopLeft.style.left = `${tableRight1Position.x}px`
tableRight1.style.top = tableRight1TopLeft.style.top = `${tableRight1Position.y}px`

const tableRight2Position = {
    x: tableRight1Position.x -100,
    y: tableRight1Position.y + 60
}
tableRight2.style.left = tableRight2TopLeft.style.left = `${tableRight2Position.x}px`
tableRight2.style.top = tableRight2TopLeft.style.top = `${tableRight2Position.y}px`

const tableRight3Position = {
    x: tableRight1Position.x -100*2,
    y: tableRight1Position.y + 60*2
}
tableRight3.style.left = tableRight3TopLeft.style.left = `${tableRight3Position.x}px`
tableRight3.style.top = tableRight3TopLeft.style.top = `${tableRight3Position.y}px`

const sparklingPosition = {
  x: 940,
  y: 420
}

sparkling.style.left = `${sparklingPosition.x}px`
sparkling.style.top = `${sparklingPosition.y}px`

const characterPosition = {
  x: 400,
  y: 400
}

const character_face_up = "https://res.cloudinary.com/dfulxq7so/image/upload/v1611950505/Yang_Back_2x_wfa5l1.png"
const character_face_down = "https://res.cloudinary.com/dfulxq7so/image/upload/v1611950509/Yang_Front_2x_j9ad21.png"
const character_face_left = "https://res.cloudinary.com/dfulxq7so/image/upload/v1611950538/Yang_RightSide_2x_i223zj.png"
const character_face_right = "https://res.cloudinary.com/dfulxq7so/image/upload/v1611950517/Yang_LeftSide_2x_qc1sg5.png"

player.style.left = `${characterPosition.x}px`
player.style.top = `${characterPosition.y}px`

function handleKeyDown(e){
      console.log('x', characterPosition.x, 'y', characterPosition.y)
      if (e.key === "ArrowRight"){
          playerImg.src = character_face_right
          characterPosition.x = characterPosition.x + 10
      } else if (e.key === "ArrowLeft"){
          playerImg.src = character_face_left
          characterPosition.x = characterPosition.x - 10
      } else if (e.key === "ArrowDown"){
          playerImg.src = character_face_down
          characterPosition.y = characterPosition.y + 10
      } else if (e.key === "ArrowUp"){
          playerImg.src = character_face_up
          characterPosition.y = characterPosition.y - 10
      }
  
      if (
        isInsideRectangle(
          [
            {x: cupboardLeftPosition.x, y: cupboardLeftPosition.y}, 
            {x: cupboardLeftPosition.x + cupboardWidth, y: cupboardLeftPosition.y}, 
            {x: cupboardLeftPosition.x + cupboardWidth, y: cupboardLeftPosition.y + cupboardHeight}, 
            {x: cupboardLeftPosition.x, y: cupboardLeftPosition.y + cupboardHeight}
          ], 
          {x: characterPosition.x + 50, y: characterPosition.y + 180})
        || isInsideRectangle(
          [
            {x: cupboardRightPosition.x, y: cupboardRightPosition.y}, 
            {x: cupboardRightPosition.x + cupboardWidth, y: cupboardRightPosition.y}, 
            {x: cupboardRightPosition.x + cupboardWidth, y: cupboardRightPosition.y + cupboardHeight}, 
            {x: cupboardRightPosition.x, y: cupboardRightPosition.y + cupboardHeight}
          ], 
          {x: characterPosition.x + 50, y: characterPosition.y + 180})
      ){
        document.getElementById("message").innerHTML = "You are about to touch a cupboard. Do not!"
        document.getElementById("message").style.color = "red"
      } else if (
        isInsideRectangle(
          [
            {x: tableLeftPosition.x, y: tableLeftPosition.y}, 
            {x: tableLeftPosition.x + bigTableWidth, y: tableLeftPosition.y}, 
            {x: tableLeftPosition.x + bigTableWidth, y: tableLeftPosition.y + bigTableHeight}, 
            {x: tableLeftPosition.x, y: tableLeftPosition.y + bigTableHeight}
          ], 
          {x: characterPosition.x + 50, y: characterPosition.y + 180})
      ){
        document.getElementById("message").innerHTML = "You are about to touch a big table. Do not!"
        document.getElementById("message").style.color = "blue"
      } else if (
        isInsideRectangle(
          [
            {x: tableRight1Position.x, y: tableRight1Position.y}, 
            {x: tableRight1Position.x + smallTableWidth, y: tableRight1Position.y}, 
            {x: tableRight1Position.x + smallTableWidth, y: tableRight1Position.y + smallTableHeight}, 
            {x: tableRight1Position.x, y: tableRight1Position.y + smallTableHeight}
          ], 
          {x: characterPosition.x + 50, y: characterPosition.y + 180})
        || isInsideRectangle(
          [
            {x: tableRight2Position.x, y: tableRight2Position.y}, 
            {x: tableRight2Position.x + smallTableWidth, y: tableRight2Position.y}, 
            {x: tableRight2Position.x + smallTableWidth, y: tableRight2Position.y + smallTableHeight}, 
            {x: tableRight2Position.x, y: tableRight2Position.y + smallTableHeight}
          ], 
          {x: characterPosition.x + 50, y: characterPosition.y + 180})
        || isInsideRectangle(
          [
            {x: tableRight3Position.x, y: tableRight3Position.y}, 
            {x: tableRight3Position.x + smallTableWidth, y: tableRight3Position.y}, 
            {x: tableRight3Position.x + smallTableWidth, y: tableRight3Position.y + smallTableHeight}, 
            {x: tableRight3Position.x, y: tableRight3Position.y + smallTableHeight}
          ], 
          {x: characterPosition.x + 50, y: characterPosition.y + 180})
      ){
        document.getElementById("message").innerHTML = "You are about to touch a small table. Do not!"
        document.getElementById("message").style.color = "purple"
      } else {
        document.getElementById("message").innerHTML = "Welcome to Yang office :)"
        document.getElementById("message").style.color = "black"
      }
      
      player.style.left = `${characterPosition.x}px`
      player.style.top = `${characterPosition.y}px`
  }
  
  function rectArea(x1, y1, x2, y2, x3, y3, x4, y4){
      return Math.floor(Math.sqrt(Math.pow(x1-x4,2) + Math.pow(y1-y4,2))*Math.sqrt(Math.pow(x3-x4,2) + Math.pow(y3-y4,2)))
    }
  
  function dist(x1, y1, x2, y2){
      return Math.sqrt(Math.pow(x1-x2,2) + Math.pow(y1-y2,2))
    }
  
  function triangArea(x1, y1, x2, y2, x3, y3){
      const a = dist(x1, y1, x2, y2)
      const b = dist(x1, y1, x3, y3)
      const c = dist(x2, y2, x3, y3)
      const p = a + b + c
      const s = p/2
      return Math.floor(Math.sqrt(s*(s-a)*(s-b)*(s-c)))
    }
  
  function isInsideRectangle(rect, target){
      const topLeft = rect[0]
      const topRight = rect[1]
      const bottomRight = rect[2]
      const bottomLeft = rect[3]


  
      if (  triangArea(topLeft.x, topLeft.y, target.x, target.y, bottomLeft.x, bottomLeft.y) 
          + triangArea(topLeft.x, topLeft.y, target.x, target.y, topRight.x, topRight.y)
          + triangArea(topRight.x, topRight.y, target.x, target.y, bottomRight.x, bottomRight.y)
          + triangArea(bottomRight.x, bottomRight.y, target.x, target.y, bottomLeft.x, bottomLeft.y) 
          > rectArea(topLeft.x, topLeft.y, topRight.x, topRight.y, bottomRight.x, bottomRight.y, bottomLeft.x, bottomLeft.y)
          ) {
            return false
          }
      return true
    }


document.addEventListener("keydown", handleKeyDown)