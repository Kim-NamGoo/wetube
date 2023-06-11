import multer from "multer";

export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.user = req.session.user || {};

  next();
};

export const protectUrlMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    return next();
  } else {
    req.flash("error", "Not authorize");
    res.redirect("/");
  }
};

export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    req.flash("error", "Not authorize");
    return res.redirect("/");
  }
};

export const imageUpload = multer({
  dest: "uploads/avatars",
  limits: {
    // fileSize는 업로드 용량의 최대치를 뜻하며 기본단위는 Byte 입니다. 참고로 1000byte = 1MB(mega byte) 입니다
    fileSize: 3000000,
  },
});

export const videoUpload = multer({
  dest: "uploads/videos",
  limits: {
    fileSize: 100000000,
  },
});
