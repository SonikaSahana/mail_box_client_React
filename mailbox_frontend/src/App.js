import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./SignupPage";
import Login from "./loginPage";
import Mailbox from "./mailBox";
import Emailcomposer from "./emailComposer"
import Inbox from "./Inbox";
import SentBox from "./sentBox";

const App = () => {
  const [view, setView] = useState("inbox");
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mailbox" element={<Mailbox />} />
        <Route path="/homepage" element={<Emailcomposer />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/sent" element={<SentBox />} />
        </Routes>
    </Router>
  );
};

export default App;
