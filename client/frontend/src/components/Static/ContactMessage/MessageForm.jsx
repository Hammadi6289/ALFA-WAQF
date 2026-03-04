import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { sendWebMessage } from "../../../redux/actions/authActions";

const MessageForm = () => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const { success, error } = useSelector((state) => state.auth);

  const handleMessage = () => {
    if (!name || !contact || !message) {
      return toast.error("All fields are required");
    }
    dispatch(sendWebMessage({ name, contact, message }));
    if (success) {
      toast.success("Message sent successfully");
      setName("");
      setContact("");
      setMessage("");
    }
    if (error) {
      toast.error(error);
    }
  };
  return (
    <div>
      <div className="message-mform">
        <h2> Send Us a Message</h2>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Please enter your name"
          required={true}
        />
        <input
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          type="text"
          placeholder="Please enter your email or phone number"
          required={true}
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter you message"
          name="message"
          rows={5}
        ></textarea>
        <button onClick={handleMessage} className="button-primary">
          Submit
        </button>
      </div>
    </div>
  );
};

export default MessageForm;
