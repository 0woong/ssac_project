var express = require("express");
var router = express.Router();
const authController = require("../../controllers/ssac/auth/authController");
const boardController = require("../../controllers/ssac/board/boardController");

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);

router.get("/board", boardController.load);
router.get("/board/:idx", boardController.load);
router.post("/board", boardController.save);
router.delete("/board/:idx", boardController.delete);
module.exports = router;
