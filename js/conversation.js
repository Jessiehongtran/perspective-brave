
const messages= [
    {
        name: "Mike",
        text: "Okay, I believe we should put some resources behind this. The other members in the team, mostly men participated freely in the conversation but for me, it did not go so well. Step in my shoes, see things from my point of view.",
        out_speed: 5000
    },
    {
        name: "Emily",
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
        name: "Emily",
        text: "I have seen the data and I can clearly understand the result.",
        out_speed: 5000
    },
    {
        name: "Mike",
        text: "Sometimes, you cannot trust the data. If we spend time caring about the number all day long, we are never gonna move forward.",
        out_speed: 5000
    },
    {
        name: "Emily",
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
        name: "Emily",
        text: "What am I here for?...",
        out_speed: 5000
    }
]


let i = 0
let messageText = document.getElementById('message')
let name = document.getElementById('name')

function speak(text){
    if ('speechSynthesis' in window) {
        console.log("trying to speak")
        // Speech Synthesis supported 🎉
        var msg = new SpeechSynthesisUtterance();
        msg.text = text;
        window.speechSynthesis.speak(msg);
    }else{
        // Speech Synthesis Not Supported 😣
        alert("Sorry, your browser doesn't support text to speech!");
    }
}

function speakGoogleAPI(text){
    const request = {
        "input":{
            "text": text
          },
          "voice":{
            "languageCode":"en-gb",
            "name":"en-GB-Standard-A",
            "ssmlGender":"FEMALE"
          },
          "audioConfig":{
            "audioEncoding":"MP3"
          }
    }
    try {
        var key = 'MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDSblX986VeLnAx\nQy0iBqalkO9L/cCZstbgLji0vJLHlB2j3oCGD+wR9eWCnuKHDZqwEmJvMH1WUrO2\nk8Rpj+Po4Uf3+HqQswvqroFb4FpBFb6SA0aWf8D1ar8tSs3gNas8S8/wyIgvC5LW\nry/lVu16QrLy5/Tcbny+SzZUvAKWavsoOvGVs2zIf2U3cc4Hda4HfGzt032CEFKl\n+Rb+NP9H3Voc1vT8p2cgTU04AXn1brveXAw7tcTkauU1+E0Qnb2ygWLu5yy2oUyd\nEBW7RkPP9jkGzAXi5JFzBM7PmDjxJPBCdHfZg7ltYJYMFjgAvtGV+ht+TYyCN6vV\npNgNv1CBAgMBAAECggEACFNaGsHGPP5hfRp5PXmVw/LSu+8EjPQ14xFjGBgGpuev\n30cXLs6wFnMUFz2b7O/baxxUGY35pIXhwz9QD+Tj9ZedtER4DXPvDJRGTRU4nu76\nPu7LHvrbnp4gRZ2KPRTkgy6E8fPuKu3WW8D7SDOu8kWTrM+DeSn0LKd/RR2Z7Nto\n+dSPnqqOy1RxOY2XianlMevfXLkQgtzDflJgEBq0lGHu2Q2jDXkJlpcoGsCZNFHe\nFOl4fBUCmh5YxJeb5lgaCSf0Pu8D6B3g0zvE88v1LZ4dEBmSsT7RL32FwsixiXGH\ncBB+9H4uNThNSdQKMndltR+gBOYmpuWZ8wvxV/MdEQKBgQDquzmK8ubKqpSQ1roU\ndT6xp2OrjzZSDZWao+BoL3U43G80E8cIX6m7uLz9kdnvLwHlXPcPC+ZgcQz2oQMg\nAgOOUFMhOQ8fLhDaOn6ZMjEqgU5oTnQggTVIzrxtt/6OgsNNW2WZ4Kr/voqWmj60\ns0Ry26lxPB5hCSNdUiormMR3MQKBgQDlf3IeQDM/ikfaL08nrDluVwTtBfyQD8dd\npL+Cq9iq68DDOhCDKk0fWAOoVfjY4nHoVFTgGwvp/pybDm6e2pV7i+twTabzWdMZ\n7kFfpogBFIY3kCQIuFZtexLJlGYtaEWrp9Wbq4P27HkhHgAQSb9wYT2KZbXNIDW8\nV4rzQby6UQKBgQDjz8OAJFBzf2xiydOdCVFIcBGeroZkykRY6hVgaDbXcbEHlO5F\nJTsBMsFRQ92EclXfugMZek4jaXTQY+I5jVrQIwsbIlqXw0id08mMexcWjpp/Ry0T\nYvNI70QXJEyNGUHc8QhBeLfdL5snoRmcnKOg6amgeV1uhcTpzFWbLE/48QKBgQCU\nI/BGFqr+GQTIkkFGGqX307QaTAL7+zN1/yKf9s2lhwim/JQsFuIxmV7DCrvXRFTC\n46zl/I90PCZa8LX3VKGpXmhb1cQu0Yyy8FjCpXylNdptg12/Qz6G7SrzdBeAuA5A\n/9Wi5tQIUBzgg70GxpQMtrhC3eS8xE3rhZbr70MkAQKBgBZhkOE1tnFoJ+0MiPQ4\nTpg/BA3JJeZEYkLj4wkAmN5wAzm651Ql6hSBz/4BR7ZKdkT8WgdrDDtTubsFQ1RW\nYtsBTqTlqhYLVENMXgt7BBdGXRxU8aScE8LJcgic9vLD14BwvutFz7eOzozJD60Q\n6eFftoeqEbyw8m3uLwbMqtxR';
        const url = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${key}`
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        // xhr.setRequestHeader('Access-Control-Allow-Credentials', true)
        xhr.withCredentials = true;
        xhr.send(JSON.stringify({
            value: request
        }));
        // fetch(url, {
        //     method: "POST", 
        //     withCredentials: true,
        //     credentials: 'include',
        //     headers: {
        //         'x-goog-api-key': 'MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDSblX986VeLnAx\nQy0iBqalkO9L/cCZstbgLji0vJLHlB2j3oCGD+wR9eWCnuKHDZqwEmJvMH1WUrO2\nk8Rpj+Po4Uf3+HqQswvqroFb4FpBFb6SA0aWf8D1ar8tSs3gNas8S8/wyIgvC5LW\nry/lVu16QrLy5/Tcbny+SzZUvAKWavsoOvGVs2zIf2U3cc4Hda4HfGzt032CEFKl\n+Rb+NP9H3Voc1vT8p2cgTU04AXn1brveXAw7tcTkauU1+E0Qnb2ygWLu5yy2oUyd\nEBW7RkPP9jkGzAXi5JFzBM7PmDjxJPBCdHfZg7ltYJYMFjgAvtGV+ht+TYyCN6vV\npNgNv1CBAgMBAAECggEACFNaGsHGPP5hfRp5PXmVw/LSu+8EjPQ14xFjGBgGpuev\n30cXLs6wFnMUFz2b7O/baxxUGY35pIXhwz9QD+Tj9ZedtER4DXPvDJRGTRU4nu76\nPu7LHvrbnp4gRZ2KPRTkgy6E8fPuKu3WW8D7SDOu8kWTrM+DeSn0LKd/RR2Z7Nto\n+dSPnqqOy1RxOY2XianlMevfXLkQgtzDflJgEBq0lGHu2Q2jDXkJlpcoGsCZNFHe\nFOl4fBUCmh5YxJeb5lgaCSf0Pu8D6B3g0zvE88v1LZ4dEBmSsT7RL32FwsixiXGH\ncBB+9H4uNThNSdQKMndltR+gBOYmpuWZ8wvxV/MdEQKBgQDquzmK8ubKqpSQ1roU\ndT6xp2OrjzZSDZWao+BoL3U43G80E8cIX6m7uLz9kdnvLwHlXPcPC+ZgcQz2oQMg\nAgOOUFMhOQ8fLhDaOn6ZMjEqgU5oTnQggTVIzrxtt/6OgsNNW2WZ4Kr/voqWmj60\ns0Ry26lxPB5hCSNdUiormMR3MQKBgQDlf3IeQDM/ikfaL08nrDluVwTtBfyQD8dd\npL+Cq9iq68DDOhCDKk0fWAOoVfjY4nHoVFTgGwvp/pybDm6e2pV7i+twTabzWdMZ\n7kFfpogBFIY3kCQIuFZtexLJlGYtaEWrp9Wbq4P27HkhHgAQSb9wYT2KZbXNIDW8\nV4rzQby6UQKBgQDjz8OAJFBzf2xiydOdCVFIcBGeroZkykRY6hVgaDbXcbEHlO5F\nJTsBMsFRQ92EclXfugMZek4jaXTQY+I5jVrQIwsbIlqXw0id08mMexcWjpp/Ry0T\nYvNI70QXJEyNGUHc8QhBeLfdL5snoRmcnKOg6amgeV1uhcTpzFWbLE/48QKBgQCU\nI/BGFqr+GQTIkkFGGqX307QaTAL7+zN1/yKf9s2lhwim/JQsFuIxmV7DCrvXRFTC\n46zl/I90PCZa8LX3VKGpXmhb1cQu0Yyy8FjCpXylNdptg12/Qz6G7SrzdBeAuA5A\n/9Wi5tQIUBzgg70GxpQMtrhC3eS8xE3rhZbr70MkAQKBgBZhkOE1tnFoJ+0MiPQ4\nTpg/BA3JJeZEYkLj4wkAmN5wAzm651Ql6hSBz/4BR7ZKdkT8WgdrDDtTubsFQ1RW\nYtsBTqTlqhYLVENMXgt7BBdGXRxU8aScE8LJcgic9vLD14BwvutFz7eOzozJD60Q\n6eFftoeqEbyw8m3uLwbMqtxR', 
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(request)
        //   }).then(res => {
        //     console.log("Request complete! response:", res);
        //   });
    } catch(err){
        console.error(err)
    }
}

function getMessage(){
    console.log('getmessages')

    if (i < messages.length){
        messageText.innerHTML = messages[i].text
        name.innerHTML = messages[i].name

        let messageContainer = document.createElement("div")
        messageContainer.style.width = "100%"
        messageContainer.style.display = "flex"
        messageContainer.style.flexDirection = "column"

        let newName = document.createElement("div")
        newName.innerHTML =  messages[i].name
        newName.style.fontSize = "12px"
        newName.style.width = "80%"
        messageContainer.appendChild(newName)

        let newText = document.createElement("div")
        newText.innerHTML =  messages[i].text
        newText.style.fontSize = "14px"
        newText.style.borderRadius = "8px"
        newText.style.padding = "10px"
        newText.style.marginTop = "5px"
        newText.style.width = "80%"
        speak(messages[i].text)

        if (messages[i].name === "Mike"){
            newText.style.backgroundColor = "#1E04FC"
        } else  if (messages[i].name === "Emily"){
            newText.style.backgroundColor = "#FC04B8"
        } else  if (messages[i].name === "Jack"){
            newText.style.backgroundColor = "#02010C"
        } else  if (messages[i].name === "Jay"){
            newText.style.backgroundColor = "#4A01B3"
        }
        messageContainer.appendChild(newText)



        messageContainer.style.marginBottom = "20px"

        if (i%2 === 0){
            messageContainer.style.alignItems = "flex-start"
            messageContainer.style.textAlign = "left"
        } else {
            messageContainer.style.alignItems = "flex-end"
            messageContainer.style.textAlign = "right"
        }

        document.getElementById("chat").appendChild(messageContainer)
        i ++
        setTimeout(getMessage, messages[i].out_speed)
    }
}

getMessage()