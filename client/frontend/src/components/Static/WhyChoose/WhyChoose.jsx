import React from "react";
import "./WhyChoose.css";
import { useNavigate } from "react-router-dom";
import care from "../../../assets/images/oldman.png";
import care1 from "../../../assets/images/oldwomen.webp";
import care2 from "../../../assets/images/oldwomen1.webp";
import dna from "../../../assets/images/dna.jpg";
import community from "../../../assets/images/childcommunity.jpg";

const WhyChoose = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1 className="text-center mt-5">Why Choose Us?</h1>
      <div className="row why-container">
        {/* <div className="col-md-3">
          <img src={empower} alt="empower" width={"100%"} height={"220px"} />
          <h2>Personalize Care</h2>
          <p>
            Experience compassionate healthcare tailored to your needs at
            Alfalah General Hospital. Our dedicated team of specialists takes
            time to understand your medical history, concerns, and preferences,
            ensuring every patient receives individualized attention and
            treatment plans that work best for them.
          </p>
          <button className="button-secondary"> Visit Now</button>
        </div>
        <div className="col-md-3">
          <img src={empower1} alt="empower1" width={"100%"} height={"220px"} />
          <h2>Trusted Healthcare</h2>
          <p>
            Serving the Islamabad community with excellence since 1995, AGH has
            earned the trust of thousands of families across the capital. Our
            ISO-certified facilities, experienced consultants, and commitment to
            medical ethics make us the preferred choice for residents of B-17,
            D-12, and surrounding sectors.
          </p>
          <button className="button-secondary"> Visit Now</button>
        </div>
        <div className="col-md-3">
          <img src={trust1} alt="trust1" width={"100%"} height={"220px"} />
          <h2>Healthcare Excellence Made Affordable</h2>
          <p>
            We believe every resident of Islamabad deserves access to excellent
            healthcare. AGH offers competitive rates, accepts various insurance
            plans, and provides transparent cost estimates before procedures.
            Quality treatment at prices you can afford.
          </p>
          <button className="button-secondary"> Visit Now</button>
        </div> */}
        <div className="col-md-3">
          <img src={dna} alt="dna" className="why-container-top-img" />
          <h2>Caring for Islamabad, One Patient at a Time</h2>
          <p>
            Since our establishment in B-17, AGH has been committed to serving
            the local community with compassion and excellence. Our friendly
            staff make every visit comfortable and stress-free for families
            across Islamabad.
          </p>
          <button
            onClick={() => navigate("/contact")}
            className="button-secondary"
          >
            {" "}
            Visit Now
          </button>
        </div>

        <div className="col-md-3">
          <img
            src={community}
            alt="community"
            className="why-container-top-img"
          />
          <h2>Building Healthier Communities</h2>
          <p>
            AGH isn't just a hospital – it's a partner in community wellness. We
            regularly organize free medical camps in Islamabad's underserved
            areas, health awareness seminars, and school screening programs to
            ensure healthcare reaches everyone who needs it.
          </p>
          <button
            onClick={() => navigate("/news")}
            className="button-secondary"
          >
            Visit Now
          </button>
        </div>

        <div className="col-md-3">
          <img src={care2} alt="care" className="why-container-top-img" />
          <h2>Your Health, Our Priority at AGH</h2>
          <p>
            From emergency care to specialized consultations, AGH provides
            comprehensive healthcare under one roof. Our 24/7 emergency
            services, experienced general physicians ensure that residents have
            access to quality medical care whenever they need.
          </p>
          <button
            onClick={() => navigate("/specialties/general-physician")}
            className="button-secondary"
          >
            {" "}
            Visit Now
          </button>
        </div>
      </div>
    </>
  );
};

export default WhyChoose;
