
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./inbox.css"; 

const SentBox = () => {
  const [sentMails, setSentMails] = useState([]);
  const [selectedMail, setSelectedMail] = useState(null);

  useEffect(() => {
    fetchSentMails();
  }, []);

  const fetchSentMails = async () => {
    try {
      const token = localStorage.getItem("token");
      const userEmail = localStorage.getItem("userEmail");
      const res = await axios.get(`http://localhost:5000/api/mails/sent/${userEmail}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSentMails(res.data);
    } catch (err) {
      console.error("Error fetching sent mails:", err);
    }
  };

  const handleMailClick = (mail) => {
    setSelectedMail(mail);
  };

  return (
    <div className="inbox-container">
      <h2>📤 Sent Mails</h2>
      <div className="mail-list">
        {sentMails.length === 0 ? (
          <p>No mails sent</p>
        ) : (
          <ul>
            {sentMails.map((mail) => (
              <li key={mail._id} className="mail-item">
                <div onClick={() => handleMailClick(mail)} style={{ flex: 1, cursor: "pointer" }}>
                  <strong>{mail.subject}</strong> — To: {mail.receiver}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {selectedMail && (
        <div className="mail-detail">
          <h3>{selectedMail.subject}</h3>
          <p><strong>To:</strong> {selectedMail.receiver}</p>
          <div dangerouslySetInnerHTML={{ __html: selectedMail.message }} />
        </div>
      )}
    </div>
  );
};

export default SentBox;
