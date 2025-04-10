import React, { useState } from "react";
import axios from "axios";
import "./inbox.css";
import useFetchMails from "../hooks/useFetchMails";

const Inbox = () => {
  const [selectedMail, setSelectedMail] = useState(null);
  const userEmail = localStorage.getItem("userEmail");

  const { emails: mails, unreadCount, refresh } = useFetchMails(
    `http://localhost:5000/api/mails/inbox/${userEmail}`,
    true
  );

  const handleMailClick = async (mail) => {
    if (!mail.isRead) {
      try {
        await axios.patch(`http://localhost:5000/api/mails/read/${mail._id}`);
        refresh();
      } catch (err) {
        console.error("Error marking mail as read:", err);
      }
    }
    setSelectedMail(mail);
  };

  const handleDelete = async (mailId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/mails/${mailId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      refresh();
      setSelectedMail(null);
    } catch (err) {
      console.error("Error deleting mail:", err);
    }
  };

  return (
    <div className="inbox-container">
      <h2>Inbox ({unreadCount} Unread)</h2>
      <div className="mail-list">
        {mails.length === 0 ? (
          <p>No mails received</p>
        ) : (
          <ul>
            {mails.map((mail) => (
              <li key={mail._id} className="mail-item">
                <div onClick={() => handleMailClick(mail)} style={{ flex: 1, cursor: "pointer" }}>
                  {!mail.isRead && <span className="unread-dot" />}
                  <strong>{mail.subject}</strong> — {mail.sender}
                </div>
                <button className="delete-btn" onClick={() => handleDelete(mail._id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {selectedMail && (
        <div className="mail-detail">
          <h3>{selectedMail.subject}</h3>
          <p><strong>From:</strong> {selectedMail.sender}</p>
          <div dangerouslySetInnerHTML={{ __html: selectedMail.message }} />
        </div>
      )}
    </div>
  );
};

export default Inbox;
