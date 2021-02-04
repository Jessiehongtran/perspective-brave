const officeWrapper = document.getElementById("wrapper")
const cupboardLeft = document.getElementById("cupboard-left")
const cupboardRight = document.getElementById("cupboard-right")
const tableLeft = document.getElementById("table-left")
const tableRight1 = document.getElementById("table-right-1")
const tableRight2 = document.getElementById("table-right-2")
const tableRight3 = document.getElementById("table-right-3")

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

