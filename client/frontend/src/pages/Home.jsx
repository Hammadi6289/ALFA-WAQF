import React from "react";
import Slider from "../components/Slider/Slider";
import Facility from "../components/Static/Facility/Facility";
import OurWork from "../components/Static/WorkIntro/OurWork";
import WhyChoose from "../components/Static/WhyChoose/WhyChoose";
import ContactMessage from "../components/Static/ContactMessage/ContactMessage";
import KeyFactsBlock from "../components/Static/KeyFactsBlock/KeyFactsBlock";
import PatientReviewsBlock from "../components/Static/PatientReviewsBlock/PatientReviewsBlock";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home | Alfalah WAQF</title>
      </Helmet>
      <Slider />
      <Facility />
      <OurWork />
      <KeyFactsBlock />
      <WhyChoose />
      <PatientReviewsBlock />
      <ContactMessage />
    </>
  );
};

export default Home;
