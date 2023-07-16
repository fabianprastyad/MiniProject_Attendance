require("dotenv").config();
const db = require("../../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = db;
const secretKey = process.env.JWT_SECRET_KEY;

module.exports = {
  async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      const isValid = await bcrypt.compare(password, user.password);
      if (user && isValid) {
        const token = jwt.sign(
          { id: user.id, role_id: user.role_id },
          secretKey,
          {
            expiresIn: "3hr",
          }
        );
        res.send({
          message: "login success",
          data: user,
          accessToken: token,
        });
        return;
      } else {
        res.status(400).send({
          message: "login failed, incorect email or password",
        });
      }
    } catch (error) {
      res.status(500).send({
        message: "error on server",
        error,
      });
    }
  },

  async forgot(req, res) {
    const { email } = req.body;

    try {
      const userData = await db.User.findOne({ where: { email } });
      if (!userData) {
        return res.status(500).send({
          message: "user is not found",
        });
      }

      // generate forgot token
      const forgotToken = crypto.randomBytes(16).toString("hex");
      const email = userData.email;
      const time = new Date();

      // render template html email
      const link = `${process.env.FE_BASEPATH}/reset-pass/${forgotToken}`;
      const template = fs.readFileSync("./templates/forgot.html", "utf-8");
      const templateCompile = hbs.compile(template);
      const htmlResult = templateCompile({ email, link });
      // send email
      await transporter.sendMail({
        from: "me to you",
        to: email,
        subject: "Reset Password",
        html: htmlResult,
      });

      // save token to db
      userData.forgotToken = forgotToken;
      userData.forgotTokenCreatedAt = time;
      await userData.save();

      res.send({
        message: "reset password success, check your email!",
      });
    } catch (errors) {
      console.error(errors);
      res.status(500).send({
        message: "fatal error on server",
        error: errors.message,
      });
    }
  },
};
