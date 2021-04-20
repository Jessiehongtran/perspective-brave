const messageData= {
    part1: {
        messages: [
            {
                name: "JERRY",
                text: "I say we put more resources behind this effort. We have enough to go on.",
                speedInd: 40
            },
            {
                name: "DEVON",
                text: "Bob, what do you think?",
                speedInd: 120
            },
            {
                name: "BOB",
                text: "Oh, this is above my pay grade!",
                speedInd: 50
            },
            {
                name: "YANG",
                text: "...",
                speedInd: 0
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
                speedInd: 40
            },
            {
                name: "BOB",
                text: "Well, I wouldn't say the issue is the data..",
                speedInd: 50
            },
            {
                name: "JERRY",
                text: "You do not understand how these tests go Yang. Sure, it does not look like much, but we got some feedback that some of these folks like the direction we are taking. Sometimes you cannot rely on the data.",
                speedInd: 50
            },
            {
                name: "YANG",
                text: "...",
                speedInd: 50
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
                text: "Excuse me?",
                next: "part33"
            }
        ]
    },
    part31: {
        messages: [
            {
                name: "BOB",
                text: "Sold. Jerry is right. It is full speed ahead!" , 
                speedInd: 50
            },
            {
                name: "JERRY",
                text: "That is what I am talking about.",
                speedInd: 50
            },
            {
                name: "DEVON",
                text: "Let see how we can make this work with the timeline.",
                speedInd: 100
            },
        ],
        buttons: []
    },
    part32: {
        messages: [
            {
                name: "YANG",
                text: "I have seen the data and I can clearly understand the results. We ran that test for a reason. It is a good indicator of what happens if we scale this.." , 
                speedInd: 40
            },
            {
                name: "JERRY",
                text: "Look, I know this is the way to go I can feel it! I have done this before.",
                speedInd: 50
            },
            {
                name: "BOB",
                text: "Sold. Jerry is right. It is full speed ahead!",
                speedInd: 70
            },
            {
                name: "DEVON",
                text: "Yang, why do not you stay after the meeting so we can talk.",
                speedInd: 100
            }
        ],
        buttons: []
    },
    part33: {
        messages: [
            {
                name: "YANG",
                text: "What am I here for?.." , 
                speedInd: 60
            },
            {
                name: "JERRY",
                text: "I do not understand why you are being so aggressive to this and do not really appreciate it.",
                speedInd: 50
            },
            {
                name: "BOB",
                text: "Yeah Yang, Jerry has been doing this for a lot longer than you so you should trust his thoughts.",
                speedInd: 60
            },
            {
                name: "DEVON",
                text: "Yang, why do not you stay after the meeting so we can talk.",
                speedInd: 100
            }
        ],
        buttons: []
    }
}

const container = document.getElementById("conversation-container")
const intro = document.getElementById("intro")
const chat = document.getElementById("chat")
const conversation = document.getElementById("conversation")
const leftSlide = document.getElementById("leftSlide")
const rightSlide1 = document.getElementById("rightSlide1")
const rightSlide2 = document.getElementById("rightSlide2")
const rightSlide2Icon = document.getElementsByClassName("rightSlide2-icon")[0]
const chooseDifferentResponse = document.getElementById("choose-different-response")
const textWrapper = document.getElementById("text-wrapper")
const rightSlideWrapper = document.getElementById("rightSlideWrapper")
const speakerIcon = document.getElementsByClassName('speakerIcon')[0]
const logo = document.getElementsByClassName("logo")[0]
const tryButton = document.getElementsByClassName("tryButton")[0]
const  differentChooseText = document.getElementsByClassName("choose-text")[0]
const  differentNextText = document.getElementsByClassName("next-text")[0]
const volumeOff = document.getElementsByClassName('fas fa-volume-off')[0]
const volumeOn = document.getElementsByClassName('fas fa-volume-up')[0]

volumeOff.style.display = 'none'
volumeOn.style.display = 'block'
localStorage.setItem('muted', "False")

const curMode = sessionStorage.getItem('data-theme')
if (curMode && curMode === "dark"){
    intro.style.backgroundColor = chooseDifferentResponse.style.backgroundColor = "#015EF4"
    intro.style.color = "#FFFFFF"
    volumeOn.style.color = volumeOff.style.color = "#FFFFFF"
    container.style.backgroundImage = "url(https://res.cloudinary.com/dfulxq7so/image/upload/v1617917809/converIntroBG-dark_j6fstf.png)"
    logo.src="https://res.cloudinary.com/dfulxq7so/image/upload/v1617746117/Group_45-dark_u84cig.svg"
    leftSlide.src= "https://res.cloudinary.com/dfulxq7so/image/upload/v1618873211/leftSlide-darkkk_lkxxyl.svg"
    rightSlide1.src= rightSlide2Icon.src = "https://res.cloudinary.com/dfulxq7so/image/upload/v1618873310/rightSlide-darkkk_nun33v.svg"
    
}


