import React, { useEffect, useState } from "react";
import axios from "axios";
import "./inbox.css";

const Inbox = () => {
  const [mails, setMails] = useState([]);
  const [selectedMail, setSelectedMail] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetchMails();
  }, []);

  const fetchMails = async () => {
    try {
      const token = localStorage.getItem("token");
      const userEmail = localStorage.getItem("userEmail");
      const res = await axios.get(`http://localhost:5000/api/mails/inbox/${userEmail}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMails(res.data);
      const unread = res.data.filter(mail => !mail.isRead).length;
      setUnreadCount(unread);
    } catch (err) {
      console.error("Error fetching inbox mails:", err);
    }
  };

  const handleMailClick = async (mail) => {
    if (!mail.isRead) {
      try {
        await axios.patch(`http://localhost:5000/api/mails/read/${mail._id}`);
      } catch (err) {
        console.error("Error marking mail as read:", err);
      }
    }
    setSelectedMail(mail);
    fetchMails();
  };

  const handleDelete = async (mailId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/mails/${mailId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMails((prevMails) => prevMails.filter((mail) => mail._id !== mailId));
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
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(mail._id)}
                >
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
