console.log("connected");
const currentTime = document.getElementById("current-time");
const totalTime = document.getElementById("total-time");
const playPauseButton = document.getElementById("play-pause-button");
const seekbar = document.getElementById("seek-bar");
const audio = new Audio(
  "audio/This feeling (instrumental) - meeting by chance.webm"
);
let isSeeking = false;

audio.onloadeddata = function () {
  totalTime.innerHTML = formatTime(audio.duration);
};

playPauseButton.onclick = function () {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
};
// audio event listener
//trigger event post audio load

audio.oncanplaythrough = function () {
  seekbar.disabled = false;
};
//Change icon depending on play or pause state
audio.onplay = function () {
  playPauseButton.src = "images/pause.svg";
};
audio.onpause = function () {
  playPauseButton.src = "images/play.svg";
};

//meta data code
//meta data triggered
audio.onloadmetadata = function () {
  //totalTime.innerHTML = formatTime(audio.duration);
  currentTime.innerHTML = formatTime(0);
  // set seekbar to audio length
  seekbar.max = Math.floor(audio.duration);
};
audio.ontimeupdate = function () {
  currentTime.innerHTML = formatTime(audio.currentTime);
  if (!isSeeking) {
    seekbar.value = Math.floor(audio.currentTime);
  }
};
//audio finish triggered code
audio.onended = function () {
  currentTime.innerHTML = formatTime(0);
  seekbar.value = 0;
  playPauseButton.src = "images/play.svg";
};
//seekbar/ forward rewind
seekbar.oninput = function () {
  isSeeking = true;
};
seekbar.onchange = function () {
  audio.currentTime = seekbar.value;
  isSeeking = false;
};
//total seconds and returns as string
function formatTime(secs) {
  let hours = Math.floor(secs / 3600);
  let minutes = Math.floor((secs - hours * 3600) / 60);
  let seconds = Math.floor(secs - hours * 3600 - minutes * 60);
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
