const polygon = document.getElementById('polygon')
const rect = document.getElementById('rect')
const ellipse = document.getElementById('ellipse')
const group1 = document.getElementById('group1')
const group2 = document.getElementById('group2')

const polygonPos = {
    x: 400,
    y: 700
}

const rectPos = {
    x: 1400,
    y: 100
}

const ellipsePos = {
    x: -200,
    y: 400
}

const group1Pos = {
    x: 1400,
    y: 600
}

const group2Pos = {
    x: 300,
    y: -200
}

polygon.style.left = `${polygonPos.x}px`
polygon.style.top = `${polygonPos.y}px`
rect.style.left = `${rectPos.x}px`
rect.style.top = `${rectPos.y}px`
rect.style.width = '6%'
ellipse.style.left = `${ellipsePos.x}px`
ellipse.style.top = `${ellipsePos.y}px`
group1.style.left = `${group1Pos.x}px`
group1.style.top = `${group1Pos.y}px`
group2.style.left = `${group2Pos.x}px`
group2.style.top = `${group2Pos.y}px`
group1.style.transform = `rotate(150deg)`