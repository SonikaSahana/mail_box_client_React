import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

const EmailComposer = () => {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = async () => {
    try {
      const senderEmail = "user@example.com"; 

      await axios.post("http://localhost:5000/api/mails/send", {
        sender: senderEmail,
        receiver: to,
        subject,
        message,
      });

      alert("Email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>Compose Email</h2>
      <input
        type="email"
        placeholder="Recipient Email"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        required
      />
      <ReactQuill theme="snow" value={message} onChange={setMessage} />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default EmailComposer;
