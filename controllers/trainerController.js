import passport from "passport";
import routes from "../routes";
import Trainer from "../models/Trainer";
import User from "../models/User";

export const getTrainers = (req, res) => {
  const user = req.user;
  res.render("trainers", { user });
};

export const postTrainers = async (req, res) => {
  try {
    if (!req.user.trainer) {
      const trainer = await new Trainer();
      const user = await User.findById(req.user.id);
      trainer.user = user;
      trainer.save();
      user.trainer = trainer;
      user.save();
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
    await Trainer.findByIdAndUpdate(
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
    res.redirect(routes.trainerWrite(id));
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
    await Trainer.findByIdAndUpdate(id, { $set: { myself, program } }, { new: true });
  } catch (error) {
    console.log("트레어너소개 저장 중 오류발생 : " + error);
    res.status(400);
  } finally {
    res.end();
  }
};

export const getTrainerInfo = async (req, res) => {
  const user = req.user;
  const {
    params: { id },
  } = req;
  try {
    const trainerId = await Trainer.findById(id);
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
  } catch (error) {
    console.log("트레어너정보 저장 중 오류발생 : " + error);
    res.status(400);
  } finally {
    res.end();
  }
};

export const getTrainerJoin = (req, res) => {
  console.log("hi");
};

export const postTrainerJoin = async (req, res) => {
  req.user.isTrainer = true;
  req.user.save();
  req.flash("success", "트레이너가 되신 걸 축하합니다 😀");
  res.redirect(routes.trainerDetail(req.user.trainer));
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
    const user = await User.findById(trainerId.user);
    res.render("trainerDetail", { trainerId, user });
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};
