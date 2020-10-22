import Health from "../models/Health";
import Address from "../models/Address";
import routes from "../routes";

export const wanthHealth = async (req, res) => {
  const wantHealthBlock = await Health.find({});
  try {
    res.render("wantHealth", { wantHealthBlock });
  } catch (error) {
    res.status(400);
    res.redirect(routes.home);
  }
};

export const getWanthHealthUpload = async (req, res) => {
  const address = await Address.find({});
  const fullAdd = await Address.find().distinct("fullAdd");
  try {
    req.flash("info", "항목을 채워 업로드해보세요");
    res.render("wantHealthUpload", { address, fullAdd });
  } catch (error) {
    console.log("주소를 불러오는 도중에 에러발생: " + error);
    res.status(400);
  }
};

export const postWanthHealthUpload = async (req, res) => {
  const {
    body: { wantAddress, wantCategory, wantProgram },
  } = req;
  try {
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
  } catch (error) {
    res.status(400);
    res.redirect(routes.home);
  }
};

export const wanthHealthDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const health = await Health.findById(id).populate("creator");
    res.render("wantHealthDetail", { health });
  } catch (error) {
    console.log(error);
    res.status(400);
    res.redirect(routes.home);
  }
};
