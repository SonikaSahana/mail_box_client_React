import React, { useState } from "react";
import "./inbox.css";
import useFetchMails from "../hooks/useFetchMails";

const SentBox = () => {
  const [selectedMail, setSelectedMail] = useState(null);
  const userEmail = localStorage.getItem("userEmail");

  const { emails: sentMails } = useFetchMails(
    `http://localhost:5000/api/mails/sent/${userEmail}`
  );

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
