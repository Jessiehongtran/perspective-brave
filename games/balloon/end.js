let audio 
const withScreenreader = sessionStorage.getItem("screen-reader")

function speak(file){
    audio = new Audio(file);
    audio.volume = 1;
    audio.play()
    audio.onloadedmetadata = function() {
        return  audio.duration
    };
}

function stopVO(){
    if (audio){
        audio.pause()
    }
}

const texts = [
    "When bias is perceived in the workplace, 3 in ten people say they plan to leave their current job.",
    "And the same number -roughly 3 in 10- report withholding ideas and market solutions."
]

const VOs = [
    "../../asset/VOfiles/PerspectivesVO_bias_summary1.wav",
    "../../asset/VOfiles/PerspectivesVO_bias_summary2.wav"
]

let i = 0
let sizeElastic = parseInt(localStorage.getItem('sizeElastic')) || 0
const info = document.getElementById("info")
const dots = document.getElementsByClassName("each-dot")
const rightSlide = document.getElementById("rightSlide")
const container = document.getElementById("container")
const logo = document.getElementsByClassName("logo")[0]
const activeDot = document.getElementsByClassName("each-dot active")[0]
const eachDots = document.getElementsByClassName("each-dot")
const decreaseSizeIcon = document.getElementsByClassName('icon decrease-size')[0]
const increaseSizeIcon = document.getElementsByClassName('icon increase-size')[0]

const curMode = sessionStorage.getItem('data-theme')
if (curMode && curMode === "dark"){
    container.style.backgroundImage = 'url(https://res.cloudinary.com/dfulxq7so/image/upload/v1618944700/gameStartEndBG-dark_lj6epu.svg)'
    container.style.color = '#FFFFFF'
    polygon.src = "https://res.cloudinary.com/dfulxq7so/image/upload/v1618873211/Polygon_8-darkkk_vvux2v.svg"
    rect.src = "https://res.cloudinary.com/dfulxq7so/image/upload/v1618873211/Rectangle_137-darkkk_ztvtae.svg"
    ellipse.src = "https://res.cloudinary.com/dfulxq7so/image/upload/v1618873211/Ellipse_25-darkkk_dkdlbp.svg"
    group1.src = "https://res.cloudinary.com/dfulxq7so/image/upload/v1618873211/groupppp-darkkk_tntrcx.svg"
    group2.src = "https://res.cloudinary.com/dfulxq7so/image/upload/v1618873211/groupp-darkkk_r9yqfg.svg"
    leftSlide.src = "https://res.cloudinary.com/dfulxq7so/image/upload/v1618873211/leftSlide-darkkk_lkxxyl.svg"
    rightSlide.src = "https://res.cloudinary.com/dfulxq7so/image/upload/v1618873310/rightSlide-darkkk_nun33v.svg"
    logo.src = "https://res.cloudinary.com/dfulxq7so/image/upload/v1617746117/Group_45-dark_u84cig.svg"
    group1.style.transform= "rotate(360deg)";
    group2.style.transform= "rotate(360deg)";
    for (let i = 0; i < eachDots.length ; i++){
        eachDots[i].style.backgroundColor = "#015EF4"
    }
    activeDot.style.backgroundColor = "#FF2EE0"
    increaseSizeIcon.src = "https://res.cloudinary.com/dfulxq7so/image/upload/v1619023453/increaseText-icon-dark_q2g7qj.svg"
    decreaseSizeIcon.src = "https://res.cloudinary.com/dfulxq7so/image/upload/v1619023453/decreaseText-icon-dark_e2uv48.svg"
} else {
    container.style.backgroundImage = 'url(https://res.cloudinary.com/dfulxq7so/image/upload/v1614352554/Mask_Group_6_sqgbyy.svg)'
    polygon.src = "https://res.cloudinary.com/dfulxq7so/image/upload/v1614355001/Polygon_8.8_aac0rb.svg"
    rect.src = "https://res.cloudinary.com/dfulxq7so/image/upload/v1614355146/Rectangle_137.111_tjtria.svg"
    ellipse.src = "https://res.cloudinary.com/dfulxq7so/image/upload/v1614213869/Ellipse_25.1_c18oph.svg"
    group1.src = "https://res.cloudinary.com/dfulxq7so/image/upload/v1614210431/Group_53.1_wqvelu.svg"
    group2.src = "https://res.cloudinary.com/dfulxq7so/image/upload/v1614210192/Group_105_aulqkx.svg"
    leftSlide.src = "https://res.cloudinary.com/dfulxq7so/image/upload/v1614214027/Group_97.1_jfl1rz.svg"
    rightSlide.src = "https://res.cloudinary.com/dfulxq7so/image/upload/v1614214021/Group_98.1_myyu8w.svg"
    logo.src = "https://res.cloudinary.com/dfulxq7so/image/upload/v1615933174/PerspectiveLogo_c61yxb.svg"
}


document.getElementsByClassName('dots')[0].style.width = '10%'

let curId = 0

function showText(id){
    if (audio){
        stopVO()
    }
    info.innerHTML = texts[id]
    info.setAttribute('tabindex', 2*(id+1))
    dots[id].setAttribute('class', "each-dot active")
    dots[id].setAttribute('aria-label', "Active")
    if (curMode && curMode === "dark"){
        dots[id].style.backgroundColor = "#FF2EE0"
    }
    if (id !== curId){
        dots[curId].setAttribute('class', "each-dot")
        dots[curId].setAttribute('aria-label', "Inactive")
        if (curMode && curMode === "dark"){
            dots[curId].style.backgroundColor = "#015EF4"
        }
    }
    curId = id
}

function nextSlide(){
    if (audio){
        stopVO()
    }
    if (curId + 1 < texts.length){
        const nextId = curId + 1
        showText(nextId)
    } else {
        window.location.href= "../../index.html"
        onclick="speak('../../asset/VOfiles/PerspectivesVO_theEnd.wav')"
    }
}

function preSlide(){
    if (audio){
        stopVO()
    }
    if (curId - 1 >= 0){
        const nextId = curId - 1
        showText(nextId)
    } else {
        window.location.href= "./game.html"
    }
}

sessionStorag.clear()

//reset size
info.style.fontSize = `${26 + sizeElastic}px`
info.style.lineHeight = `${44 + sizeElastic}px`

function updateSize(){
    if (sizeElastic > -25 && sizeElastic < 20){
        info.style.fontSize = `${26 + sizeElastic}px`
        info.style.lineHeight = `${44 + sizeElastic}px`
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