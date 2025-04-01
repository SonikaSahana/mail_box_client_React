import React from "react";
import { Container, Card } from "react-bootstrap";

const Mailbox = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="shadow p-5 text-center" style={{ width: "400px" }}>
        <h2>Welcome to your Mailbox</h2>
      </Card>
    </Container>
  );
};

export default Mailbox;
