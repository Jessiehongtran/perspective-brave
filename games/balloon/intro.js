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
    audio.pause()
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
const speakerIcon = document.getElementsByClassName("speakerIcon")[0]

let curId = 0

function showText(id){
    if (audio){
        stopVO()
    }
    info.innerHTML = texts[id]
    dots[id].setAttribute('class', "each-dot active")
    dots[curId].setAttribute('class', "each-dot")
    speakerIcon.onclick = function (){speak(VOs[id])}
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
        window.location.href= "./gameTutorial.html"
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