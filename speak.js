let audio 
let audioIsBeingPlayed = false
function speak(file){
    if (!audioIsBeingPlayed){
        let duration
        audio = new Audio(file);
        audio.volume = 1;
        audio.play()
        audio.onloadedmetadata = function() {
            duration = audio.duration*1000
        };
        setTimeout(function(){
            audioIsBeingPlayed = true
        }, duration)
    }
}

function stopVO(){
    if (audio){
        audio.pause()
    }
}