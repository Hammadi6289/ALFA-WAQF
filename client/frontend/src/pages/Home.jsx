import React from "react";
import Slider from "../components/Slider/Slider";
import Facility from "../components/Static/Facility/Facility";
import OurWork from "../components/Static/WorkIntro/OurWork";
import WhyChoose from "../components/Static/WhyChoose/WhyChoose";
import KeyFactsBlock from "../components/Static/KeyFactsBlock/KeyFactsBlock";
import PatientReviewsBlock from "../components/Static/PatientReviewsBlock/PatientReviewsBlock";
import { Helmet } from "react-helmet-async";
import VideoBlock from "../components/Static/VideoBlock/VideoBlock";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home | Alfalah General Hospital</title>
      </Helmet>
      <Slider />
      <Facility />
      <OurWork />
      <KeyFactsBlock />
      <WhyChoose />
      <VideoBlock />
      <PatientReviewsBlock />
    </>
  );
};

export default Home;
