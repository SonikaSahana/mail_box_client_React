const express = require("express");
const { signup,login } = require("../controllers/userController");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", authMiddleware, (req, res) => {
    res.json({ email: req.user.email });
  });
  


module.exports = router;
