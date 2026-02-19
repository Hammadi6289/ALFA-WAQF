import React from "react";
import "./ContactMessage.css";
import MessageForm from "./MessageForm";

const ContactMessage = () => {
  return (
    <>
      <div className="row contact-message-container">
        <div className="col-md-12">
          <MessageForm />
        </div>
      </div>
    </>
  );
};

export default ContactMessage;
