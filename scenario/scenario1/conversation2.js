const messageData= {
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
                name: "YANG",
                text: "",
            },
        ],
        buttons: [
            {
                text: "I have something to add...",
                next: "part2"
            }
        ]
    },
    part2: {
        messages: [
            {
                name: "YANG",
                text: "When you look at the numbers, we don't have enough data from our first test to move forward with any certainty.",
            },
            {
                name: "BOB",
                text: "Well, I wouldn't say the issue is the data..",
            },
            {
                name: "JERRY",
                text: "You do not understand how these tests go Yang. Sure, it does not look like much, but we got some feedback that some of those folks like the direction we are taking. Sometimes you cannot rely on the data.",
            },
            {
                name: "YANG",
                text: "",
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
                text: "Execuse me?",
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
            },
            {
                name: "YANG",
                text: "",
            },
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
                name: "YANG",
                text: "I have seen the data and I can clearly understand the results. We ran that test for a reason. It is a good indicator of what happens if we scale this.." , 
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
                name: "YANG",
                text: "What am I here for?.." , 
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

const container = document.getElementById("conversation-container")
const intro = document.getElementById("intro")
const chat = document.getElementById("chat")
const conversation = document.getElementById("conversation")

const characterFace = {
    JERRY: "https://res.cloudinary.com/dfulxq7so/image/upload/v1613860312/JerryFace_unk49c.svg",
    SASHA: "https://res.cloudinary.com/dfulxq7so/image/upload/v1613860312/Sasha_qk8xra.svg",
    BOB: "https://res.cloudinary.com/dfulxq7so/image/upload/v1613860311/Bob_hvqnq7.svg",
    YANG: "https://res.cloudinary.com/dfulxq7so/image/upload/v1613860311/YangFace_evfdgk.svg"

}

let next = 'part1'
let messages = []
let buttons = []

function showConversation(){
    intro.style.display = 'none'
    container.style.backgroundImage = 'url(https://res.cloudinary.com/dfulxq7so/image/upload/v1613859076/Group_181_tuayld.png)'
    conversation.style.display = 'block'
    getMessagesForEachPart()
}

function getMessagesForEachPart(){
    while (chat.firstChild) {
        chat.removeChild(chat.firstChild);
    }

    if (next){
       messages = messageData[next].messages;
       buttons = messageData[next].buttons;
       audioInd =  next.slice(4, next.length) //update audio ind
       showEachMessage()
       next = null
    }
    
}

let j = 0
let durationToNextMessage = 0
function showEachMessage(){
    if (j < messages.length){
        let newMessage
        if (messages[j].name === "YANG"){
            newMessage = getMessageElement(messages[j].name, messages[j].text, "right")
            durationToNextMessage = 70*(messages[j].text.length)
        } else {
            newMessage = getMessageElement(messages[j].name, messages[j].text, "left")
            durationToNextMessage = 70*(messages[j].text.length)
        }
        chat.appendChild(newMessage)
        j += 1
        setTimeout(showEachMessage, durationToNextMessage) //apply recursion
    } else {
        addButtons()
    }
}

function getMessageElement(name, messageText, side){
    //message div
    const messageContainer = document.createElement("div")
    messageContainer.style.marginTop = '20px'
    //name div
    const nameContainer = document.createElement("div")
    nameContainer.setAttribute('class', 'name')
    nameContainer.innerHTML = name
    nameContainer.style.fontWeight = 'bold'
    //face-text div
    const faceTextContainer = document.createElement("div")
    faceTextContainer.setAttribute('class', 'face-text')
    faceTextContainer.style.display = 'flex'
    faceTextContainer.style.alignItems = 'center'
    faceTextContainer.style.width = '100%'
    faceTextContainer.style.margin = '3px 0 0 0'
    //face div
    const faceContainer = document.createElement("div")
    faceContainer.setAttribute('class', 'face')
    faceContainer.style.width = '60px'
    faceContainer.style.height = '60px'
    //face img
    const faceImg = document.createElement("img")
    faceImg.style.width = '100%'
    faceImg.src = `${characterFace[name]}`
    //text message div
    const textMessageContainer = document.createElement("div")
    textMessageContainer.innerHTML = messageText
    textMessageContainer.style.display = 'flex'
    textMessageContainer.style.alignItems = 'center'
    textMessageContainer.style.borderRadius = '12px'
    textMessageContainer.style.padding = '15px 30px'
    textMessageContainer.style.maxWidth = '60%'
    //append
    faceContainer.appendChild(faceImg)
    messageContainer.appendChild(nameContainer)
    messageContainer.appendChild(faceTextContainer)
    if (side === "left"){
        messageContainer.setAttribute('id', 'left-message-container')
        nameContainer.style.paddingLeft = '80px'
        nameContainer.style.textAlign = 'left'
        faceTextContainer.style.justifyContent = 'flex-start'
        faceContainer.style.marginRight = '20px'
        textMessageContainer.setAttribute('id', 'text-message-left')
        textMessageContainer.style.backgroundColor = '#DCEBEB'
        faceTextContainer.appendChild(faceContainer)
        faceTextContainer.appendChild(textMessageContainer)
    } else {
        messageContainer.setAttribute('id', 'right-message-container')
        nameContainer.style.paddingRight = '80px'
        nameContainer.style.textAlign = 'right'
        faceTextContainer.style.justifyContent = 'flex-end'
        faceContainer.style.marginLeft = '20px'
        textMessageContainer.setAttribute('id', 'text-message-right')
        textMessageContainer.style.backgroundColor = '#A8D0CE'
        faceTextContainer.appendChild(faceContainer)
        faceTextContainer.insertBefore(textMessageContainer, faceContainer)
    }

    //initiate VO
    if (messageText.length > 0){
        if (name === "JERRY"){
            playAudio(`../../asset/VOfiles/PerspectivesVO_jerry${audioInd}.wav`)
        } else if (name === "YANG"){
            playAudio(`../../asset/VOfiles/PerspectivesVO_yang${audioInd}.mp3`)
        } else if (name === "SASHA"){
            playAudio(`../../asset/VOfiles/PerspectivesVO_sasha${audioInd}.mp3`)
        } else if (name === "BOB"){
            playAudio(`../../asset/VOfiles/PerspectivesVO_bob${audioInd}.mp3`)
        } 
    }


    return messageContainer
}

function addButtons(){
    buttonsContainer = document.createElement('div')
    buttonsContainer.style.display = 'flex'
    buttonsContainer.style.marginTop = '30px'
    buttonsContainer.style.width = '100%'
    buttonsContainer.style.justifyContent = 'space-evenly'
    for (let i = 0; i < buttons.length; i++){
        if (buttons[i].text){
            let button = document.createElement('div')
            button.style.padding = '10px 20px'
            button.style.backgroundColor = '#E85552'
            button.style.color = 'white'
            button.style.borderRadius = '20px'
            button.style.boxShadow = 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;'
            button.appendChild(document.createTextNode(buttons[i].text))
            button.style.cursor = 'pointer'
            button.style.marginRight = '20px'
            button.addEventListener('click', () => {
                next = buttons[i].next
                if (next){
                    j = 0
                    getMessagesForEachPart()
                } else {
                    window.location.href = "../../games/balloon/intro.html"
                }
            })
            buttonsContainer.appendChild(button)
        }
    }
    chat.appendChild(buttonsContainer)
}


//Function to play audio
function playAudio(file){
    var audio = new Audio(file);
    audio.play()
    audio.volume = 1;
}
