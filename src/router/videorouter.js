import express from "express";
import {
  getUploadVideo,
  postUploadVideo,
  getEdit,
  postEdit,
  deleteVideo,
  watch,
} from "../controller/videocontroller";

import {
  protectUrlMiddleware,
  publicOnlyMiddleware,
  videoUpload,
} from "../middlewares";

const videoRouter = express.Router();

videoRouter
  .route("/upload")
  .all(protectUrlMiddleware)
  .get(getUploadVideo)
  .post(videoUpload.single("video"), postUploadVideo);
videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter
  .route("/:id([0-9a-f]{24})/edit")
  .all(protectUrlMiddleware)
  .get(getEdit)
  .post(postEdit);
videoRouter.get("/:id([0-9a-f]{24})/delete", protectUrlMiddleware, deleteVideo);

export default videoRouter;
