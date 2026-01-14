import React from "react";
import Slider from "../components/Slider/Slider";
import Facility from "../components/Static/Facility/Facility";
import OurWork from "../components/Static/WorkIntro/OurWork";
import WhyChoose from "../components/Static/WhyChoose/WhyChoose";

const Home = () => {
  return (
    <>
      <Slider />
      <Facility />
      <OurWork />
      <WhyChoose />
    </>
  );
};

export default Home;
