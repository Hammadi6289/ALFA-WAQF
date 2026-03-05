import React from "react";
import OurWork from "../components/Static/WorkIntro/OurWork";
import { Helmet } from "react-helmet-async";

const About = () => {
  return (
    <div>
      <Helmet>
        <title>About Us | Alfalah</title>
      </Helmet>
      <OurWork />
    </div>
  );
};

export default About;
