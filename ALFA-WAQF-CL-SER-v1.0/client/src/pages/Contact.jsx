import React from "react";
import ContactMessage from "../components/Static/ContactMessage/ContactMessage";

const Contact = () => {
  return (
    <>
      <div className="contact-hero">
        <h2 className="contact-hero__title">Contact Us</h2>
        <h4 className="contact-hero__subtitle">
          Get in touch with Alfalah Family
        </h4>
      </div>

      <div className="d-flex flex-column mt-5 justify-content-center ms-5">
        <h3 className="mb-5 color-primary">
          Head office
          <br></br>
          Block B Main-Markaz.
          <br></br>
          MPCHS B-17 Islamabad
          <br></br>
        </h3>
        <h6 className="">
          <i class="fa-solid fa-phone"></i>
          Emergency Call: (051) 2765700
        </h6>
        <h6 className="">
          <i class="fa-solid fa-clock"></i>Hours: Open 24/7
        </h6>
        <h6 className="">
          <i class="fa-solid fa-at"></i>Email: alfalahhospb17@gmail.com
        </h6>
      </div>
      <ContactMessage />
    </>
  );
};

export default Contact;
