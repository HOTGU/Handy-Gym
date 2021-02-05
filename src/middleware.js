import routes from "./routes";
import multer from "multer";
import multerS3 from "multer-s3-transform";
import aws from "aws-sdk";
// import sharp from "sharp";
import mkdirp from "mkdirp";
import Trainer from "./models/Trainer";
import User from "./models/User";

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: "ap-northeast-2",
});

const multerPhotos = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "handygym/trainer_photos",
    shouldTransform: true,
    transforms: [
      {
        id: "resized_photo",
        key: (req, file, cb) => {
          cb(null, Date.now().toString() + file.originalname);
        },
        transform: function (req, file, cb) {
          cb(null, sharp().resize(450, 600));
        },
      },
    ],
  }),
});

const multerAvatar = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "handygym/avatar",
    shouldTransform: true,
    transforms: [
      {
        id: "resized_avatar",
        key: (req, file, cb) => {
          cb(null, Date.now().toString() + file.originalname);
        },
        transform: function (req, file, cb) {
          cb(null, sharp().resize(300, 300));
        },
      },
    ],
  }),
});

export const awsApiDeletePhoto = async (req, res, next) => {
  const {
    body: { imgSrc },
  } = req;
  if (imgSrc !== "http://localhost:4000/static/images/no-image.jpg") {
    const imgArray = imgSrc.split("/");
    const imgName = imgArray[imgArray.length - 1];
    const imgType = imgArray[imgArray.length - 2];
    let params = new Object();
    if (imgType === "avatar") {
      params = {
        Bucket: "handygym/avatar",
        Key: imgName,
      };
    }
    if (imgType === "trainer_photos") {
      params = {
        Bucket: "handygym/trainer_photos",
        Key: imgName,
      };
    }
    s3.deleteObject(params, (err, data) => {
      if (err) {
        console.log("AWS에서 사진 삭제 중 오류발생 : " + err);
        res.status(400);
      } else {
        console.log("AWS에서 사직 삭제 완료 " + data);
      }
    });
    res.status(200);
  } else {
    console.log("AWS에서 삭제할 사진이 없습니다.");
    res.status(200);
  }
};

export const awsAvatarDelete = async (req, res, next) => {
  try {
    const imgUrl = req.user.avatarUrl;
    if (imgUrl === undefined) {
      next();
      return;
    }
    const imgUrlArr = imgUrl.split("/");
    const imgName = imgUrlArr[imgUrlArr.length - 1];
    let params = {
      Bucket: "handygym/avatar",
      Key: imgName,
    };
    s3.deleteObject(params, (err, data) => {
      if (err) {
        console.log("AWS에서 사진 삭제 중 오류발생 : " + err);
        res.status(400);
      } else {
        console.log("AWS에서 사직 삭제 완료 " + data);
      }
    });
    next();
  } catch (error) {
    console.log("아바타 사진 삭제 중 오류발생 : " + error);
    res.status(400);
  }
};

export const trainerMulterAvatar = multerAvatar.single("trainerAvatar");

export const userMutlerAvatar = multerAvatar.single("userAvatar");

export const trainerMulterImage = multerPhotos.fields([
  { name: "trainerPhoto_1" },
  { name: "trainerPhoto_2" },
  { name: "trainerPhoto_3" },
  { name: "trainerPhoto_4" },
]);

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "핸디짐";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null;
  // console.log(req.user);
  next();
};

// const multerStorage = multer({ storage: multer.memoryStorage() });
// export const multiResizeImage = async (req, res, next) => {
//   req.body.trainerAvatar = [];
//   req.body.trainerPhoto_1 = [];
//   req.body.trainerPhoto_2 = [];
//   req.body.trainerPhoto_3 = [];
//   req.body.trainerPhoto_4 = [];
//   if (req.files) {
//     try {
//       await mkdirp("uploads/trainer_avatar");
//       await mkdirp("uploads/trainer_photos");
//       if (req.files.trainerAvatar) {
//         const filename = "resize" + req.files.trainerAvatar[0].originalname;
//         await sharp(req.files.trainerAvatar[0].buffer, { failOnError: false })
//           .resize(400, 400)
//           .toFile(`uploads/trainer_avatar/${filename}`)
//           .then((err, info) => {
//             req.body.trainerAvatar.push(filename);
//           });
//       }
//       if (req.files.trainerPhoto_1) {
//         const filename = "resize" + req.files.trainerPhoto_1[0].originalname;
//         await sharp(req.files.trainerPhoto_1[0].buffer, { failOnError: false })
//           .resize(450, 600)
//           .toFile(`uploads/trainer_photos/${filename}`)
//           .then((err, info) => {
//             req.body.trainerPhoto_1.push(filename);
//           });
//       }
//       if (req.files.trainerPhoto_2) {
//         const filename = "resize" + req.files.trainerPhoto_2[0].originalname;
//         await sharp(req.files.trainerPhoto_2[0].buffer, { failOnError: false })
//           .resize(450, 600)
//           .toFile(`uploads/trainer_photos/${filename}`)
//           .then((err, info) => {
//             req.body.trainerPhoto_2.push(filename);
//           });
//       }
//       if (req.files.trainerPhoto_3) {
//         const filename = "resize" + req.files.trainerPhoto_3[0].originalname;
//         await sharp(req.files.trainerPhoto_3[0].buffer, { failOnError: false })
//           .resize(450, 600)
//           .toFile(`uploads/trainer_photos/${filename}`)
//           .then((err, info) => {
//             req.body.trainerPhoto_3.push(filename);
//           });
//       }
//       if (req.files.trainerPhoto_4) {
//         const filename = "resize" + req.files.trainerPhoto_4[0].originalname;
//         await sharp(req.files.trainerPhoto_4[0].buffer, { failOnError: false })
//           .resize(450, 600)
//           .toFile(`uploads/trainer_photos/${filename}`)
//           .then((err, info) => {
//             req.body.trainerPhoto_4.push(filename);
//           });
//       }
//       return next();
//     } catch (error) {
//       console.log("이미지 사이즈 변화 중 에러발생 " + error);
//       res.status(400);
//     }
//   } else {
//     return next();
//   }
// };

