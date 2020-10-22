import passport from "passport";
import routes from "../routes";
import User from "../models/User";
import sharp from "sharp";

export const users = (req, res) => {
  res.send("users");
};

export const userDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const user = await User.findById(id);
    res.render("userDetail", { user });
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
    body: { name, age, gender, nickname, imageName },
    file,
  } = req;
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        $set: {
          avatarUrl: file ? `uploads/user_avatar/${imageName}` : req.user.avatarUrl,
          name,
          age,
          gender,
          nickname,
        },
      },
      { new: true }
    );
    user.save();
    req.flash("success", "프로필 업데이트 성공");
    res.redirect(routes.me);
  } catch (error) {
    req.flash("error", "프로필 업데이트 실패");
    res.redirect(routes.userEditProfile);
  }
};

export const changePassword = (req, res) => {
  res.send("changePassword");
};
