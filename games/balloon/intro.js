function speak(file){
    var audio = new Audio(file);
    audio.volume = 1;
    audio.play()
    audio.onloadedmetadata = function() {
        return  audio.duration
    };
}

const texts = [
    "There are many types of unconscious bias that negatively affect people— and all of them operate below the surface of our awareness to influence how we treat those around us.",
    "Yang’s coworkers may not have been purposefully excluding her from contributing to their team.",
    "But their actions, and Yang’s perception of their actions, have a cost."
]

const VOs = [
    "../../asset/VOfiles/PerspectivesVO_balloonIntro_1.wav",
    "../../asset/VOfiles/PerspectivesVO_balloonIntro_2.wav"
]


let i = 0
const info = document.getElementById("info")
const dots = document.getElementsByClassName("each-dot")
const rightSlide = document.getElementById("rightSlide")
const speakerIcon = document.getElementsByClassName("speakerIcon")[0]
let speed = 13*1000

// function showNextText(){
//     if (i < texts.length){
//         info.innerHTML = texts[i]
//         dots[i].setAttribute('class', "each-dot")
//         dots[i+1].setAttribute('class', "each-dot active")
//         speed = 4000
//         if (i < 1){
//             speakerIcon.onclick = function (){speak("../../asset/VOfiles/PerspectivesVO_balloonIntro_2.wav")}
//             // speakerIcon.style.visibility = 'hidden'
//         }
//         i += 1
//         setTimeout(showNextText, speed)
//     } else {
//         rightSlide.style.display = 'block'
//     }
    
// }

// setTimeout(showNextText, speed)

let curId = 0

function showText(id){
    info.innerHTML = texts[id]
    dots[id].setAttribute('class', "each-dot active")
    dots[curId].setAttribute('class', "each-dot")
    speakerIcon.onclick = function (){speak(VOs[id])}
    curId = id
}

function nextSlide(){
    if (curId + 1 < 3){
        const nextId = curId + 1
        showText(nextId)
    } else {
        window.location.href= "./gameBalloonOfficial.html"
    }
}

function preSlide(){
    if (curId - 1 >= 0){
        const nextId = curId - 1
        showText(nextId)
    } else {
        window.location.href= "../../scenario/scenario1/yangConversation.html"
    }
}