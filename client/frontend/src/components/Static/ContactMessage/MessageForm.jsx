import React from "react";

const MessageForm = () => {
  return (
    <div>
      <div className="message-mform">
        <h2> Send Us a Message</h2>
        <input
          type="text"
          placeholder="Please enter your name"
          required={true}
        />
        <input
          type="email"
          placeholder="Please enter your email"
          required={true}
        />
        <textarea
          placeholder="Enter you message"
          name="message"
          rows={5}
        ></textarea>
        <button className="button-primary">Submit</button>
      </div>
    </div>
  );
};

export default MessageForm;
