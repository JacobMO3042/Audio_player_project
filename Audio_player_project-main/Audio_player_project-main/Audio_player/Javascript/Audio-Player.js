console.log("connected")
//add function to the html button
const song1 = document.getElementById('button1')
const song2 = document.getElementById('button2')
//volume slider
const volumebar = document.getElementById('volume-slider');

// Audioplayer
const currentTime = document.getElementById('current-time');
const totalTime = document.getElementById('total-time');
const playPauseButton = document.getElementById('play-pause-button');
const seekbar = document.getElementById('seek-bar');
// leaving the source empty () as a button click will replace it
const audio = new Audio()
let isSeeking = false;

song1.onclick = function () {
    
    audio.src = "audio/this feeling.webm"
}
// on html button click execute
song2.onclick = function () {
    // change the source on the audio const
    audio.src = "audio/Star Shopping.webm"
}

playPauseButton.onclick = function () {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}
// audio event listener
//trigger event post audio load

audio.oncanplaythrough = function () {
    seekbar.disabled = false;
}
//Change icon depending on play or pause state
audio.onplay = function () {
    playPauseButton.src = "images/pause.svg"
}
audio.onpause = function () {
    playPauseButton.src = "images/play.svg"
}

audio.onloadeddata = function () {
    totalTime.innerHTML = formatTime(audio.duration);
}
//meta data code
//meta data load triggered
audio.onloadmetadata = function () {

    currentTime.innerHTML = formatTime(0)
    // set seekbar to audio length
    seekbar.max = Math.floor(audio.duration);
}
audio.ontimeupdate = function () {

    currentTime.innerHTML = formatTime(audio.currentTime)
    if (!isSeeking) {
        seekbar.value = Math.floor(audio.currentTime)

    }
}
//audio finish triggered code
audio.onended = function () {
    currentTime.innerHTML = formatTime(0);
    seekbar.value = 0;
    playPauseButton.src = "images/play.svg"
}
//seekbar/ forward and rewind
seekbar.oninput = function () {
    isSeeking = true;
}
seekbar.onchange = function () {
    audio.currentTime = seekbar.value;
    isSeeking = false;
}
volumebar.onchange = function () {
    audio.volume = volumebar.value / 100;
}
//total seconds and returns as string
function formatTime(secs) {
    let hours = Math.floor(secs / 3600);
    let minutes = Math.floor((secs - (hours * 3600)) / 60);
    let seconds = Math.floor((secs - (hours * 3600)) - minutes * 60);
    if (hours < 10) {
        hours = "0" + hours;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    if (hours > 0) {
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        return hours + ":" + minutes + ":" + seconds;
    } else {
        return minutes + ":" + seconds;
    }
}
