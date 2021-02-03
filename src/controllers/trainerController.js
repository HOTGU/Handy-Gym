import passport from "passport";
import routes from "../routes";
import Health from "../models/Health";
import Trainer from "../models/Trainer";
import User from "../models/User";

export const getTrainers = (req, res) => {
  res.render("trainers", { user: req.user });
};

export const postTrainers = async (req, res) => {
  try {
    if (!req.user.trainer) {
      const trainer = await new Trainer();
      trainer.user = req.user.id;
      trainer.save();
      req.user.trainer = trainer.id;
      req.user.save();
      res.redirect(routes.trainerPhoto(trainer.id));
    } else {
      const trainerId = req.user.trainer[0];
      res.redirect(routes.trainerPhoto(trainerId));
    }
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};

export const trainerPhoneVerify = (req, res) => {
  res.render("trainerPhoneVerify");
};

export const getTrainerPhoto = async (req, res) => {
  const {
    params: { id },
  } = req;
  const user = req.user;
  try {
    const trainerId = await Trainer.findById(id);
    res.render("trainerPhoto", { user, trainerId });
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};

export const postTrainerPhoto = async (req, res) => {
  const {
    body: { trainerAvatar, trainerPhoto_1, trainerPhoto_2, trainerPhoto_3, trainerPhoto_4 },
    params: { id },
  } = req;
  const user = await User.findById(req.user.id).populate("trainer");
  try {
    const avatarPath = "uploads/trainer_avatar/";
    const photoListPath = "uploads/trainer_photos/";
    const trainer = await Trainer.findByIdAndUpdate(
      id,
      {
        $set: {
          avatarUrl: trainerAvatar.length === 0 ? user.trainer.avatarUrl : `${avatarPath}${trainerAvatar}`,
          photo_1: trainerPhoto_1.length === 0 ? user.trainer.photo_1 : `${photoListPath}${trainerPhoto_1}`,
          photo_2: trainerPhoto_2.length === 0 ? user.trainer.photo_2 : `${photoListPath}${trainerPhoto_2}`,
          photo_3: trainerPhoto_3.length === 0 ? user.trainer.photo_3 : `${photoListPath}${trainerPhoto_3}`,
          photo_4: trainerPhoto_4.length === 0 ? user.trainer.photo_4 : `${photoListPath}${trainerPhoto_4}`,
        },
      },
      { new: true }
    );
    req.user.avatarUrl = trainer.avatarUrl;
    req.user.save();
    req.flash("success", "프로필 업데이트 성공");
    res.redirect(routes.trainerDetail(id));
  } catch (error) {
    console.log("트레이너사진 저장 중 오류발생 : " + error);
    res.status(400);
  }
};

export const getTrainerWrite = async (req, res) => {
  const user = req.user;
  const {
    params: { id },
  } = req;
  try {
    const trainerId = await Trainer.findById(id);
    res.render("trainerWrite", { user, trainerId });
  } catch (error) {
    console.log("트레이너 정보 찾는 중 오류발생 : " + error);
    res.status(400);
  }
};

export const postTrainerWrite = async (req, res) => {
  const {
    body: { myself, program },
    params: { id },
  } = req;
  try {
    const trainerId = await Trainer.findById(id);

    if (myself.length < 200 || program.length < 200) {
      req.flash("error", "글을 더 작성해주세요");
      // return res.redirect(routes.trainerWrite(id));
      return res.render("trainerWrite", { trainerId, user: req.user });
    } else {
      await Trainer.findByIdAndUpdate(id, { $set: { myself, program } }, { new: true });
      req.flash("success", "프로필 업데이트 성공");
      res.redirect(routes.trainerDetail(id));
    }
  } catch (error) {
    console.log("트레어너소개 저장 중 오류발생 : " + error);
    res.status(400);
  }
};

export const getTrainerInfo = async (req, res) => {
  const user = req.user;
  const {
    params: { id },
  } = req;
  try {
    const trainerId = await Trainer.findById(id);
    console.log(trainerId);
    res.render("trainerInfo", { user, trainerId });
  } catch (error) {
    console.log("트레이너 정보 찾는 중 오류발생 : " + error);
    res.status(400);
  }
};

export const postTrainerInfo = async (req, res) => {
  const {
    body: {
      career,
      career_year,
      supplies,
      supplies_list,
      place,
      program_place,
      free_class,
      running_hour,
      running_min,
      program_price,
    },
    params: { id },
  } = req;
  try {
    if (
      !career ||
      !supplies ||
      !place ||
      !free_class ||
      !program_price ||
      program_price === "0" ||
      (running_hour === "0" && running_min === "0")
    ) {
      req.flash("error", "질문에 답해주세요");
      return res.redirect(routes.trainerInfo(id));
    }
    if (career === "yes") {
      if (career_year === "") {
        req.flash("error", "경력년수를 적어주세요");
        return res.redirect(routes.trainerInfo(id));
      }
    }
    if (supplies === "yes") {
      if (supplies_list === "") {
        req.flash("error", "준비물을 적어주세요");
        return res.redirect(routes.trainerInfo(id));
      }
    }
    if (place === "yes") {
      if (program_place === "") {
        req.flash("error", "주소를 검색하세요");
        return res.redirect(routes.trainerInfo(id));
      }
    }
    await Trainer.findByIdAndUpdate(
      id,
      {
        $set: {
          career,
          career_year,
          supplies,
          supplies_list,
          place,
          program_place,
          free_class,
          running_hour,
          running_min,
          program_price,
        },
      },
      { new: true }
    );
    req.flash("success", "프로필 업데이트 성공");
    res.redirect(routes.trainerDetail(id));
  } catch (error) {
    console.log("트레어너정보 저장 중 오류발생 : " + error);
    res.status(400);
  }
};

export const getTrainerJoin = (req, res) => {
  console.log("hi");
};

export const postTrainerJoin = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const trainer = await Trainer.findById(id);
    if (req.user.uploads.length > 0) {
      for (let i = 0; i < req.user.uploads.length; i++) {
        await Health.findByIdAndRemove(req.user.uploads[i]);
      }
      req.user.uploads = [];
    }
    req.user.isTrainer = true;
    req.user.avatarUrl = trainer.avatarUrl;
    req.user.save();
    req.flash("success", "트레이너가 되신 걸 축하합니다 😀");
    res.redirect(routes.trainerDetail(req.user.trainer));
  } catch (error) {
    req.flash("error", "트레이너 가입 실패");
    console.log("트레이너 가입중 오류 발생 : " + error);
    res.status(400);
  }
};

export const trainerEditProfile = (req, res) => {
  res.render("trainerEditProfile");
};

export const trainerDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const trainerId = await Trainer.findById(id);
    console.log(trainerId);
    const user = await User.findById(trainerId.user);
    res.render("trainerDetail", { trainerId, user });
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};
