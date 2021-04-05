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
const info = document.getElementById("info")
const dots = document.getElementsByClassName("each-dot")
const rightSlide = document.getElementById("rightSlide")


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
    if (id !== curId){
        dots[curId].setAttribute('class', "each-dot")
        dots[curId].setAttribute('aria-label', "Inactive")
    }
    curId = id
    // if (withScreenreader === "false"){
    //     speak(`../../asset/VOfiles/PerspectivesVO_bias_summary${id + 1}.wav`)
    // }
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
        window.location.href= "../../accessibility/game.html"
    }
}

sessionStorag.clear()