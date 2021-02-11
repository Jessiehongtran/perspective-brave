let durationToNextText;
let typingEffectSpeed = 50;
const text = [
    "Hello here I am",
    "I love to talk to you"
]

const textContainer = document.getElementById("text-container")

function getTypingEffect(s, textContainer){
    let i = 0

    function releaseText(){
        if (i < s.length){
            textContainer.innerHTML += s.slice(i,i+1)
            i += 1
            setTimeout(releaseText, typingEffectSpeed)
        }
    }

    releaseText()

    durationToNextText = typingEffectSpeed*(s.length +5)*10
}


let j = 0;
function getMessage(){
    if (j < text.length){
        textContainer.innerHTML = ""
        getTypingEffect(text[j], textContainer)
        j += 1
    }
    setTimeout(getMessage, durationToNextText) //apply recursion
}

getMessage()

