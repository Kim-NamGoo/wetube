import Video from "../models/Video";
import User from "../models/User";
import Comment from "../models/Comment";
import session from "express-session";
import { async } from "regenerator-runtime";

export const trending = async (req, res) => {
  const videos = await Video.find({});

  res.render("home", { pageTitle: "Home", videos });
};

export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id).populate("owner").populate("comments");

  if (!video) {
    return res.render("404", { pageTitle: "Video not Found" });
  }
  res.render("watch", { pageTitle: `Watch Video `, video });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  const {
    user: { _id },
  } = req.session;

  if (!video) {
    return res.render("404", { pageTitle: "Video Not Found" });
  }

  if (String(video.owner) !== _id) {
    return res.status(403).redirect("/");
  }

  return res.render("edit", { pageTitle: `Edit Video `, video });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const { title, description, hashtags } = req.body;
  const video = await Video.exists({ _id: id });

  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.makeHashtags(hashtags),
  });
  if (!video) {
    return res.render("edit", { pageTitle: "Edit Video", video });
  }
  if (String(video.owner) !== _id) {
    return res.status(403).redirect("/");
  }

  return res.redirect(`/`);
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let newArr = [];
  if (keyword) {
    newArr = await Video.find({
      title: {
        $regex: new RegExp(`${keyword}`, "i"),
      },
    });
  }
  console.log(newArr);
  return res.render("search", { pageTitle: "Search Video", newArr });
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  await Video.findByIdAndDelete(id);
  return res.redirect("/");
};

export function getUploadVideo(req, res) {
  res.render("upload", { pageTitle: "Upload Video" });
}

export async function postUploadVideo(req, res) {
  const { user: _id } = req.session;
  const file = req.file;
  const { title, description, hashtags } = req.body;
  try {
    const newVideo = await Video.create({
      title,
      description,
      fileUrl: file.path,
      owner: _id,
      hashtags: Video.makeHashtags(hashtags),
    });
    const user = await User.findById(_id);

    user.videos.unshift(newVideo._id);
    user.save();
  } catch (error) {
    console.log(error);
    return res.render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }

  return res.redirect("/");
}

// API 설정

export const registerView = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.sendStatus(404);
  }
  video.meta.views = video.meta.views + 1;
  await video.save();
  return res.sendStatus(200);
};

// Comment

export const createComment = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const {
    session: { user },
  } = req;

  const video = await Video.findById(id);

  if (!video) {
    return res.sendStatus(404);
  }
  const comment = await Comment.create({
    text,
    owner: user._id,
    video: id,
  });

  video.comments.push(comment._id); // 해당하는 video에 comment 추가
  video.save();
  return res.status(201).json({ newCommentId: comment._id });
};

// delete Comment

export const deleteComment = async (req, res) => {
  const { commentid } = req.body;
  await Comment.deleteOne({ _id: commentid });
  res.sendStatus(201);
};
