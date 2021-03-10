import Health from "../models/Health";
import User from "../models/User";
import Address from "../models/Address";
import routes from "../routes";

export const wantHealth = async (req, res) => {
  try {
    const messageBlock = await Health.find({ message_send_users: req.user.id }).populate("creator");
    const unMessageBlock = await Health.find({ message_send_users: { $nin: req.user.id } }).populate("creator");
    res.render("wantHealth", { title: "글 목록", messageBlock, unMessageBlock });
  } catch (error) {
    res.status(400);
    console.log("건강업로드 렌더 중 오류 발생 오류내용 : " + error);
    res.redirect(routes.home);
  }
};

export const getWantHealthUpload = async (req, res) => {
  const address = await Address.find({});
  const fullAdd = await Address.find().distinct("fullAdd");
  try {
    req.flash("info", "항목을 채워 업로드해보세요");
    res.render("wantHealthUpload", { title: "글 업로드", address, fullAdd });
  } catch (error) {
    console.log("주소를 불러오는 도중에 에러발생: " + error);
    res.status(400);
  }
};

export const postWantHealthUpload = async (req, res) => {
  const {
    body: { wantAddress, wantCategory, wantProgram },
  } = req;
  try {
    if (wantCategory === undefined) {
      req.flash("error", "항목을 선택해주세요");
      res.redirect(`/want-health${routes.wantHealthUpload}`);
    } else {
      const newHealth = await Health.create({
        wantAddress,
        wantCategory,
        wantProgram,
        creator: req.user,
      });
      req.flash("success", "업로드 성공");
      req.user.uploads.push(newHealth.id);
      req.user.save();
      res.redirect(routes.healthDetail(newHealth.id));
    }
  } catch (error) {
    let message = "";
    if (error.errors) {
      for (var errName in error.errors) {
        if (error.errors[errName].properties.message) {
          message = error.errors[errName].properties.message;
        }
      }
    }
    req.flash("error", message);
    console.log("업로드 중 오류 발생 오류내용 : " + error);
    res.status(400);
    res.redirect(`/want-health${routes.wantHealthUpload}`);
  }
};

export const wantHealthDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const health = await Health.findById(id).populate("creator");
    let confirm_send_message = Boolean();
    for (let i = 0; i < health.message_send_users.length; i++) {
      if (JSON.stringify(health.message_send_users[i]) === JSON.stringify(req.user.id)) {
        confirm_send_message = true;
      }
    }
    res.render("wantHealthDetail", { title: `${health.creator.nickname}님의 글`, health, confirm_send_message });
  } catch (error) {
    console.log(error);
    res.status(400);
    res.redirect(routes.home);
  }
};

export const getWantHealthUpdate = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const health = await Health.findById(id);
    console.log(health);
    res.render("wantHealthUpdate", { title: "글 수정하기", health });
  } catch (error) {
    console.log(error);
  }
};
export const postWantHealthUpdate = async (req, res) => {
  const {
    body: { wantAddress, wantCategory, wantProgram },
    params: { id },
  } = req;
  console.log(id);
  try {
    if (wantCategory === undefined) {
      req.flash("error", "원하는 운동을 선택해주세요");
      res.redirect(`/want-health${routes.wantHealthUpdate}`);
    } else {
      const health = await Health.findByIdAndUpdate(
        id,
        { $set: { wantAddress, wantCategory, wantProgram } },
        { new: true }
      );
      console.log(health);
      req.flash("success", "수정 완료");
      res.redirect(routes.healthDetail(health._id));
    }
  } catch (error) {
    let message = "";
    if (error.errors) {
      for (var errName in error.errors) {
        if (error.errors[errName].properties.message) {
          message = error.errors[errName].properties.message;
        }
      }
    }
    req.flash("error", message);
    console.log("업데이트 중 오류 발생 오류내용 : " + error);
    res.status(400);
    res.redirect(`/want-health${routes.wantHealthUpload}`);
  }
};

export const postWantHealthDelete = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    await Health.findByIdAndRemove(id).then(async (err, result) => {
      if (err) {
        console.log(err);
      }
      await User.findByIdAndUpdate(req.user.id, {
        $pull: {
          uploads: id,
        },
      });
    });
    req.flash("success", "글을 삭제했습니다.");
    res.redirect(routes.me);
  } catch (error) {
    console.log("게시물 삭제 중 오류발생 : " + error);
    res.status(400);
  }
};