let audio
let audio1
let audio2
let audioIsBeingPlayed = false
function speak(file){
    const muted = localStorage.getItem('muted')
    if (!audioIsBeingPlayed){
        let duration
        audio = new Audio(file);
        audio.volume = 1;
        if (muted === "False"){
            audio.play()
        }
        audio.onloadedmetadata = function() {
            duration = audio.duration*1000
        };
        setTimeout(function(){
            audioIsBeingPlayed = true
        }, duration)
    }
}

function speakDouble(file1, file2){
    const muted = localStorage.getItem('muted')
    if (!audioIsBeingPlayed){
        let duration 
        audio1 = new Audio(file1);
        audio1.volume = 1;
        if (muted === "False"){
            audio1.play()
        }

        setTimeout(function(){
            audio2 = new Audio(file2);
            audio2.volume = 1;
            if (muted === "False"){
                audio2.play()
            }
            audio2.onloadedmetadata = function() {
                duration = audio2.duration*1000
            };
        }, 6000)

        setTimeout(function(){
            audioIsBeingPlayed = true
        }, duration)
    }
    
}

function onAudio(){
    volumeOff.style.display = 'none'
    volumeOn.style.display = 'block'
    audio.muted = false
    localStorage.setItem('muted', "False")
}

function offAudio(){
    volumeOff.style.display = 'block'
    volumeOn.style.display = 'none'
    audio.muted = true
    localStorage.setItem('muted', "True")
}

function stopVO(){
    if (audio){
        audio.pause()
    }
    if (audio1){
        audio1.pause()
    }
    if (audio1){
        audio2.pause()
    }
}

const characterFace = {
    JERRY: "https://res.cloudinary.com/dfulxq7so/image/upload/v1613860312/JerryFace_unk49c.svg",
    DEVON: "https://res.cloudinary.com/dfulxq7so/image/upload/v1615583273/Devon2_bfidhs.svg",
    BOB: "https://res.cloudinary.com/dfulxq7so/image/upload/v1613860311/Bob_hvqnq7.svg",
    YANG: "https://res.cloudinary.com/dfulxq7so/image/upload/v1613860311/YangFace_evfdgk.svg"

}

const characterFaceDark = {
    JERRY: "https://res.cloudinary.com/dfulxq7so/image/upload/v1617918535/jerryAva-dark_lwhyjz.svg",
    DEVON: "https://res.cloudinary.com/dfulxq7so/image/upload/v1617918535/devonAva-dark_vkznfj.svg",
    BOB: "https://res.cloudinary.com/dfulxq7so/image/upload/v1617918536/bobAva-dark_eyxtnd.svg",
    YANG: "https://res.cloudinary.com/dfulxq7so/image/upload/v1617918534/yangAva_m2zi3q.svg"
}

let next = 'part1'
let messages = []
let buttons = []

function showConversation(){
    intro.style.display = 'none'
    if (curMode && curMode === "dark"){
        container.style.backgroundImage = 'url(https://res.cloudinary.com/dfulxq7so/image/upload/v1618872100/conversBG-dark_hjbzun.png)'
    } else {
        container.style.backgroundImage = 'url(https://res.cloudinary.com/dfulxq7so/image/upload/v1613859076/Group_181_tuayld.png)'
    }
    conversation.style.display = 'block'
    setTimeout(getMessagesForEachPart, 1000)
    //hide rightSlide1
    rightSlide1.style.display = 'none'
    rightSlide1.setAttribute('aria-hidden', 'true')
    stopVO()
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
            newMessage = getMessageElement(messages[j].name, messages[j].text, "right", messages[j].speedInd)
        } else {
            newMessage = getMessageElement(messages[j].name, messages[j].text, "left", messages[j].speedInd)
        }
        durationToNextMessage = messages[j].speedInd*(messages[j].text.length)
        chat.appendChild(newMessage)
        j += 1
        setTimeout(showEachMessage, durationToNextMessage) //apply recursion
    } else {
        if (buttons.length >0){
            let playAudioForAccessibility = localStorage.getItem('playAudioForAccessibility')
            if (playAudioForAccessibility === "true"){
                playAudio(`../../asset/VOfiles/PerspectivesVO_chooseAReaction.wav`)
            }
            addButtons()
        } else {
            //update choose a different response to be aria-hidden
            chooseDifferentResponse.setAttribute('aria-hidden', 'false')
            //show try a different respond or next
            const withScreenReader = sessionStorage.getItem('screen-reader')
            if (withScreenReader === "true"){
                setTimeout(tryDifferentResponseOrNext, 7000)
            } else {
                tryDifferentResponseOrNext()
            }
            //update conversation to be aria-hidden
            conversation.setAttribute('aria-hidden', 'true')
        }
    }
}

