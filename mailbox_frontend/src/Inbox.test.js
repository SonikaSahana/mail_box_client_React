import { render, screen } from "@testing-library/react";
import Inbox from "./Inbox";

const mockMails = [
  { _id: "1", subject: "Hello", read: false },
  { _id: "2", subject: "Update", read: true },
];

test("displays blue dot for unread mails", () => {
  render(<Inbox mails={mockMails} onMailClick={() => {}} />);
  const blueDots = screen.getAllByTestId("blue-dot");
  expect(blueDots.length).toBe(1);
});

test("does not display blue dot for read mails", () => {
  render(<Inbox mails={mockMails} onMailClick={() => {}} />);
  expect(screen.queryByText("Update").previousSibling).toBeNull();
});

const message = {
    _id: "1",
    subject: "Test Subject",
    message: "Test message body",
    read: false,
  };
  
  test("renders full message content", () => {
    render(<MessageReader message={message} markAsRead={() => {}} />);
    expect(screen.getByText("Test message body")).toBeInTheDocument();
  });
  
  test("shows blue dot for unread message", () => {
    render(<MessageReader message={message} markAsRead={() => {}} />);
    expect(screen.getByTestId("blue-dot")).toBeInTheDocument();
  });
  
  test("calls markAsRead function on click", () => {
    const mockFn = jest.fn();
    render(<MessageReader message={message} markAsRead={mockFn} />);
    fireEvent.click(screen.getByText("Test Subject"));
    expect(mockFn).toHaveBeenCalledWith("1");
  });
  
