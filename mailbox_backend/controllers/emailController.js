const Email = require("../model/emailModel");

exports.sendEmail = async (req, res) => {
  const { sender, receiver, subject, message } = req.body;

  if (!sender || !receiver || !subject || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const email = new Email({ sender, receiver, subject, message });
    await email.save();
    res.status(200).json({ success: true, message: "Email stored successfully!" });
  } catch (err) {
    console.error("Error saving email:", err);
    res.status(500).json({ error: "Failed to store email." });
  }
};

exports.getInbox = async (req, res) => {
  try {
    const inbox = await Email.find({ receiver: req.params.email }).sort({ createdAt: -1 });
    res.status(200).json(inbox);
  } catch (err) {
    console.error("Inbox fetch error:", err);
    res.status(500).json({ error: "Failed to fetch inbox." });
  }
};




exports.getSent = async (req, res) => {
  try {
    const sent = await Email.find({ sender: req.params.email });
    res.status(200).json(sent);
  } catch (err) {
    console.error("Sent fetch error:", err);
    res.status(500).json({ error: "Failed to fetch sent mails." });
  }
};

exports.markAsRead = async (req, res) => {
  const { mailId } = req.params;
  try {
    await Email.findByIdAndUpdate(mailId, { isRead: true });
    res.status(200).json({ success: true, message: "Mail marked as read" });
  } catch (err) {
    console.error("Mark as read error:", err);
    res.status(500).json({ error: "Failed to mark mail as read" });
  }
};
