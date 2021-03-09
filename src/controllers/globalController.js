import passport from "passport";
import crypto from "crypto";
import routes from "../routes";
import Health from "../models/Health";
import User from "../models/User";
import Trainer from "../models/Trainer";

import dotenv from "dotenv";
import { send_email } from "../nodemailer";

dotenv.config();

export const home = async (req, res) => {
  const wantHealthBlock = await Health.find({}).populate("creator");
  try {
    res.render("home", { wantHealthBlock });
  } catch (error) {
    res.status(400);
    res.redirect(routes.home);
  }
};

export const getJoin = (req, res) => {
  res.render("join");
};

export const postJoin = async (req, res) => {
  const key_one = crypto.randomBytes(256).toString("hex").substr(100, 5);
  const key_two = crypto.randomBytes(256).toString("hex").substr(50, 5);
  const key_for_verify = key_one + key_two;
  const {
    body: { gender, age, nickname, email, password, password2 },
  } = req;
  try {
    if (password != password2) {
      req.flash("error", "비밀번호가 일치하지 않습니다.");
      res.status(400);
      res.render("join");
    } else {
      const user = await User({ gender, age, nickname, email, key_for_verify });
      await User.register(user, password).then((result) => {
        const url = "http://" + req.get("host") + "/confirm_email" + "?key=" + result.key_for_verify;
        const to = result.email;
        const nickname = result.nickname;

        send_email(to, nickname, url);

        const link = user.email.split("@");
        res.render("explainPage", {
          pageTitle: "이메일 인증",
          mainText: `안녕하세요. ${user.nickname}님`,
          explainText1: `핸디짐 이용하기 전에 당신의 이메일을 인증해주세요.`,
          explainText2: `${user.email}로 전송된 인증링크를 확인해주세요.`,
          link: link[1],
          linkMessage: `${link[1]}로 가기`,
        });
      });
    }
  } catch (error) {
    let message = "";
    if (error.name === "UserExistsError") {
      message = "이미 이메일이 존재합니다.";
    }
    if (error.name === "MissingUsernameError") {
      message = "이메일을 적으세요.";
    }
    if (error.errors) {
      for (var errName in error.errors) {
        if (error.errors[errName].properties.message) {
          message = error.errors[errName].properties.message;
        }
      }
    }
    req.flash("error", message);
    console.log("유저 가입 중 에러 발생 : " + error);
    res.redirect(routes.join);
  }
};

export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successReturnToOrRedirect: routes.home,
  successFlash: "핸디짐에 온 걸 환영합니다 😀",
  failureFlash: "로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.",
  // successRedirect:
});

export const getLogin = (req, res) => {
  res.render("login");
};
export const logout = (req, res) => {
  req.logout();
  req.flash("info", "로그아웃하였습니다.");
  res.redirect(routes.home);
};

export const search = async (req, res) => {
  const {
    query: { wantAddress, wantCategory },
  } = req;
  try {
    if (!wantAddress && !wantCategory) {
      req.flash("info", "동네와 항목을 선택해주세요.");
      res.redirect(routes.wantHealth);
    }
    if (wantAddress && wantCategory) {
      const messageBlock = await Health.find({
        $and: [{ wantAddress }, { wantCategory: { $all: wantCategory } }],
        message_send_users: req.user.id,
      }).populate("creator");
      const unMessageBlock = await Health.find({
        $and: [{ wantAddress }, { wantCategory: { $all: wantCategory } }],
        message_send_users: { $nin: req.user.id },
      }).populate("creator");
      res.render("search", { messageBlock, unMessageBlock });
    }
    const messageBlock = await Health.find({
      $or: [{ wantAddress }, { wantCategory: { $all: wantCategory } }],
      message_send_users: req.user.id,
    }).populate("creator");
    const unMessageBlock = await Health.find({
      $or: [{ wantAddress }, { wantCategory: { $all: wantCategory } }],
      message_send_users: { $nin: req.user.id },
    }).populate("creator");
    res.render("search", { messageBlock, unMessageBlock });
  } catch (error) {
    console.log(error);
    req.flash("error", "다시 시도해주세요.");
    res.redirect(routes.wantHealth);
  }
};

export const getMe = async (req, res) => {
  if (req.user.isTrainer) {
    const trainerId = await Trainer.findById(req.user.trainer);
    const user = await User.findById(trainerId.user);
    res.render("trainerDetail", { trainerId, user });
  } else {
    const user = await User.findById(req.user.id).populate({ path: "uploads", populate: { path: "creator" } });
    res.render("userDetail", { user });
  }
};

export const getTrainerMe = async (req, res) => {
  try {
    const trainerId = await Trainer.findById(req.user.trainer);
    const user = await User.findById(trainerId.user);
    res.render("trainerDetail", { trainerId, user });
  } catch (error) {
    req.flash("error", "유저를 찾을 수 없습니다");
    res.redirect(routes.home);
  }
};

export const confirmEmail = async (req, res) => {
  const {
    query: { key },
  } = req;
  try {
    await User.findOneAndUpdate({ key_for_verify: key }, { $set: { email_verified: true } }, function (err, user) {
      if (user === null) {
        req.flash("error", "이메일 인증 실패");
        res.redirect(routes.resendEmail);
      } else {
        //인증 성공
        req.flash("success", "이메일 인증 성공");
        if (req.user) {
          res.render("explainPage", {
            pageTitle: "",
            mainText: "🙌 이메일 인증 성공",
            explainText1: `${user.email}는 인증되었습니다.`,
            link: "handygym.herokuapp.com/",
            linkMessage: "홈으로 가기",
          });
        } else {
          res.render("explainPage", {
            pageTitle: "",
            mainText: "🙌 이메일 인증 성공",
            explainText1: `${user.email}는 인증되었습니다.`,
            link: "handygym.herokuapp.com/login",
            linkMessage: "로그인하러 가기",
          });
        }
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};

export const resendEmail = (req, res) => {
  res.render("resendEmail", { user: req.user });
};
