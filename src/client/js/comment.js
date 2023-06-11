const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

const addComment = (text, newCommentId) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  const newSpan = document.createElement("span");
  const deleteBtn = document.createElement("span");

  newComment.className = "video__comment";
  newComment.dataset.commentid = newCommentId;
  deleteBtn.className = "video__comment-delete";
  newSpan.innerText = `${text}`;
  deleteBtn.innerText = "✖";

  newComment.appendChild(newSpan);
  newComment.appendChild(deleteBtn);
  videoComments.prepend(newComment);
  deleteBtn.addEventListener("click", handleDelete);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const videoId = videoContainer.dataset.id;
  const text = textarea.value;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  if (response.status === 201) {
    const { newCommentId } = await response.json();
    textarea.value = "";
    addComment(text, newCommentId);
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}

// delete li

let deleteBtns = document.querySelectorAll(".video__comment-delete");

const deleteComment = (event) => {
  event.preventDefault();
  const commentLi = document.querySelector(".video__comment");
  const li = event.target.parentElement;
  commentLi.remove(li);
};

// Data-Set 활용
const handleDelete = async (event) => {
  const videoId = videoContainer.dataset.id;
  const { commentid } = event.target.parentElement.dataset;
  await fetch(`/api/videos/${videoId}/comment/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ commentid }),
  });
  deleteComment(event);
};

deleteBtns.forEach((item) => {
  return item.addEventListener("click", handleDelete);
});
