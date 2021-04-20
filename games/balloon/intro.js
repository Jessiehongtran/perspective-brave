let audio 

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
    "There are many types of unconscious bias that negatively affect people— and all of them operate below the surface of our awareness to influence how we treat those around us.",
    "Yang’s coworkers may not have been purposefully excluding her from contributing to their team.",
    "But their actions, and Yang’s perception of their actions, have a cost."
]

const VOs = [
    "../../asset/VOfiles/PerspectivesVO_balloonIntro_1.wav",
    "../../asset/VOfiles/PerspectivesVO_balloonIntro_2.wav",
    "../../asset/VOfiles/PerspectivesVO_balloonIntro_3.wav"
]


let i = 0
const info = document.getElementById("info")
const dots = document.getElementsByClassName("each-dot")
const rightSlide = document.getElementById("rightSlide")
const withScreenreader = sessionStorage.getItem("screen-reader")
const container = document.getElementById("container")
const logo = document.getElementsByClassName("logo")[0]
const activeDot = document.getElementsByClassName("each-dot active")[0]
const eachDots = document.getElementsByClassName("each-dot")

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

let curId = 0

function showText(id){
    if (audio){
        stopVO()
    }
    info.innerHTML = texts[id]
    info.setAttribute('tabindex', 2*(id+1))
    dots[id].setAttribute('class', "each-dot active")
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
    dots[id].setAttribute('aria-label', "Active")
    curId = id
    
}

function nextSlide(){
    if (audio){
        stopVO()
    }
    if (curId + 1 < 3){
        const nextId = curId + 1
        showText(nextId)
    } else {
        window.location.href= "./game.html"
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
        window.location.href= "../../scenario/scenario1/yangConversation.html"
    }
}