/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/client/js/videoPlayer.js":
/*!**************************************!*\
  !*** ./src/client/js/videoPlayer.js ***!
  \**************************************/
/***/ (() => {

eval("const video = document.querySelector(\"video\");\nconst playBtn = document.getElementById(\"play\");\nconst muteBtn = document.getElementById(\"mute\");\nconst currentTime = document.getElementById(\"currentTime\");\nconst totalTime = document.getElementById(\"totalTime\");\nconst volumeRange = document.getElementById(\"volume\");\nconst timeline = document.getElementById(\"timeline\");\nconst fullScreenBtn = document.getElementById(\"fullScreen\");\nconst videoContainer = document.getElementById(\"videoContainer\");\nconst videoControls = document.getElementById(\"videoControls\");\nlet volumeValue = 0.5;\nvideo.volume = volumeValue;\nconst handlePlay = e => {\n  if (video.paused) {\n    playBtn.innerText = \"Pause\";\n    video.play();\n  } else {\n    playBtn.innerText = \"Play\";\n    video.pause();\n  }\n};\nconst handleMute = e => {\n  if (video.muted) {\n    video.muted = false;\n    volumeRange.value = 0.5;\n  } else {\n    video.muted = true;\n    volumeRange.value = 0;\n  }\n  muteBtn.innerText = video.muted ? \"Unmute\" : \"Mute\";\n  volumeRange = video.muted ? 0 : 0.5;\n};\nconst handleVolumeChange = event => {\n  const {\n    target: {\n      value\n    }\n  } = event;\n  volumeValue = value;\n  muteBtn.innerText = Number(value) === 0 ? \"Unmute\" : \"Mute\";\n  video.muted = !Number(value) ? true : false;\n};\nconst formatTime = seconds => {\n  return new Date(seconds * 1000).toISOString().substring(11, 19);\n};\nconst handleMetaData = event => {\n  totalTime.innerText = formatTime(Math.floor(video.duration));\n  timeline.max = Math.floor(video.duration);\n};\nconst handleTimeupdate = event => {\n  currentTime.innerText = formatTime(Math.floor(video.currentTime));\n  timeline.value = Math.floor(video.currentTime); // 비디오의 현재 재생 시간을 타임라인에 적용\n};\n\nconst handleTimeline = event => {\n  video.currentTime = timeline.value; // 타임라인의 값을 조작할 때마다 비디오의 현재 시각도 따라서 변화\n};\n\nconst handleFullscreen = () => {\n  const fullscreen = document.fullscreenElement;\n  if (fullscreen) {\n    document.exitFullscreen();\n    fullScreenBtn.innerText = \"Enter Full Screen\";\n  } else {\n    videoContainer.requestFullscreen();\n    fullScreenBtn.innerText = \"Exit Full Screen\";\n  }\n};\n\n// videoController 설정\n\nlet controlsTimeout = null;\nlet controlsMovementTimeout = null;\nconst removeControl = () => {\n  videoControls.classList.remove(\"showVideoControl\");\n};\nconst handleMouseMove = () => {\n  if (controlsTimeout) {\n    clearTimeout(controlsTimeout);\n    controlsTimeout = null;\n  }\n  if (controlsMovementTimeout) {\n    clearTimeout(controlsMovementTimeout);\n    controlsMovementTimeout = null;\n  }\n  videoControls.classList.add(\"showVideoControl\");\n  controlsMovementTimeout = setTimeout(removeControl, 3000);\n};\nconst handleMouseLeave = () => {\n  controlsTimeout = setTimeout(removeControl, 3000);\n};\n\n// video 조회수\n\nconst handleEnded = () => {\n  const {\n    id\n  } = videoContainer.dataset;\n  fetch(`/api/videos/${id}/view`, {\n    method: \"POST\"\n  });\n};\nplayBtn.addEventListener(\"click\", handlePlay);\nmuteBtn.addEventListener(\"click\", handleMute);\nvolumeRange.addEventListener(\"input\", handleVolumeChange);\nvideo.addEventListener(\"loadedmetadata\", handleMetaData);\nvideo.addEventListener(\"timeupdate\", handleTimeupdate);\nvideo.addEventListener(\"mousemove\", handleMouseMove);\nvideo.addEventListener(\"mouseleave\", handleMouseLeave);\nvideo.addEventListener(\"ended\", handleEnded);\ntimeline.addEventListener(\"input\", handleTimeline);\nfullScreenBtn.addEventListener(\"click\", handleFullscreen);\n\n//# sourceURL=webpack://practice-youtube/./src/client/js/videoPlayer.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/js/videoPlayer.js"]();
/******/ 	
/******/ })()
;