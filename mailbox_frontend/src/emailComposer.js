import React, { useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import axios from "axios";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./emailComposer.css";

const EmailComposer = () => {
  const [senderEmail, setSenderEmail] = useState("");
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSenderEmail(res.data.email);
      } catch (err) {
        console.error("Failed to fetch user email:", err);
      }
    };

    fetchUserEmail();
  }, []);

  const handleSend = async () => {
    const message = draftToHtml(convertToRaw(editorState.getCurrentContent())).trim();

    // Basic validation
    if (!to.trim() || !subject.trim() || !message) {
      alert("Please fill in all fields before sending the email.");
      return;
    }

    try {
      setLoading(true);

      await axios.post("http://localhost:5000/api/mails/send", {
        sender: senderEmail,
        receiver: to.trim(),
        subject: subject.trim(),
        message,
      });

      alert("Mail sent successfully!");
      setTo("");
      setSubject("");
      setEditorState(EditorState.createEmpty());
    } catch (err) {
      console.error("Failed to send mail:", err);
      alert("Something went wrong while sending the mail.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mail-container">
      <input
        type="email"
        placeholder="To"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />
      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        wrapperClassName="editor-wrapper"
        editorClassName="editor"
        toolbar={{
          options: ["inline", "list", "textAlign", "history"],
          inline: {
            options: ["bold", "italic", "underline", "strikethrough"],
          },
        }}
      />
      <button onClick={handleSend} disabled={loading}>
        {loading ? "Sending..." : "Send"}
      </button>
    </div>
  );
};

export default EmailComposer;
