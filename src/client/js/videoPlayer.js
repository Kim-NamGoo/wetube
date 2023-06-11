const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeRange = document.getElementById("volume");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

let volumeValue = 0.5;
video.volume = volumeValue;

const handlePlay = (e) => {
  if (video.paused) {
    playBtn.innerText = "Pause";
    video.play();
  } else {
    playBtn.innerText = "Play";

    video.pause();
  }
};
const handleMute = (e) => {
  if (video.muted) {
    video.muted = false;
    volumeRange.value = 0.5;
  } else {
    video.muted = true;
    volumeRange.value = 0;
  }
  muteBtn.innerText = video.muted ? "Unmute" : "Mute";
  volumeRange = video.muted ? 0 : 0.5;
};

const handleVolumeChange = (event) => {
  const {
    target: { value },
  } = event;
  volumeValue = value;
  muteBtn.innerText = Number(value) === 0 ? "Unmute" : "Mute";
  video.muted = !Number(value) ? true : false;
};

const formatTime = (seconds) => {
  return new Date(seconds * 1000).toISOString().substring(11, 19);
};

const handleMetaData = (event) => {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeline.max = Math.floor(video.duration);
};

const handleTimeupdate = (event) => {
  currentTime.innerText = formatTime(Math.floor(video.currentTime));
  timeline.value = Math.floor(video.currentTime); // 비디오의 현재 재생 시간을 타임라인에 적용
};

const handleTimeline = (event) => {
  video.currentTime = timeline.value; // 타임라인의 값을 조작할 때마다 비디오의 현재 시각도 따라서 변화
};

const handleFullscreen = () => {
  const fullscreen = document.fullscreenElement;
  if (fullscreen) {
    document.exitFullscreen();
    fullScreenBtn.innerText = "Enter Full Screen";
  } else {
    videoContainer.requestFullscreen();
    fullScreenBtn.innerText = "Exit Full Screen";
  }
};

// videoController 설정

let controlsTimeout = null;
let controlsMovementTimeout = null;
const removeControl = () => {
  videoControls.classList.remove("showVideoControl");
};

const handleMouseMove = () => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }

  if (controlsMovementTimeout) {
    clearTimeout(controlsMovementTimeout);
    controlsMovementTimeout = null;
  }
  videoControls.classList.add("showVideoControl");
  controlsMovementTimeout = setTimeout(removeControl, 3000);
};

const handleMouseLeave = () => {
  controlsTimeout = setTimeout(removeControl, 3000);
};

// video 조회수

const handleEnded = () => {
  const { id } = videoContainer.dataset;
  fetch(`/api/videos/${id}/view`, { method: "POST" });
};

playBtn.addEventListener("click", handlePlay);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeChange);

video.addEventListener("loadedmetadata", handleMetaData);
video.addEventListener("timeupdate", handleTimeupdate);
video.addEventListener("mousemove", handleMouseMove);
video.addEventListener("mouseleave", handleMouseLeave);
video.addEventListener("ended", handleEnded);

timeline.addEventListener("input", handleTimeline);
fullScreenBtn.addEventListener("click", handleFullscreen);
