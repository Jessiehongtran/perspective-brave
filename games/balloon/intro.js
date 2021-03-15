function speak(file){
    var audio = new Audio(file);
    audio.volume = 1;
    audio.play()
    audio.onloadedmetadata = function() {
        return  audio.duration
    };
}

const texts = [
    "Yang’s coworkers may not have been purposefully excluding her from contributing to their team.",
    "But their actions, and Yang’s perception of their actions, have a cost."
]


let i = 0
const info = document.getElementById("info")
const dots = document.getElementsByClassName("each-dot")
const rightSlide = document.getElementById("rightSlide")
const speakerIcon = document.getElementsByClassName("speakerIcon")[0]
let speed = 13*1000

function showNextText(){
    if (i < texts.length){
        info.innerHTML = texts[i]
        dots[i].setAttribute('class', "each-dot")
        dots[i+1].setAttribute('class', "each-dot active")
        speed = 4000
        if (i < 1){
            speakerIcon.onclick = speak("../../asset/VOfiles/PerspectivesVO_balloonIntro_2.wav")
            speakerIcon.style.visibility = 'hidden'
        }
        i += 1
        setTimeout(showNextText, speed)
    } else {
        rightSlide.style.display = 'block'
    }
    
}

setTimeout(showNextText, speed)