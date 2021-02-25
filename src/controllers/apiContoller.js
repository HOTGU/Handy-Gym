import Address from "../models/Address";
import Trainer from "../models/Trainer";
import User from "../models/User";
import MessageRoom from "../models/MessageRoom";
import Message from "../models/Messages";

import { send_email } from "../nodemailer";

export const api = (req, res) => {
  console.log("api");
};

export const apiAddressSearch = async (req, res) => {
  const {
    body: { searchingAddress },
  } = req;
  try {
    const searchAddress = await Address.find({ add3: { $regex: searchingAddress } });
    res.json(searchAddress);
  } catch (error) {
    console.log("주소 검색중 오류발생: " + error);
    res.status(400);
  } finally {
    res.end();
  }
};

export const apiTrainerAvatar = async (req, res) => {
  const {
    file: { transforms },
    params: { id },
  } = req;
  const user = await User.findById(req.user.id).populate("trainer");
  try {
    await Trainer.findByIdAndUpdate(
      id,
      {
        $set: {
          avatarUrl: transforms.length === 0 ? user.trainer.avatarUrl : transforms[0].location,
        },
      },
      { new: true }
    );
    res.status(200).json({ fileLocation: transforms[0].location });
  } catch (error) {
    console.log("트레이너사진 저장 중 오류발생 : " + error);
    res.status(400);
  } finally {
    res.end();
  }
};

export const apiAwsPhotoUpload = (req, res) => {
  const fieldName = Object.entries(req.files)[0][1][0].fieldname;
  const fileUrl = Object.entries(req.files)[0][1][0].transforms[0].location;
  res.status(200).json({ fileUrl, fieldName });
  res.end();
};

export const apiTrainerPhoto = async (req, res) => {
  const {
    params: { id },
    body: { fileUrl, fieldName },
  } = req;
  try {
    const trainerId = await Trainer.findById(id);
    if (fieldName === "trainerPhoto_1") {
      trainerId.photo_1 = fileUrl;
    }
    if (fieldName === "trainerPhoto_2") {
      trainerId.photo_2 = fileUrl;
    }
    if (fieldName === "trainerPhoto_3") {
      trainerId.photo_3 = fileUrl;
    }
    if (fieldName === "trainerPhoto_4") {
      trainerId.photo_4 = fileUrl;
    }
    trainerId.save();
    // await Trainer.findByIdAndUpdate(
    //   id,
    //   {
    //     $set: {
    //       photo_1:
    //         req.files.trainerPhoto_1 === undefined
    //           ? user.trainer.photo_1
    //           : req.files.trainerPhoto_1[0].transforms[0].location,
    //       photo_2:
    //         req.files.trainerPhoto_2 === undefined
    //           ? user.trainer.photo_2
    //           : req.files.trainerPhoto_2[0].transforms[0].location,
    //       photo_3:
    //         req.files.trainerPhoto_3 === undefined
    //           ? user.trainer.photo_3
    //           : req.files.trainerPhoto_3[0].transforms[0].location,
    //       photo_4:
    //         req.files.trainerPhoto_4 === undefined
    //           ? user.trainer.photo_4
    //           : req.files.trainerPhoto_4[0].transforms[0].location,
    //     },
    //   },
    //   { new: true }
    // );
  } catch (error) {
    console.log("트레이너사진 저장 중 오류발생 : " + error);
    res.status(400);
  } finally {
    res.end();
  }
};

export const apiTrainerWrite = async (req, res) => {
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

export const apiTrainerInfo = async (req, res) => {
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
    ).then(() => {
      res.status(200);
    });
  } catch (error) {
    console.log("트레어너정보 저장 중 오류발생 : " + error);
    res.status(400);
  } finally {
    res.end();
  }
};

export const resendEmail = async (req, res) => {
  const {
    body: { email, new_key },
  } = req;
  try {
    await User.findOneAndUpdate({ email }, { key_for_verify: new_key }, { new: true }).then((result) => {
      //url
      const url = "http://" + req.get("host") + "/confirm_email" + "?key=" + result.key_for_verify;
      const to = result.email;
      const nickname = result.nickname;
      //이메일전송
      send_email(to, nickname, url);
    });
  } catch (error) {
    console.log("이메일 재전송 중 오류발생 오류내용 : " + error);
    res.status(400);
  } finally {
    res.end();
  }
};

export const apiMessageRead = async (req, res) => {
  const {
    params: { roomId },
  } = req;
  try {
    const messageRoom = await MessageRoom.findById(roomId).populate("read_check");
    const messageLength = messageRoom.messages.length;
    let other_un_read_num;
    for (let i = 0; i < messageRoom.read_check.length; i++) {
      if (messageRoom.read_check[i].userId === req.user.id) {
        messageRoom.read_check[i].readnum = messageLength;
      } else {
        const otherUserReadNum = messageRoom.read_check[i].readnum;
        other_un_read_num = messageLength - otherUserReadNum;
      }
    }
    messageRoom.save();
    res.status(200).json({ roomId: messageRoom.id, other_un_read_num });
  } catch (error) {
    console.log("메시지 읽는 중 오류 발생 오류내용 : " + error);
    res.status(400);
  } finally {
    res.end();
  }
};

export const apiMessageSend = async (req, res) => {
  const {
    params: { roomId },
    body: { message },
  } = req;
  try {
    const messageId = await Message.create({ description: message, author: req.user });
    const messageRoom = await MessageRoom.findById(roomId);
    messageRoom.messages.push(messageId.id);
    messageRoom.save();
    const messageObj = {
      room_id: messageRoom.id,
      createAt: messageId.createAt,
      author_nickname: messageId.author.nickname,
      author_avatar: messageId.author.avatarUrl,
      author_gender: messageId.author.gender,
      description: messageId.description,
    };
    res.status(200).json({ messageObj });
  } catch (error) {
    console.log("메시지 저장 중 오류 발생 오류내용 : " + error);
  } finally {
    res.end();
  }
};
