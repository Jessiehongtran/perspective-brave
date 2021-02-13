const conversation= {
    part1: {
        messages: [
            {
                name: "JERRY",
                text: "I say we put more resources behind this effort. We have enough to go on.",
            },
            {
                name: "SASHA",
                text: "Bob, what do you think?",
            },
            {
                name: "BOB",
                text: "Oh, this is above my pay grade!",
            },
            {
                name: "YOU",
                text: "",
            },
        ],
        buttons: [
            {
                text: "I have something to add",
                next: "part2"
            }
        ]
    },
    part2: {
        messages: [
            {
                name: "YOU",
                text: "When you look at the numbers, we don't have enough data from our first test to move forward with any certainty.",
            },
            {
                name: "BOB",
                text: "Well, I wouldn't say the issue is the data..",
            },
            {
                name: "JERRY",
                text: "You do not understand how these tests go Yang. Sure, it does not look like much, but we got some feedback that some of those folks like the direction we are talking. Sometimes you cannot rely on the data.",
            },
            {
                name: "YOU",
                text: "" ,
            },
        ],
        buttons: [
            {
                text: "Say nothing",
                next: "part31"
            }, 
            {
                text: "I think we should focus on the data",
                next: "part32"
            }, 
            {
                text: "Execus me?",
                next: "part33"
            }
        ]
    },
    part31: {
        messages: [
            {
                name: "BOB",
                text: "Sold. Jerry is right. It is full speed ahead!" , 
            },
            {
                name: "JERRY",
                text: "That is what I am talking about.",
            },
            {
                name: "SASHA",
                text: "Let see how we can make this work with the timeline.",
            }
        ],
        buttons: [
            {
                text: "Okay",
                next: null
            }
        ]
    },
    part32: {
        messages: [
            {
                name: "YOU",
                text: "What do you mean, I do not understand? I have seen the data and I can clearly understand the results. We ran that test for a reason. It is a good indicator of what happens if we scale this and.." , 
            },
            {
                name: "JERRY",
                text: "Look, I know this is the way to go I can feel it! I have done this before.",
            },
            {
                name: "BOB",
                text: "Sold. Jerry is right. It is full speed ahead!",
            },
            {
                name: "SASHA",
                text: "Yang, why do not you stay after the meeting so we can talk.",
            }
        ],
        buttons: [
            {
                text: "Okay",
                next: null
            }
        ]
    },
    part33: {
        messages: [
            {
                name: "YOU",
                text: "Excuse me? I am bringing data to you rather than a hunch." , 
            },
            {
                name: "JERRY",
                text: "I do not understand why you are being so aggressive to this and do not really appreciate it.",
            },
            {
                name: "BOB",
                text: "Yeah Yang, Jerry has been doing this for a lot longer than you so you should trust his thoughts.",
            },
            {
                name: "SASHA",
                text: "Yang, why do not you stay after the meeting so we can talk.",
            }
        ],
        buttons: [
            {
                text: "Okay",
                next: null
            }
        ]
    }
}

const intro = document.getElementById("intro")
const frames = document.getElementById("frames")

const mouthMoveInd = {
    Jerry: 1,
    Bob: 1,
    Sasha: 1,
    Yang: 1
}

let typingEffectSpeed = 60
let durationToNextText = 0

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

    durationToNextText = typingEffectSpeed*(s.length +5)
}

const speechSynthesis = window.speechSynthesis;
const speechUtterance = new SpeechSynthesisUtterance();

function isPreferredVoice(voice){
    return ["Google US English", "Microsoft Jessa Online"].any(preferredVoice => voice.name.startsWith(preferredVoice))
}

function onVoiceChange(){
    speechSynthesis.addEventListener("voiceschanged", () => {
        const voices = speechSynthesis.getVoices();
        speechUtterance.voice = voices.find(isPreferredVoice);
        speechUtterance.lang = "en-US";
        speechUtterance.volume = 1;
        speechUtterance.pitch = 1;
        speechUtterance.rate = 1.5; 
    })
}

function speak(text){
    if ('speechSynthesis' in window) {
        console.log("trying to speak")
        // Speech Synthesis supported 🎉
        onVoiceChange()
        speechUtterance.text = text;
        window.speechSynthesis.speak(speechUtterance);
    } else {
        // Speech Synthesis Not Supported 😣
        alert("Sorry, your browser doesn't support text to speech!");
    }
}


