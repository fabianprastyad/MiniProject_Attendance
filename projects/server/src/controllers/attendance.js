require("dotenv").config();
const db = require("../../models");
const jwt = require("jsonwebtoken");

const { User, Attendance } = db;
const secretKey = process.env.JWT_SECRET_KEY;

module.exports = {
  async clockIn(req, res) {
    const userId = req.user.id;
    const currentTime = new Date();

    try {
      // Cek apakah pengguna sudah clock-in hari ini
      const existingAttendance = await Attendance.findOne({
        where: {
          userId,
          date: {
            $gte: new Date().setHours(0, 0, 0, 0), // Mengatur waktu awal hari saat ini
            $lte: new Date().setHours(23, 59, 59, 999), // Mengatur waktu akhir hari saat ini
          },
        },
      });

      if (existingAttendance) {
        return res
          .status(400)
          .json({ message: "Anda sudah melakukan clock-in hari ini." });
      }

      // Membuat clock-in baru
      const clockIn = await Attendance.create({
        userId,
        clockIn: currentTime,
        date: currentTime,
      });

      res.json({ message: "Clock-in berhasil.", clockIn });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Terjadi kesalahan pada server." });
    }
  },

  async clockOut(req, res) {
    const userId = req.user.id;
    const currentTime = new Date();

    try {
      //  clock-in hari ini
      const existingAttendance = await Attendance.findOne({
        where: {
          userId,
          date: {
            $gte: new Date().setHours(0, 0, 0, 0), // Mengatur waktu awal hari saat ini
            $lte: new Date().setHours(23, 59, 59, 999), // Mengatur waktu akhir hari saat ini
          },
        },
      });

      if (!existingAttendance) {
        return res
          .status(400)
          .json({ message: "Anda belum melakukan clock-in hari ini." });
      }

      // Update clock-out pada attendance yang ada
      existingAttendance.clockOut = currentTime;
      await existingAttendance.save();

      res.json({ message: "Clock-out berhasil.", clockOut: currentTime });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Terjadi kesalahan pada server." });
    }
  },
  async attendanceReport(req, ses) {
    const userId = req.user.id;
    const pagination = {
      page: Number(req.query.page) || 1,
      perPage: Number(req.query.perPage) || 6,
      date: req.query.date || undefined,
    };
    try {
      let where = { user_id: userId };

      if (pagination.date) {
        where.date = pagination.date;
      }

      const { count, rows } = await db.Attendance.findAndCountAll({
        where: where, // Menambahkan klausul where ke dalam pemanggilan findAndCountAll
        offset: (pagination.page - 1) * pagination.perPage, // Menambahkan offset untuk paginasi
        limit: pagination.perPage, // Menambahkan limit untuk paginasi
      });

      res.json({ count, rows });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
