const express = require("express");
const { sendEmail, getInbox, getSentEmails } = require("../controllers/emailController");

const router = express.Router();

router.post("/send", sendEmail);
router.get("/inbox/:email", getInbox);
router.get("/sent/:email", getSentEmails);

module.exports = router;
