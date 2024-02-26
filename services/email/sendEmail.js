const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

const sendWelcomeEmail = async (email, subject, payload) => {
  try {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD, // naturally, replace both with your real credentials or an application-specific password
      },
    });

    // const source = fs.readFileSync(path.join(__dirname, template), "utf8");
    // const compiledTemplate = handlebars.compile(source);
    const options = () => {
      return {
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: subject,
        text: `helloo ${payload.name} `,
      };
    };

    // Send email
    transporter.sendMail(options(), (error, info) => {
      if (error) {
        return error;
      } else {
        console.log("email sent");
        return res.status(200).json({
          success: true,
        });
      }
    });
  } catch (error) {
    return error;
  }
};

const sendResetPasswordEmail = async (email, subject, payload) => {
  try {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD, // naturally, replace both with your real credentials or an application-specific password
      },
    });
    
    const source = fs.readFileSync(
      path.join(__dirname, `./templates/requestResetPassword.handlebars`),
      "utf8"
    );
    const compiledTemplate = handlebars.compile(source);
    const options = () => {
      return {
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: subject,
        html: compiledTemplate(payload),
      };
    };

    return new Promise((resolve, reject) => {
      // Send email
      transporter.sendMail(options(), (error, info) => {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          console.log("reset password email sent");
          resolve(info);
        }
      });
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/*
Example:
sendWelcomeEmail(
  "youremail@gmail.com,
  "Email subject",
  { name: "Eze" },
  "./templates/layouts/main.handlebars"
);
*/
/*
 const link = `${clientURL}/passwordReset?token=${resetToken}&id=${user._id}`;
  sendWelcomeEmail(user.email,"Password Reset Request",{name: user.name,link: link,},"./template/requestResetPassword.handlebars");
  return link;
*/
module.exports = { sendWelcomeEmail, sendResetPasswordEmail };