function tryDifferentResponseOrNext(){
    //hide conversation
    conversation.style.display = 'none'
    //change background for container
    if (curMode && curMode === "dark"){
        container.style.backgroundImage = "url(https://res.cloudinary.com/dfulxq7so/image/upload/v1617917809/converIntroBG-dark_j6fstf.png)"
        differentChooseText.style.color  = '#FFFFFF'
        differentNextText.style.color = '#FFFFFF'
        tryButton.style.backgroundColor = "#000000"
        tryButton.style.color = "#FFFFFF"
    } else {
        container.style.backgroundImage = "url(https://res.cloudinary.com/dfulxq7so/image/upload/v1613854499/Rectangle_170_fbizae.png)"
    }
    //remove slide left 
    leftSlide.style.display = 'none'
    //hide rightSlide1 and show rightSlide2
    rightSlide1.style.display = 'none'
    rightSlide2.style.display = 'block'
    intro.style.display = 'none'
    chooseDifferentResponse.style.display = 'flex'
    chooseDifferentResponse.style.flexDirection = 'column'
    chooseDifferentResponse.style.alignItems = 'center'
    chooseDifferentResponse.style.justifyContent = 'center'

}

function showPart2Again(){
    //update next
    next = "part2"
    //update aria-hidden on conversation
    conversation.setAttribute('aria-hidden', 'false')
    //hide choose a different response
    chooseDifferentResponse.style.display = 'none'
    //aria-hidden for choose a different response
    chooseDifferentResponse.setAttribute('aria-hidden', 'true')
    //adjust speedind to 0 to show all text of part 2
    let part2Messages = messageData[next].messages
    for (let i = 0; i < part2Messages.length; i++){
        part2Messages[i].speedInd = 0
    }
    //show conversation
    j = 0
    showConversation() 
}

let dotInd = 0
const dotImage = document.createElement('img')
dotImage.style.width = '100%'
function getDotAnimation(){
    if (dotInd < 17){
        let ind
        if (dotInd < 10){
            ind = "0" + dotInd.toString()
        } else {
            ind = dotInd
        }
        dotImage.src = `../../asset/Speech_dots/Speech_dots_000${ind}.png`
        dotInd += 1
    } else {
        dotInd = 0
    }
    setTimeout(getDotAnimation, 65)
}

