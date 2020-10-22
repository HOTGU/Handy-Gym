import passport from "passport";
import routes from "../routes";
import Health from "../models/Health";
import User from "../models/User";
import Trainer from "../models/Trainer";

export const home = async (req, res) => {
  const wantHealthBlock = await Health.find({}).populate("creator");
  try {
    res.render("home", { wantHealthBlock });
  } catch (error) {
    console.log(error);
    res.status(400);
    res.redirect(routes.home);
  }
};

export const getJoin = (req, res) => {
  res.render("join");
};

export const postJoin = async (req, res) => {
  const {
    body: { gender, age, name, nickname, email, password, password2 },
  } = req;
  try {
    if (password != password2) {
      req.flash("error", "비밀번호가 일치하지 않습니다.");
      res.status(400);
      res.render("join");
    } else {
      const user = await User({ gender, age, name, nickname, email });
      await User.register(user, password);
      req.flash("success", "회원가입 성공");
      res.redirect(routes.login);
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
  successRedirect: routes.home,
  successFlash: "핸디짐에 온 걸 환영합니다 😀",
  failureFlash: "로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.",
});

export const getLogin = (req, res) => {
  res.render("login");
};
export const logout = (req, res) => {
  req.logout();
  req.flash("info", "로그아웃하였습니다.");
  res.redirect(routes.home);
};
export const search = (req, res) => {
  res.send("search");
};

export const getMe = (req, res) => {
  res.render("userDetail", { user: req.user });
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
