const officeWrapper = document.getElementById("wrapper")
const cupboardLeft = document.getElementById("cupboard-left")
const cupboardRight = document.getElementById("cupboard-right")
const tableLeft = document.getElementById("table-left")
const tableRight1 = document.getElementById("table-right-1")
const tableRight2 = document.getElementById("table-right-2")
const tableRight3 = document.getElementById("table-right-3")
const player = document.getElementById("player")

const wrapperWidthPercentage = 70
wrapper.style.width = `${wrapperWidthPercentage}%`
cupboardLeft.style.width = '25%'
cupboardRight.style.width = '20%'
tableLeft.style.width = '15%'
tableRight1.style.width = tableRight2.style.width = tableRight3.style.width = '10%'

cupboardLeft.style.left = `${7*wrapperWidthPercentage/100}%`
cupboardLeft.style.top = `${45*wrapperWidthPercentage/100}%`

cupboardRight.style.left = `${85*wrapperWidthPercentage/100}%`
cupboardRight.style.top = `${38*wrapperWidthPercentage/100}%`

tableLeft.style.left = `${55*wrapperWidthPercentage/100}%`
tableLeft.style.top = `${30*wrapperWidthPercentage/100}%`

const tableRight1Left = 90
const tableRight1Top = 70

tableRight1.style.left = `${tableRight1Left*wrapperWidthPercentage/100}%`
tableRight1.style.top = `${tableRight1Top*wrapperWidthPercentage/100}%`

tableRight2.style.left = `${(tableRight1Left - 10)*wrapperWidthPercentage/100}%`
tableRight2.style.top = `${(tableRight1Top + 10)*wrapperWidthPercentage/100}%`

tableRight3.style.left = `${(tableRight1Left - 20)*wrapperWidthPercentage/100}%`
tableRight3.style.top = `${(tableRight1Top + 20)*wrapperWidthPercentage/100}%`

let x = 400;
let y = 400;

const character_face_up = "https://res.cloudinary.com/dfulxq7so/image/upload/v1611950505/Yang_Back_2x_wfa5l1.png"
const character_face_down = "https://res.cloudinary.com/dfulxq7so/image/upload/v1611950509/Yang_Front_2x_j9ad21.png"
const character_face_left = "https://res.cloudinary.com/dfulxq7so/image/upload/v1611950538/Yang_RightSide_2x_i223zj.png"
const character_face_right = "https://res.cloudinary.com/dfulxq7so/image/upload/v1611950517/Yang_LeftSide_2x_qc1sg5.png"


player.style.left = `${x}px`
player.style.top = `${y}px`

function handleKeyDown(e){
      if (e.key === "ArrowRight"){
          playerImg.src = character_face_right
          x = x + 10
      } else if (e.key === "ArrowLeft"){
          playerImg.src = character_face_left
          x = x - 10
      } else if (e.key === "ArrowDown"){
          playerImg.src = character_face_down
          y = y + 10
      } else if (e.key === "ArrowUp"){
          playerImg.src = character_face_up
          y = y - 10
      }
  
      if (!isInsideRectangle([{x: 620, y: 290}, {x: 970, y: 450}, {x: 670, y: 690}, {x: 310, y: 480}], {x: x, y: y})){
        document.getElementById("message").innerHTML = "Do not go there!"
      } else {
        document.getElementById("message").innerHTML = "Welcome to Yang office :)"
      }
      
      player.style.left = `${x}px`
      player.style.top = `${y}px`
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