let chat = document.getElementById("chat");
let next = "part1";
let messageArray = []
let buttonArray = []
let buttons
let textContainer
let talkingDude 
let currentMessage
let audioInd = 1

let j = 0;
function showEachMessage(){
    if (j < messageArray.length){
        let newMessage = getMessageElement(messageArray[j].name, messageArray[j].text)
        chat.appendChild(newMessage)
        j += 1
        setTimeout(showEachMessage, durationToNextText) //apply recursion
    } else {
        addButtons()
    }
   
}


function getNameHolder(){
    if (talkingDude === "BOB"){
        return  "Bob"
    } else if (talkingDude === "JERRY"){
        return "Jerry"
    } else if (talkingDude === "SASHA"){
        return "Sasha"
    } else if (talkingDude === "YOU"){
        return "Yang"
    }
}

function getCharacterMouthMove(){
    let nameHolder
    let ind
    
    nameHolder = getNameHolder()

    if (mouthMoveInd[nameHolder] > 71){
        ind = mouthMoveInd[nameHolder] - 71*(Math.floor(mouthMoveInd[nameHolder]/71))
    } else {
        ind = mouthMoveInd[nameHolder]
    }

    if (ind < 10){
        ind = "0" + ind
    } 

    console.log('mouthMoveInd[nameHolder]', 'currentMessage.length', currentMessage.length,  mouthMoveInd[nameHolder], ind)

    document.getElementById(nameHolder).src = `../../asset/${nameHolder}_Seated_Talk/${nameHolder}_Seated_Talk_000${ind}.png`
    mouthMoveInd[nameHolder] += 1
    
    if (mouthMoveInd[nameHolder] < currentMessage.length){
        setTimeout(getCharacterMouthMove, 120)
    }
}

function playAudio(file){
    var audio = new Audio(file);
    audio.play()
    audio.volume = 1;
}

function addButtons(){
    buttons = document.createElement('div')
    buttons.style.display = 'flex'
    buttons.style.marginTop = '20px'
    buttons.style.width = '100%'
    buttons.style.justifyContent = 'space-evenly'
    for (let i = 0; i < buttonArray.length; i++){
        if (buttonArray[i].text){
            let button = document.createElement('div')
            button.style.padding = '8px 15px'
            button.style.backgroundColor = 'white'
            button.style.borderRadius = '8px'
            button.appendChild(document.createTextNode(buttonArray[i].text))
            button.style.cursor = 'pointer'
            button.style.marginRight = '20px'
            button.addEventListener('click', () => {
                next = buttonArray[i].next
                if (next){
                    getMessages()
                } else {
                    window.location.href = "../../games/balloon/intro.html"
                }
            })
            buttons.appendChild(button)
        }
    }
    chat.appendChild(buttons)
}

function getMessages(){
    intro.style.display = 'none'
    j = 0
    while (chat.firstChild) {
        chat.removeChild(chat.firstChild);
    }

    console.log('next', next)
    if (next){
        messageArray = conversation[next].messages
        buttonArray = conversation[next].buttons
        showEachMessage(next)
        next = null
    }

}


function getMessageElement(name, text){
    const messageContainer = document.createElement("div")
    messageContainer.style.width = "100%"
    messageContainer.style.display = "flex"
    messageContainer.style.fontSize = "20px"
    messageContainer.style.marginTop = "40px"
    messageContainer.style.transition = "all 0.2s linear"
    messageContainer.style.position = "relative"
    messageContainer.style.transform = "translateY(-100%);"

    const newName = document.createElement("div")
    newName.innerHTML =  name + ":"
    newName.style.fontWeight = "bold"
    newName.style.marginRight = "10px"
    messageContainer.appendChild(newName)
    talkingDude = name

    let newText = document.createElement("div")
    getTypingEffect(text, newText)
    messageContainer.appendChild(newText)
    currentMessage = text

    if (name === "JERRY"){
        playAudio(`../../asset/VOfiles/PerspectivesVO_jerry0${audioInd}.wav`)
        audioInd += 1
    } else {
        speak(text)
    }

    if (text.length > 0){
        mouthMoveInd[getNameHolder()] = 0 
        getCharacterMouthMove()
    }

    return messageContainer
}
