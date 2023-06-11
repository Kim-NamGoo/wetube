import express from "express";
import {
  getLogin,
  postLogin,
  getJoin,
  postJoin,
} from "../controller/usercontroller";
import { search, trending } from "../controller/videocontroller";

import { protectUrlMiddleware, publicOnlyMiddleware } from "../middlewares";

const rootRouter = express.Router();

rootRouter.get("/", trending);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter
  .route("/login")
  .all(publicOnlyMiddleware)
  .get(getLogin)
  .post(postLogin);
rootRouter.get("/search", search);

export default rootRouter;