// export const resizeImage = async (req, res, next) => {
//   if (req.file) {
//     try {
//       const filename = "resize " + req.file.originalname;
//       req.body.imageName = [];
//       await mkdirp("uploads/user_avatar");
//       await sharp(req.file.buffer, { failOnError: false })
//         .resize(400, 400)
//         .toFile(`uploads/user_avatar/${filename}`)
//         .then((err, info) => {
//           req.body.imageName.push(filename);
//         });
//       return next();
//     } catch (error) {
//       console.log("이미지 사이즈 변화 중 에러발생 " + error);
//       res.status(400);
//     }
//   } else {
//     return next();
//   }
// };

export const inspectTrainer = async (req, res, next) => {
  const {
    params: { id },
  } = req;
  try {
    const trainer = await Trainer.findById(id);
    if (!trainer.avatarUrl || !trainer.photo_1 || !trainer.photo_2 || !trainer.photo_3 || !trainer.photo_4) {
      req.flash("error", "사진을 첨부해주세요");
      return res.redirect(routes.trainerPhoto(trainer.id));
    }
    if (!trainer.program || !trainer.myself || trainer.myself.length < 200 || trainer.program.length < 200) {
      req.flash("error", "글을 더 작성해주세요");
      return res.redirect(routes.trainerWrite(trainer.id));
    }
    if (
      !trainer.career ||
      !trainer.supplies ||
      !trainer.place ||
      !trainer.free_class ||
      !trainer.program_price ||
      trainer.program_price === "0" ||
      (trainer.running_hour === "0" && trainer.running_min === "0")
    ) {
      req.flash("error", "질문에 답해주세요");
      return res.redirect(routes.trainerInfo(trainer.id));
    }
    if (trainer.career === "yes") {
      if (trainer.career_year === "") {
        req.flash("error", "경력년수를 적어주세요");
        return res.redirect(routes.trainerInfo(trainer.id));
      }
    }
    if (trainer.supplies === "yes") {
      if (trainer.supplies_list === "") {
        req.flash("error", "준비물을 적어주세요");
        return res.redirect(routes.trainerInfo(trainer.id));
      }
    }
    if (trainer.place === "yes") {
      if (trainer.program_place === "") {
        req.flash("error", "주소를 검색하세요");
        return res.redirect(routes.trainerInfo(trainer.id));
      }
    }
    return next();
  } catch (error) {
    console.log("트레이너 사진검사 중 오류발생 : " + error);
    res.status(400);
  }
};

export const onlyEmailVerify = (req, res, next) => {
  if (!req.user.email_verified) {
    console.log(req.user);
    res.redirect(routes.resendEmail);
  } else {
    next();
  }
};

export const onlyTrainerEdit = async (req, res, next) => {
  const {
    params: { id },
  } = req;
  try {
    const trainer = await Trainer.findById(id);
    const trainerUserId = String(trainer.user);
    const loggedUserId = req.user.id;
    if (trainerUserId === loggedUserId) {
      next();
    } else {
      req.flash("error", "잘못된 경로입니다.");
      res.redirect(routes.home);
    }
  } catch (error) {
    req.flash("error", "잘못된 경로입니다.");
    res.redirect(routes.home);
  }
};

export const onlyPublic = (req, res, next) => {
  if (!req.user) {
    next();
  } else {
    req.flash("error", "잘못된 경로입니다.");
    res.redirect(routes.home);
  }
};

export const onlyLogin = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    const redirect_url = req.originalUrl;
    req.flash("error", "로그인이 필요합니다.");
    req.session.returnTo = redirect_url;
    res.redirect(routes.login);
  }
};

export const onlyUser = (req, res, next) => {
  if (req.user.isTrainer) {
    req.flash("error", "트레이너는 이용할 수 없습니다.");
    res.redirect(routes.trainerMe);
  } else {
    next();
  }
};

export const onlyTrainer = (req, res, next) => {
  if (req.user.isTrainer) {
    next();
  } else {
    req.flash("error", "트레이너만 이용가능합니다.");
    res.redirect(routes.trainers);
  }
};

export const confirmTrainer = async (req, res, next) => {
  const {
    params: { id },
  } = req;
  try {
    const trainer = await Trainer.findById(id);
    const user = await User.findById(trainer.user);
    if (user.isTrainer) {
      next();
    } else if (!user.isTrainer && user.id === req.user.id) {
      next();
    } else {
      req.flash("error", "잘못된 경로입니다.");
      res.redirect(routes.home);
    }
  } catch (error) {
    console.log(error);
    req.flash("error", "트레이너만 이용가능합니다.");
    res.redirect(routes.home);
  }
};
