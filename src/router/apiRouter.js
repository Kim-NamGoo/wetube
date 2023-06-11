import express from "express";
import {
  registerView,
  createComment,
  deleteComment,
} from "../controller/videocontroller";

const apiRouter = express.Router();

apiRouter.post("/videos/:id([0-9a-f]{24})/view", registerView); // 영상이 재생되는 URL을 입력
apiRouter.post("/videos/:id([0-9a-f]{24})/comment", createComment);
apiRouter.delete("/videos/:id([0-9a-f]{24})/comment/delete", deleteComment);

export default apiRouter;
