const messages= [
    {
        name: "Mike",
        text: "Okay, I believe we should put some resources behind this. The other members in the team, mostly men participated freely in the conversation but for me, it did not go so well. Step in my shoes, see things from my point of view.",
        out_speed: 5000
    },
    {
        name: "Yang",
        text: "I have something to add, when you look at the numbers, you see that we do not have enough data to move forward.",
        out_speed: 5000
    },
    {
        name: "Jack",
        text: "Well, I am not sure the issue is the data..",
        out_speed: 5000 
    },
    {
        name: "Mike",
        text: "You do not understand how the test goes, sure it may not seem much but we have got some of really good feedbacks from these folks.",
        out_speed: 5000
    },
    {
        name: "Yang",
        text: "I have seen the data and I can clearly understand the result.",
        out_speed: 5000
    },
    {
        name: "Mike",
        text: "Sometimes, you cannot trust the data. If we spend time caring about the number all day long, we are never gonna move forward.",
        out_speed: 5000
    },
    {
        name: "Yang",
        text: "We ran that test for a reason. It is a good indicator of what happens if we scale this.",
        out_speed: 5000
    },
    {
        name: "Mike",
        text: "Look, I know this is the right way to go, I got a feeling about this, I have seen this before." ,
        out_speed: 5000
    },
    {
        name: "Jay",
        text: "So, Mike is right, we can move forward" ,
        out_speed: 5000 
    },
    {
        name: "Yang",
        text: "What am I here for?...",
        out_speed: 5000
    }
]

let i = 0
let chat = document.getElementById("chat")

function getMessage(){
    if (i < messages.length){
        if (chat.childElementCount === 3){
            while (chat.firstChild) {
                chat.removeChild(chat.firstChild);
            }
        }

        let messageContainer = document.createElement("div")
        messageContainer.style.width = "100%"
        messageContainer.style.display = "flex"
        messageContainer.style.fontSize = "18px"
        messageContainer.style.marginTop = "20px"
        messageContainer.style.transition = "all 0.2s linear"
        messageContainer.style.position = "relative"
        messageContainer.style.transform = "translateY(-100%);"

        let newName = document.createElement("div")
        newName.innerHTML =  messages[i].name + ":"
        newName.style.fontWeight = "bold"
        newName.style.marginRight = "10px"
        messageContainer.appendChild(newName)

        let newText = document.createElement("div")
        newText.innerHTML =  messages[i].text
        messageContainer.appendChild(newText)

        chat.appendChild(messageContainer)
        i ++
        setTimeout(getMessage, messages[i].out_speed)
    }
}

getMessage()