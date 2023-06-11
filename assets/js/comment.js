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

/***/ "./src/client/js/comment.js":
/*!**********************************!*\
  !*** ./src/client/js/comment.js ***!
  \**********************************/
/***/ (() => {

eval("const videoContainer = document.getElementById(\"videoContainer\");\nconst form = document.getElementById(\"commentForm\");\nconst addComment = (text, newCommentId) => {\n  const videoComments = document.querySelector(\".video__comments ul\");\n  const newComment = document.createElement(\"li\");\n  const newSpan = document.createElement(\"span\");\n  const deleteBtn = document.createElement(\"span\");\n  newComment.className = \"video__comment\";\n  newComment.dataset.commentid = newCommentId;\n  deleteBtn.className = \"video__comment-delete\";\n  newSpan.innerText = `${text}`;\n  deleteBtn.innerText = \"✖\";\n  newComment.appendChild(newSpan);\n  newComment.appendChild(deleteBtn);\n  videoComments.prepend(newComment);\n  deleteBtn.addEventListener(\"click\", handleDelete);\n};\nconst handleSubmit = async event => {\n  event.preventDefault();\n  const textarea = form.querySelector(\"textarea\");\n  const videoId = videoContainer.dataset.id;\n  const text = textarea.value;\n  if (text === \"\") {\n    return;\n  }\n  const response = await fetch(`/api/videos/${videoId}/comment`, {\n    method: \"POST\",\n    headers: {\n      \"Content-Type\": \"application/json\"\n    },\n    body: JSON.stringify({\n      text\n    })\n  });\n  if (response.status === 201) {\n    const {\n      newCommentId\n    } = await response.json();\n    textarea.value = \"\";\n    addComment(text, newCommentId);\n  }\n};\nif (form) {\n  form.addEventListener(\"submit\", handleSubmit);\n}\n\n// delete li\n\nlet deleteBtns = document.querySelectorAll(\".video__comment-delete\");\nconst deleteComment = event => {\n  event.preventDefault();\n  const commentLi = document.querySelector(\".video__comment\");\n  const li = event.target.parentElement;\n  commentLi.remove(li);\n};\n\n// Data-Set 활용\nconst handleDelete = async event => {\n  const videoId = videoContainer.dataset.id;\n  const {\n    commentid\n  } = event.target.parentElement.dataset;\n  await fetch(`/api/videos/${videoId}/comment/delete`, {\n    method: \"DELETE\",\n    headers: {\n      \"Content-Type\": \"application/json\"\n    },\n    body: JSON.stringify({\n      commentid\n    })\n  });\n  deleteComment(event);\n};\ndeleteBtns.forEach(item => {\n  return item.addEventListener(\"click\", handleDelete);\n});\n\n//# sourceURL=webpack://practice-youtube/./src/client/js/comment.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/js/comment.js"]();
/******/ 	
/******/ })()
;