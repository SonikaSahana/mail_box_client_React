const request = require("supertest");
const app = require("../app"); 
const Email = require("../models/emailModel");

describe("PUT /api/mails/markasread/:id", () => {
  let email;

  beforeEach(async () => {
    email = new Email({
      sender: "test@example.com",
      receiver: "me@example.com",
      subject: "Test",
      message: "Test message",
      read: false,
    });
    await email.save();
  });

  test("marks email as read", async () => {
    const res = await request(app).put(`/api/mails/markasread/${email._id}`);
    expect(res.statusCode).toBe(200);

    const updatedEmail = await Email.findById(email._id);
    expect(updatedEmail.read).toBe(true);
  });

  test("returns error for invalid ID", async () => {
    const res = await request(app).put("/api/mails/markasread/invalidId123");
    expect(res.statusCode).toBe(500); // Or 404 if handled
  });

  test("doesn't change already read email", async () => {
    await Email.findByIdAndUpdate(email._id, { read: true });
    const res = await request(app).put(`/api/mails/markasread/${email._id}`);
    expect(res.statusCode).toBe(200);
  });
});
