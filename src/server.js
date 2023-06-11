//Express 설치
import express from "express";

//express-session 설치
import session from "express-session";

// Connet Mongo

import MongoStore from "connect-mongo";

//morgan 설치
import morgan from "morgan";

//Router 설치
import rootRouter from "./router/rootrouter";
import userRouter from "./router/userrouter";
import videoRouter from "./router/videorouter";
import apiRouter from "./router/apiRouter";

//middleware 불러오기
import { localsMiddleware } from "./middlewares";

const app = express();
const logger = morgan("dev");

//pug 설정
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

//morgan 설정
app.use(logger);

// urlencoded 설정
app.use(express.urlencoded({ extended: true }));

// 데이터 josn 변환

app.use(express.json());

//express-session 설정ㅞㅡ

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.DB_URL,
    }),
  })
);

app.use(localsMiddleware);

// flash message 설치 및 적용

import flash from "express-flash";
app.use(flash());

// static 적용

app.use("/uploads", express.static("uploads"));

app.use("/static", express.static("assets"));

//Router Setting
app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);
app.use("/api", apiRouter);

export default app;
