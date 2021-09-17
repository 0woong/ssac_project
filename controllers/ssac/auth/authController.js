const con = require("../../../modules/mysql");

const authController = {
  signup: (req, res) => {
    const { id, name, password } = req.body;

    con.query(
      `SELECT * FROM user WHERE id = ?`,
      [id],
      (err, result, fields) => {
        if (err) {
          return res.status(400).json({
            message: "에러가 발생하였습니다.",
          });
        }

        if (result.length === 0) {
          con.query(
            `INSERT INTO user (id, name, password) VALUES (?, ?, ?)`,
            [id, name, Number(password)],
            (err, result, fields) => {
              if (err) {
                return res.status(400).json({
                  message: "에러가 발생하였습니다.",
                });
              }

              res.status(200).json({
                message: "아이디가 생성되었습니다.",
              });
            }
          );
        } else {
          res.status(400).json({
            message: "이미 존재하는 아이디입니다.",
          });
        }
      }
    );
  },

  signin: (req, res) => {
    const { id, password } = req.body;

    con.query(
      `SELECT * FROM user WHERE id = ? AND password = ?`,
      [id, Number(password)],
      (err, result, fields) => {
        if (err) {
          return res.status(400).json({
            message: "에러가 발생하였습니다.",
          });
        }

        if (result.length === 0) {
          return res.status(400).json({
            message: "로그인 실패하였습니다.",
          });
        } else {
          res.status(200).json({
            message: "로그인 성공하였습니다.",
            data: result,
          });
        }
      }
    );
  },
};

module.exports = authController;
