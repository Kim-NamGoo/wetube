import User from "../models/User";
import bcrypt from "bcrypt";
import session from "express-session";
import fetch from "node-fetch";

// # 회원가입
export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};
export const postJoin = async (req, res) => {
  const { name, username, password, email } = req.body;
  const checkUser = await User.exists({
    $or: [{ name }, { password }, { email }],
  });
  if (checkUser) {
    return res.status(404).render("join", {
      pageTitle: "Join",
      errorMessege: "It exist already",
    });
  }

  await User.create({
    name,
    username,
    password,
    email,
  });
  return res.redirect("/");
};

// # 로그인

export const getLogin = (req, res) => {
  res.render("login", { pageTitle: "Login" });
};
export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  // Login 시 입력한 username의 존재 확인 및 username과 password의 일치 확인
  const userCheck = await User.findOne({ username });

  if (!userCheck) {
    return res.status(404).render("login", {
      pageTitle: "Login",
      errorMessege: "Check your username",
    });
  }
  const comparePassword = await bcrypt.compare(password, userCheck.password);
  if (!comparePassword) {
    return res.status(404).render("login", {
      pageTitle: "Login",
      errorMessege: "Check your password",
    });
  }

  req.session.loggedIn = true;
  req.session.user = userCheck;

  return res.redirect("/");
};

// # Github API Login
export const startGithubLogin = (req, res) => {
  const baseUrl = "https://github.com/login/oauth/authorize?";
  const config = {
    client_id: process.env.GH_CLIENT,
    scope: "user:email read:user",
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}${params}`;
  return res.redirect(finalUrl);
};

export const finishGithubLogin = async (req, res) => {
  const baseUrl = "https://github.com/login/oauth/access_token?";
  const config = {
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}${params}`;
  const tokenRequest = await (
    await fetch(finalUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();

  if ("access_token" in tokenRequest) {
    // access API
    const { access_token } = tokenRequest;
    const userData = await (
      await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    const emailObj = await (
      await fetch("https://api.github.com/user/emails", {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();

    const primaryEmail = emailObj.find((email) => {
      return email.primary === true && email.verified === true;
    });

    if (!primaryEmail) {
      return res.redirect("/login");
    }
    let user = await User.findOne({ email: primaryEmail.email });
    if (!user) {
      user = await User.create({
        name: userData.name,
        username: userData.login,
        avatarUrl: userData.avatar_url,
        email: primaryEmail.email,
        password: "",
        githubLoggedIn: true,
      });
    }
    req.session.user = user;
    req.session.loggedIn = true;
    return res.redirect("/");
  } else {
    return res.redirect("/login");
  }
};

// Logout

export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};
export const see = (req, res) => res.send("See User");

// Edit User

export const getEditUser = (req, res) => {
  return res.render("edit-profile", {
    pageTitle: "Edit-profile",
    user: req.session.user,
  });
};

export const postEditUser = async (req, res) => {
  const {
    session: {
      user: { _id, avatarUrl },
    },
    body: { name, username, email },
    file,
  } = req;

  const existingUser = await User.exists({ $or: [{ username }, { email }] });

  if (existingUser) {
    return res.render("edit-profile", {
      pageTitle: "Edit-profile",
      user: req.session.user,
      errorMessege: "Existing",
    });
  }

  const updatedUser = await User.findByIdAndUpdate(
    _id,
    {
      avatarUrl: file ? file.path : avatarUrl,
      name,
      username,
      email,
    },
    { new: true }
  );

  req.session.user = updatedUser;
  console.log(username);
  return res.render("edit-profile", {
    pageTitle: "Edit-profile",
    user: req.session.user,
  });
};

// 비밀번호 변경

export const getChangePassword = async (req, res) => {
  if (req.session.user.githubLoggedIn) {
    return res.redirect("/");
  }
  return res.render("change-password", { pageTitle: "Change Password" });
};

export const postChangePassword = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { oldPassword, newPassword, validNewPassword },
  } = req;

  const ok = await bcrypt.compare(oldPassword, req.session.user.password);
  if (!ok) {
    return res.render("change-password", {
      pageTitle: "Change Password",
      errorMessege: "Current password is incorrect",
    });
  }
  if (newPassword !== validNewPassword) {
    return res.render("change-password", {
      pageTitle: "Change Password",
      errorMessege: "password doesn't match",
    });
  }

  const user = await User.findById({ _id });
  user.password = newPassword;
  await user.save();
  req.session.user.password = user.password;
  return res.redirect("/");
};

// 유저 프로필

export const seeUserProfile = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate("videos");
  const { videos } = user;
  if (!user) {
    return res.status(404).send("404");
  }
  return res.render("see-profile", {
    pageTitle: `${user.name}님의 Profile`,
    user,
    videos,
  });
};

export const remove = (req, res) => res.send("Remove User");
