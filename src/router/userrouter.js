import express from "express";
import {
  startGithubLogin,
  finishGithubLogin,
  logout,
  getEditUser,
  postEditUser,
  getChangePassword,
  postChangePassword,
  seeUserProfile,
} from "../controller/usercontroller";

import {
  imageUpload,
  protectUrlMiddleware,
  publicOnlyMiddleware,
} from "../middlewares";

const userRouter = express.Router();

userRouter.route("/github/start").get(startGithubLogin);
userRouter.route("/github/finish").get(finishGithubLogin);
userRouter.route("/logout").get(protectUrlMiddleware, logout);
userRouter
  .route("/edit")
  .all(protectUrlMiddleware)
  .get(getEditUser)
  .post(imageUpload.single("avatar"), postEditUser);

userRouter
  .route("/change-password")
  .all(protectUrlMiddleware)
  .get(getChangePassword)
  .post(postChangePassword);

userRouter.get("/:id", seeUserProfile);

export default userRouter;
