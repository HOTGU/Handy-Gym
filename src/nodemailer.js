import nodemailer from "nodemailer";
import smtpTransport from "nodemailer-smtp-transport";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport(
  smtpTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_ID,
      pass: process.env.GMAIL_SECRET,
    },
  })
);

export const send_email = (to, nickname, url) => {
  transporter.sendMail(
    {
      from: process.env.GMAIL_ID,
      to,
      subject: "핸디짐에서 인증 확인",
      html: `
      <div style="color:#16c2c2; font-size: 40px; padding:25px"> Welcome! Handy Gym 🎈</div><br>
      <div style="font-size: 20px">안녕하세요. ${nickname}님! 이메일이 인증되야 사이트 이용이 가능합니다..</div><br>
      <div style="font-size: 20px">이메일 인증을 하기 위해서는 아래 주소를 클릭해주시거나 복사해서 들어가주세요.</div><br>
      <a href=${url} style="font-size: 22px">${url}</a> `,
    },
    (err, info) => {
      if (err) {
        console.log("이메일 인증 보내기 중 오류발생 오류내용 : " + err);
      } else {
        console.log("이메일 보내기 성공 내용 : " + info.response);
      }
    }
  );
};
