import nodemailer from "nodemailer";

const sendEmail = async (toString, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: toString,
    subject: subject,
    html: html,
  });
};

export default sendEmail;