function getMessageElement(name, messageText, side, speedInd){
    //message div
    const messageContainer = document.createElement("div")
    messageContainer.style.marginTop = '10px'
    messageContainer.setAttribute('role', 'text')
    messageContainer.setAttribute('tabindex', '0')
    //name div
    const nameContainer = document.createElement("div")
    nameContainer.setAttribute('class', 'name')
    nameContainer.setAttribute('role', 'text')
    nameContainer.setAttribute('aria-label', name)
    nameContainer.innerHTML = name
    nameContainer.style.fontWeight = 'bold'
    if (curMode && curMode === "dark"){
        nameContainer.style.color = "#FFFFFF"
    }
    //face-text div
    const faceTextContainer = document.createElement("div")
    faceTextContainer.setAttribute('class', 'face-text')
    faceTextContainer.setAttribute('aria-label', messageText)
    faceTextContainer.style.display = 'flex'
    faceTextContainer.style.alignItems = 'center'
    faceTextContainer.style.width = '100%'
    faceTextContainer.style.margin = '3px 0 0 0'
    //face div
    const faceContainer = document.createElement("div")
    faceContainer.setAttribute('class', 'face')
    faceContainer.setAttribute('aria-hidden', 'true')
    faceContainer.style.width = '60px'
    faceContainer.style.height = '60px'
    //face img
    const faceImg = document.createElement("img")
    faceImg.setAttribute('alt', 'Face image')
    faceImg.style.width = '100%'
    if (curMode && curMode === "dark"){
        faceImg.src = `${characterFaceDark[name]}`
    } else {
        faceImg.src = `${characterFace[name]}`
    }
    //text message div
    const textMessageContainer = document.createElement("div")
    textMessageContainer.setAttribute('aria-hidden', 'true')
    if (name === "YANG" && messageText[0] === "."){
        textMessageContainer.appendChild(dotImage)
        getDotAnimation()
        textMessageContainer.style.height = '60px'
    } else {
        textMessageContainer.innerHTML = messageText
        textMessageContainer.style.padding = '15px 30px'
    }
    textMessageContainer.style.display = 'flex'
    textMessageContainer.style.alignItems = 'center'
    textMessageContainer.style.borderRadius = '12px'
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
        if (curMode && curMode === "dark"){
            textMessageContainer.style.backgroundColor = "#00E09D"
        } else {
            textMessageContainer.setAttribute('id', 'text-message-left')
            textMessageContainer.style.backgroundColor = '#DCEBEB'
        }
        faceTextContainer.appendChild(faceContainer)
        faceTextContainer.appendChild(textMessageContainer)
    } else {
        messageContainer.setAttribute('id', 'right-message-container')
        nameContainer.style.paddingRight = '80px'
        nameContainer.style.textAlign = 'right'
        faceTextContainer.style.justifyContent = 'flex-end'
        faceContainer.style.marginLeft = '20px'
        if (curMode && curMode === "dark"){
            textMessageContainer.style.backgroundColor = "#015EF4"
            textMessageContainer.style.color = "#FFFFFF"
        } else {
            textMessageContainer.style.backgroundColor = '#A8D0CE'
            textMessageContainer.setAttribute('id', 'text-message-right')
        }
        faceTextContainer.appendChild(faceContainer)
        faceTextContainer.insertBefore(textMessageContainer, faceContainer)
    }

    //initiate VO
    const withScreenReader = sessionStorage.getItem('screen-reader')
    if (withScreenReader === "false" && messageText[0] != "." && speedInd !== 0){
        if (name === "JERRY"){
            playAudio(`../../asset/VOfiles/PerspectivesVO_jerry${audioInd}.wav`)
        } else if (name === "YANG"){
            playAudio(`../../asset/VOfiles/PerspectivesVO_yang${audioInd}.mp3`)
        } else if (name === "DEVON"){
            playAudio(`../../asset/VOfiles/PerspectivesVO_devon${audioInd}.mp3`)
        } else if (name === "BOB"){
            playAudio(`../../asset/VOfiles/PerspectivesVO_bob${audioInd}.mp3`)
        } 
    }


    return messageContainer
}

function addButtons(){
    buttonsContainer = document.createElement('div')
    buttonsContainer.setAttribute('aria-label', "Yang's reactions")
    buttonsContainer.style.display = 'flex'
    buttonsContainer.style.justifyContent = 'center'
    buttonsContainer.style.alignItems = 'center'
    buttonsContainer.style.flexWrap = 'wrap'
    buttonsContainer.style.marginTop = '20px'
    buttonsContainer.style.width = '100%'
    buttonsContainer.style.justifyContent = 'space-evenly'
    buttonsContainer.style.marginBottom= '30px'
    for (let i = 0; i < buttons.length; i++){
        if (buttons[i].text){
            let button = document.createElement('button')
            button.setAttribute('aria-label', buttons[i].text)
            button.style.padding = '12px 30px'
            button.style.border = 'none'
            if (curMode && curMode === "dark"){
                button.style.backgroundColor = '#FF2EE0'
                button.style.color = '#FFFFFF'
            } else {
                button.style.backgroundColor = '#111F47'
                button.style.color = '#FFFFFF'
            }
            button.setAttribute('id', 'message-btn')
            setTimeout(function(){
                button.style.animation = 'pulse 2s infinite'
            }, 3000)
            button.style.borderRadius = '40px'
            button.style.boxShadow = 'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px'
            button.appendChild(document.createTextNode(buttons[i].text))
            button.style.cursor = 'pointer'
            button.style.marginRight = '20px'
            button.style.marginBottom = '20px'
            button.style.fontSize = '16px'
            button.style.fontFamily = 'Montserrat'
            button.addEventListener('click', () => {
                stopVO()
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
    chat.scrollTop = chat.scrollHeight
}


//Function to play audio
function playAudio(file){
    const muted = localStorage.getItem('muted')
    audio = new Audio(file);
    if (muted === "False"){
        audio.play()
    }
    audio.volume = 1;
}
