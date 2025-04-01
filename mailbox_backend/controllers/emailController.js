const Email = require("../model/emailModel");

// 📩 Send Email
const sendEmail = async (req, res) => {
  try {
    const { sender, receiver, subject, message } = req.body;
    const email = new Email({ sender, receiver, subject, message });
    await email.save();
    res.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Error sending email" });
  }
};

// 📥 Get Inbox (Received Emails)
const getInbox = async (req, res) => {
  try {
    const emails = await Email.find({ receiver: req.params.email });
    res.json(emails);
  } catch (error) {
    res.status(500).json({ error: "Error fetching inbox" });
  }
};

// 📤 Get Sent Emails
const getSentEmails = async (req, res) => {
  try {
    const emails = await Email.find({ sender: req.params.email });
    res.json(emails);
  } catch (error) {
    res.status(500).json({ error: "Error fetching sent emails" });
  }
};

module.exports = { sendEmail, getInbox, getSentEmails };
