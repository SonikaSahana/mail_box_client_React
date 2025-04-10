// src/hooks/useFetchMails.js
import { useEffect, useState, useRef } from "react";
import axios from "axios";

const useFetchMails = (url, autoRefresh = false) => {
  const [emails, setEmails] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const intervalRef = useRef(null);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const newData = res.data;
      setEmails(newData);

      const unread = newData.filter((mail) => !mail.isRead).length;
      setUnreadCount(unread);
    } catch (err) {
      console.error("Error fetching mails:", err);
    }
  };

  useEffect(() => {
    fetchData();

    if (autoRefresh) {
      intervalRef.current = setInterval(() => {
        fetchData();
      }, 2000);

      return () => clearInterval(intervalRef.current);
    }
  }, [url]);

  return { emails, unreadCount, refresh: fetchData };
};

export default useFetchMails;
