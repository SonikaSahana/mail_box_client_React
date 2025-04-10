import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Mailbox = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="shadow p-5 text-center" style={{ width: "400px" }}>
        <h2 className="mb-4">Welcome to your Mailbox</h2>
        
        <div className="d-grid gap-3">
          <Link to="/inbox">
            <Button variant="primary" size="lg" className="w-100">
              📥 Inbox
            </Button>
          </Link>
          <Link to="/homepage">
            <Button variant="success" size="lg" className="w-100">
              ✉️ Compose
            </Button>
          </Link>
          <Link to="/sent">
  <Button variant="info" size="lg" className="w-100">
    📤 Sent
  </Button>
</Link>
        </div>
      </Card>
    </Container>
  );
};

export default Mailbox;
