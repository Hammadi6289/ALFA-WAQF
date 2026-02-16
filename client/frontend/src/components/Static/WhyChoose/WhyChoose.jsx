import React from "react";
import "./WhyChoose.css";
import empower from "../../../assets/images/empower.jpg";
import empower1 from "../../../assets/images/empower1.jpg";
import trust from "../../../assets/images/trust.jpg";
import trust1 from "../../../assets/images/trust1.jpg";

const WhyChoose = () => {
  return (
    <>
      <h1 className="text-center mt-5">Why Choose Us?</h1>
      <div className="row why-container">
        <div className="col-md-3">
          <img src={empower} alt="empower" width={"100%"} height={"220px"} />
          <h2>Personalize Care</h2>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime
            modi nobis similique! Officia perspiciatis illo tenetur similique?
            Fugit rerum, amet corrupti deserunt cumque saepe debitis
            necessitatibus cupiditate commodi similique eveniet.
          </p>
          <button className="button-secondary"> Visit Now</button>
        </div>
        <div className="col-md-3">
          <img src={empower1} alt="empower1" width={"100%"} height={"220px"} />
          <h2>Trusted Care</h2>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime
            modi nobis similique! Officia perspiciatis illo tenetur similique?
            Fugit rerum, amet corrupti deserunt cumque saepe debitis
            necessitatibus cupiditate commodi similique eveniet.
          </p>
          <button className="button-secondary"> Visit Now</button>
        </div>
        <div className="col-md-3">
          <img src={trust1} alt="trust1" width={"100%"} height={"220px"} />
          <h2>Affordable Care</h2>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime
            modi nobis similique! Officia perspiciatis illo tenetur similique?
            Fugit rerum, amet corrupti deserunt cumque saepe debitis
            necessitatibus cupiditate commodi similique eveniet.
          </p>
          <button className="button-secondary"> Visit Now</button>
        </div>
      </div>
    </>
  );
};

export default WhyChoose;
