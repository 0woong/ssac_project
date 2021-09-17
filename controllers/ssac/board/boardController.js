const con = require("../../../modules/mysql");

const boardController = {
  load: (req, res) => {
    const { idx } = req.params;

    if (Number(idx)) {
      con.query(
        `SELECT * FROM board WHERE idx = ?`,
        [Number(idx)],
        (err, result, fields) => {
          if (err) {
            return res.status(400).json({
              message: "에러가 발생하였습니다.",
            });
          }

          res.status(200).json({
            message: "해당 게시물 조회 성공",
            data: result,
          });
        }
      );
    } else {
      con.query(`SELECT * FROM board`, (err, result, fields) => {
        if (err) {
          return res.status(400).json({
            message: "에러가 발생하였습니다.",
          });
        }

        res.status(200).json({
          message: "전체 게시물 조회 성공",
          data: result,
        });
      });
    }
  },

  save: (req, res, next) => {
    const { title, content, boardPw, writer } = req.body;

    con.query(
      `INSERT INTO board (title, content, writer, writeTime, boardPw) VALUES (?, ?, ?, ?, ?)`,
      [title, content, Number(writer), new Date(), boardPw],
      (err, result, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).json({
            message: "에러가 발생하였습니다.",
          });
        }

        res.status(200).json({
          message: "게시글을 저장하였습니다.",
        });
      }
    );
  },

  delete: (req, res, next) => {
    const { idx } = req.params;

    con.query(
      `DELETE FROM board WHERE boardIdx = ?`,
      [Number(idx)],
      (err, result, fields) => {
        if (err) {
          return res.status(400).json({
            message: "에러가 발생했습니다.",
          });
        }

        res.status(200).json({
          message: "해당 게시물이 삭제되었습니다.",
        });
      }
    );
  },
};

module.exports = boardController;
