import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActiveBlocks } from "../../redux/actions/contentBlockActions";
import WhyChoose from "../Static/WhyChoose/WhyChoose";
import Facility from "../Static/Facility/Facility";
import KeyFactsBlock from "../Static/KeyFactsBlock/KeyFactsBlock";
import PatientReviewsBlock from "../Static/PatientReviewsBlock/PatientReviewsBlock";
import OurWork from "../Static/WorkIntro/OurWork";
import VideoBlock from "../Static/VideoBlock/VideoBlock";
import WhyChooseBlock from "./WhyChooseBlock";

const BlockRenderer = () => {
  const dispatch = useDispatch();
  const { blocks, loading } = useSelector((state) => state.contentBlock);

  useEffect(() => {
    dispatch(getActiveBlocks());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const renderBlock = (block) => {
    switch (block.blockType) {
      case "why-choose":
        return <WhyChooseBlock key={block._id} data={block} />;
      case "facility":
        return <Facility key={block._id} data={block} />;
      case "key-facts":
        return <KeyFactsBlock key={block._id} data={block} />;
      case "testimonial":
        return <PatientReviewsBlock key={block._id} data={block} />;
      case "our-work":
        return <OurWork key={block._id} data={block} />;
      default:
        return <VideoBlock key={block._id} data={block} />;
    }
  };

  return <>{blocks.map(renderBlock)}</>;
};

export default BlockRenderer;
