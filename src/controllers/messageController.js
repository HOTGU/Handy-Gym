import Message from "../models/Messages";
import MessageRoom from "../models/MessageRoom";
import User from "../models/User";
import Health from "../models/Health";

import routes from "../routes";

export const messages = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate({ path: "message_rooms", populate: { path: "read_check" } });
    for (let i = 0; i < user.message_rooms.length; i++) {
      for (let j = 0; j < user.message_rooms[i].read_check.length; j++) {
        if (req.user.id === user.message_rooms[i].read_check[j].userId) {
          user.message_rooms[i].unread_number =
            user.message_rooms[i].messages.length - user.message_rooms[i].read_check[j].readnum;
        }
      }
      for (let j = 0; j < user.message_rooms[i].join_users.length; j++) {
        if (req.user.id !== user.message_rooms[i].join_users[j]) {
          const otherUser = await User.findById(user.message_rooms[i].join_users[j]);
          user.message_rooms[i].other_user = otherUser;
        }
      }
    }
    res.render("messages", { title: "쪽지함", user });
  } catch (error) {
    console.log("쪽지 관리 페이지 여는 중 오류발생 오류내용 : " + error);
    res.status(400);
  }
};

export const messageSend = async (req, res) => {
  const {
    body: { description },
    params: { healthId },
  } = req;
  try {
    const health = await Health.findById(healthId).populate("creator");
    const uploadUser = health.creator;
    const trainerUser = req.user;
    const checkMessageRoom = await MessageRoom.find({ join_users: [uploadUser.id, trainerUser.id] });
    if (checkMessageRoom.length !== 0) {
      // health.message_send_users.push(req.user.id);
      // health.save();
      req.flash("info", `${uploadUser.nickname}님과 쪽지를 이미 주고 받고 있습니다.`);
      // res.redirect(routes.messageRoom(checkMessageRoom[0].id));
      res.redirect(routes.message);
    } else {
      const message = await Message.create({ description, author: req.user });
      const messageRoom = await new MessageRoom();

      // 메시지 방 생성
      messageRoom.messages.push(message.id);
      messageRoom.join_users.push(uploadUser.id, trainerUser.id);
      messageRoom.read_check.push({ userId: uploadUser.id, readnum: 0 });
      messageRoom.read_check.push({ userId: trainerUser.id, readnum: 1 });
      messageRoom.save();

      // 글 작성자 메시지방 저장
      uploadUser.message_rooms.push(messageRoom.id);
      uploadUser.save();

      // 글 보낸사람 저장
      health.message_send_users.push(req.user.id);
      health.save();

      // 보낸사람 메시지방 저장
      trainerUser.message_rooms.push(messageRoom.id);
      trainerUser.save();

      req.flash("success", "쪽지를 보냈습니다.");
      res.redirect(routes.healthDetail(health.id));
    }
  } catch (error) {
    console.log("쪽지 보내는 중 오류 발생 : " + error);
    req.flash("error", "쪽지가 보내지지 않았습니다.");
    res.status(400);
  }
};

export const messageRoom = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const message_room = await MessageRoom.findById(id).populate({ path: "messages", populate: { path: "author" } });
    const messages = message_room.messages;
    const currentUserId = req.user.id;
    let userCheck = false;
    for (var i = 0; i < message_room.join_users.length; i++) {
      if (message_room.join_users[i] === currentUserId) {
        userCheck = true;
      }
    }
    if (!userCheck) {
      req.flash("error", "잘못된 경로입니다.");
      res.redirect(routes.home);
    } else {
      let otherUserId;
      for (var i = 0; i < message_room.join_users.length; i++) {
        if (message_room.join_users[i] !== currentUserId) {
          otherUserId = await User.findById(message_room.join_users[i]);
        }
      }
      res.render("messageRoom", {
        title: `${otherUserId.nickname}의 쪽지`,
        message_room,
        messages,
        currentUserId,
        otherUserId,
      });
    }
  } catch (error) {
    console.log("채팅방 로드 중 오류발생 오류내용 : " + error);
    res.status(400);
  }
};
