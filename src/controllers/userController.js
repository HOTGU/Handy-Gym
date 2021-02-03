import passport from "passport";
import routes from "../routes";
import User from "../models/User";
import Trainer from "../models/Trainer";

export const users = (req, res) => {
  res.send("users");
};

export const userDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const user = await User.findById(id).populate({ path: "uploads", populate: { path: "creator" } });
    if (user.isTrainer) {
      res.redirect(routes.trainerDetail(user.trainer));
    } else {
      res.render("userDetail", { user });
    }
  } catch (error) {
    req.flash("error", "유저를 찾을 수 없습니다.");
    res.redirect(routes.home);
  }
};

export const getUserEditProfile = (req, res) => {
  res.render("userEditProfile");
};

export const postUserEditProfile = async (req, res) => {
  const {
    body: { age, gender, nickname },
    file,
  } = req;
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        $set: {
          avatarUrl: file === undefined ? req.user.avatrUrl : file.transforms[0].location,
          age,
          gender,
          nickname,
        },
      },
      { new: true }
    ).populate("trainer");
    if (user.isTrainer) {
      user.trainer.avatarUrl = user.avatarUrl;
      user.trainer.save();
      req.flash("success", "닉네입 업데이트 성공");
      res.redirect(routes.trainerMe);
    } else {
      req.flash("success", "프로필 업데이트 성공");
      res.redirect(routes.me);
    }
  } catch (error) {
    req.flash("error", "프로필 업데이트 실패");
    res.redirect(routes.userEditProfile);
  }
};

export const changePassword = (req, res) => {
  res.send("changePassword");
};
