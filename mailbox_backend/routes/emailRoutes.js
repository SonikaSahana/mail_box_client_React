const express = require("express");
const router = express.Router();
const {
  sendEmail,
  getInbox,
  getSent
} = require("../controllers/emailController");

router.post("/send", sendEmail);
router.get("/inbox/:email", getInbox);
router.get("/sent/:email", getSent);
router.patch("/read/:mailId", markAsRead);
router.delete("/mails/:id", deleteMail);


module.exports = router;
