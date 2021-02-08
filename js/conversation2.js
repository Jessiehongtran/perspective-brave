const messages= [
    {
        name: "Mike",
        text: "Okay, I believe we should put some resources behind this.",
        VO: ""
    },
    {
        name: "Yang",
        text: "I have something to add, when you look at the numbers, you see that we do not have enough data to move forward.",
    },
    {
        name: "Jack",
        text: "Well, I am not sure the issue is the data..",
    },
    {
        name: "Mike",
        text: "You do not understand how the test goes, sure it may not seem much but we have got some of really good feedbacks from these folks.",
    },
    {
        name: "Yang",
        text: "I have seen the data and I can clearly understand the result.",
    },
    {
        name: "Mike",
        text: "Sometimes, you cannot trust the data. If we spend time caring about the number all day long, we are never gonna move forward.",
    },
    {
        name: "Yang",
        text: "We ran that test for a reason. It is a good indicator of what happens if we scale this.",
    },
    {
        name: "Mike",
        text: "Look, I know this is the right way to go, I got a feeling about this, I have seen this before." ,
    },
    {
        name: "Jay",
        text: "So, Mike is right, we can move forward" , 
    },
    {
        name: "Yang",
        text: "What am I here for?...",
    }
]

const MikeLoop = document.getElementById("Mike-loop")
const JackLoop = document.getElementById("Jack-loop")
const JayLoop = document.getElementById("Jay-loop")
const YangLoop = document.getElementById("Yang-loop")
const intro = document.getElementById("intro")

let typingEffectSpeed = 80
let durationToNextText = 5000

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

// var audio = new Audio('../asset/output.mp3');

// function speak(){
//     audio.play()
// }

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
        speechUtterance.rate = 3; 
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

let i = 0
let chat = document.getElementById("chat")
function getMessage(){
    intro.style.display = 'none'
    if (i < messages.length){
        if (chat.childElementCount === 3){
            while (chat.firstChild) {
                chat.removeChild(chat.firstChild);
            }
        }

        let messageContainer = document.createElement("div")
        messageContainer.style.width = "100%"
        messageContainer.style.display = "flex"
        messageContainer.style.fontSize = "20px"
        messageContainer.style.marginTop = "20px"
        messageContainer.style.transition = "all 0.2s linear"
        messageContainer.style.position = "relative"
        messageContainer.style.transform = "translateY(-100%);"

        let newName = document.createElement("div")
        newName.innerHTML =  messages[i].name + ":"
        newName.style.fontWeight = "bold"
        newName.style.marginRight = "10px"
        messageContainer.appendChild(newName)

        if (messages[i].name === "Mike"){
            MikeLoop.style.display = 'block'
            JackLoop.style.display = 'none'
            JayLoop.style.display = 'none'
            YangLoop.style.display = 'none'
        } else if (messages[i].name === "Jack"){
            MikeLoop.style.display = 'none'
            JackLoop.style.display = 'block'
            JayLoop.style.display = 'none'
            YangLoop.style.display = 'none'
        } else if (messages[i].name === "Jay"){
            MikeLoop.style.display = 'none'
            JackLoop.style.display = 'none'
            JayLoop.style.display = 'block'
            YangLoop.style.display = 'none'
        } else if (messages[i].name === "Yang"){
            MikeLoop.style.display = 'none'
            JackLoop.style.display = 'none'
            JayLoop.style.display = 'none'
            YangLoop.style.display = 'block'
        }

        let newText = document.createElement("div")
        getTypingEffect(messages[i].text, newText)
        messageContainer.appendChild(newText)
        speak(messages[i].text)

        chat.appendChild(messageContainer)
        i ++
        setTimeout(getMessage, durationToNextText)
    }
}

