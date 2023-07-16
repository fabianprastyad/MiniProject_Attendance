require("dotenv").config();
const db = require("../../models");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = db;
const secretKey = process.env.JWT_SECRET_KEY;

module.exports = {
  async register(req, res) {
    const { firstname, lastname, email, birth_date, join_date, basic_salary } =
      req.body;
    try {
      const hashedPassword = await bcrypt.hash("Littlebondy_456", 10);
      const TokenAccess = crypto.randomBytes(16).toString("hex");

      const userData = await db.User.create({
        email,
        password: hashedPassword,
        access_token: TokenAccess,
        role_id: 2,
      });
      const salary_DB = await db.Salary.create({
        basic_salary,
      });
      const userId = userData.userId;
      const salaryId = salary_DB.id;

      const newUserEmployee = await User.create({
        firstname,
        lastname,
        email,
        birth_date,
        join_date,
        basic_salary,
        userId: userId,
        salaryId: salaryId,
      });

      // render template html email
      const link = `${process.env.FE_BASEPATH}/verify/${verifyToken}`;
      const template = fs.readFileSync("./templates/register.html", "utf-8");
      const templateCompile = hbs.compile(template);
      const htmlResult = templateCompile({ username, link });
      // send email
      await transporter.sendMail({
        from: "from your boss",
        to: email,
        subject: "thanks!,registration Success",
        html: htmlResult,
      });

      res.status(201).send({
        message: "registration success",
        data: {
          firstname: newUserEmployee.firstname,
          lastname: newUserEmployee.lastname,
          birthdate: newUserEmployee.birthdate,
          joindate: newUserEmployee.joindate,
          salary: newUserEmployee.salary,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "something wrong in the server",
        error,
      });
    }
  },
  async getAllEmployeeData(req, res) {
    const pagination = {
      page: Number(req.query.page) || 1,
      perPage: Number(req.query.perPage) || 5,
    };
    try {
      let where = {};
      // get all employee
      const { count, rows } = await db.Employee_details.findAndCountAll({
        where,
        limit: pagination.perPage,
        offset: (pagination.page - 1) * pagination.perPage,
      });

      if (pagination.search && count === 0) {
        return res.status(404).send({
          message: "No products found matching the search query.",
        });
      }

      const totalPages = Math.ceil(count / pagination.perPage);

      res.status(200).send({
        message: "employee data successfully retrieved",
        pagination: {
          page: pagination.page,
          perPage: pagination.perPage,
          totalPages: totalPages,
          totalData: count,
        },
        data: rows,
      });
    } catch (error) {
      return res.status(500).send({
        message: "fatal error",
        error: error.message,
      });
    }
  },
  async getEmployeByToken(req, res) {
    const { accessToken } = req.params;
    try {
      // check accessToken
      const userData = await db.User.findOne({
        where: { access_token: accessToken },
      });
      if (!userData) {
        return res.status(404).send("invalid token");
      }
      // get employee data
      const employeeData = await db.Employee_details.findOne({
        where: { user_id: userData.id },
      });

      res.status(200).send({
        message: "Success Get Employee Data",
        data: employeeData,
      });
    } catch (error) {
      return res.status(500).send({
        message: "fatal error",
        error: error.message,
      });
    }
  },
  async accountVerif(req, res) {
    const { accessToken } = req.params;
    const { first_name, last_name, birth_date, join_date, password } = req.body;
    try {
      // check accessToken
      const userData = await db.User.findOne({
        where: { access_token: accessToken },
      });
      if (!userData) {
        return res.status(404).send("invalid token");
      }

      // check employee_details
      const employeeData = await db.Employee_details.findOne({
        where: { user_id: userData.id },
        attributes: {
          exclude: ["createdAt", "updatedAt", "user_id", "salary_id"],
        },
        include: {
          model: db.User,
          attributes: ["email"],
        },
      });

      // hash password
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      // patch data
      if (first_name) {
        employeeData.first_name = first_name;
      }
      if (last_name) {
        employeeData.last_name = last_name;
      }
      if (birth_date) {
        employeeData.birth_date = birth_date;
      }
      if (join_date) {
        employeeData.join_date = join_date;
      }
      if (password) {
        userData.password = hashPassword;
      }

      // delete access token
      userData.access_token = null;

      // save data
      await userData.save();
      await employeeData.save();

      res.status(200).send({
        message: "verification success",
        data: {
          first_name: employeeData.first_name,
          last_name: employeeData.last_name,
          birth_date: employeeData.birth_date,
          join_date: employeeData.join_date,
          email: userData.email,
        },
      });
    } catch (error) {
      return res.status(500).send({
        message: "fatal error",
        error: error.message,
      });
    }
  },
};
