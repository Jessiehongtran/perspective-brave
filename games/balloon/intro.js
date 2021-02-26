function speak(){
    var audio = new Audio('../../asset/VOfiles/PerspectivesVO_biasoverview.wav');
    audio.volume = 1;
    audio.play()
}

const texts = [
    "Yang’s coworkers may not have been purposefully excluding her from contributing to their team.",
    "But their actions, and Yang’s perception of their actions, have a cost."
]

let i = 0
const info = document.getElementById("info")
const dots = document.getElementsByClassName("each-dot")
const rightSlide = document.getElementById("rightSlide")
const speed = 3000


function showNextText(){

    if (i < texts.length){
        info.innerHTML = texts[i]
        dots[i].setAttribute('class', "each-dot")
        dots[i+1].setAttribute('class', "each-dot active")
        i += 1
        setTimeout(showNextText, speed)
    } else {
        rightSlide.style.display = 'block'
    }
}

setTimeout(showNextText, speed)