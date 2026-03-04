import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { sendWebMessage } from "../../../redux/actions/authActions";

const MessageForm = () => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const { success, error } = useSelector((state) => state.auth);

  const validateForm = () => {
    const newErrors = {};

    // Name validation: 2-50 characters
    if (!name.trim()) {
      newErrors.name = "Name is required";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    } else if (name.trim().length > 50) {
      newErrors.name = "Name must be less than 50 characters";
    }

    // Contact validation: email OR phone
    if (!contact.trim()) {
      newErrors.contact = "Email or phone number is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;

      if (!emailRegex.test(contact) && !phoneRegex.test(contact)) {
        newErrors.contact = "Please enter a valid email or phone number";
      }
    }

    // Message validation: 5-300 characters
    if (!message.trim()) {
      newErrors.message = "Message is required";
    } else if (message.trim().length < 5) {
      newErrors.message = "Message must be at least 5 characters";
    } else if (message.trim().length > 300) {
      newErrors.message = "Message must be less than 300 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleMessage = () => {
    if (!validateForm()) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    dispatch(sendWebMessage({ name, contact, message }));

    if (success) {
      toast.success("Message sent successfully");
      setName("");
      setContact("");
      setMessage("");
      setErrors({});
    }
    if (error) {
      toast.error(error);
    }
  };

  return (
    <div>
      <div className="message-mform">
        <h2>Send Us a Message</h2>

        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (errors.name) setErrors({ ...errors, name: "" });
          }}
          type="text"
          placeholder="Please enter your name"
          className={errors.name ? "error-border" : ""}
        />
        {errors.name && <div className="error-message">{errors.name}</div>}

        <input
          value={contact}
          onChange={(e) => {
            setContact(e.target.value);
            if (errors.contact) setErrors({ ...errors, contact: "" });
          }}
          type="text"
          placeholder="Please enter your email or phone number"
          className={errors.contact ? "error-border" : ""}
        />
        {errors.contact && (
          <div className="error-message">{errors.contact}</div>
        )}

        <textarea
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            if (errors.message) setErrors({ ...errors, message: "" });
          }}
          placeholder="Enter your message (10-500 characters)"
          rows={5}
          className={errors.message ? "error-border" : ""}
        />
        {errors.message && (
          <div className="error-message">{errors.message}</div>
        )}

        <button onClick={handleMessage} className="button-primary">
          Submit
        </button>
      </div>
    </div>
  );
};

export default MessageForm;
